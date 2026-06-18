import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { seo, type SeoPageConfig, type SeoRobots } from "@/content/site";

export type SeoPageId = keyof typeof seo.pages;

export type SeoPageOverride = Partial<
  Pick<
    SeoPageConfig,
    | "title"
    | "description"
    | "canonical"
    | "openGraphTitle"
    | "openGraphDescription"
    | "twitterTitle"
    | "twitterDescription"
    | "image"
    | "robots"
  >
>;

export type SeoOverrideStore = {
  pages: Partial<Record<SeoPageId, SeoPageOverride>>;
  updatedAt?: string;
};

const defaultRobots: SeoRobots = {
  index: true,
  follow: true,
};
const seoOverrideStorePath = path.join(process.cwd(), "data", "seo-overrides.json");

function isSeoPageId(value: string): value is SeoPageId {
  return Object.hasOwn(seo.pages, value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeRobots(value: unknown): SeoRobots | undefined {
  if (!isPlainObject(value)) {
    return undefined;
  }

  if (typeof value.index !== "boolean" || typeof value.follow !== "boolean") {
    return undefined;
  }

  return {
    index: value.index,
    follow: value.follow,
  };
}

function normalizeImage(value: unknown): SeoPageConfig["image"] | undefined {
  if (!isPlainObject(value)) {
    return undefined;
  }

  if (
    typeof value.src !== "string" ||
    typeof value.alt !== "string" ||
    typeof value.width !== "number" ||
    typeof value.height !== "number"
  ) {
    return undefined;
  }

  return {
    src: value.src,
    alt: value.alt,
    width: value.width,
    height: value.height,
  };
}

function normalizeOverride(value: unknown): SeoPageOverride {
  if (!isPlainObject(value)) {
    return {};
  }

  const override: SeoPageOverride = {};
  const stringFields = [
    "title",
    "description",
    "canonical",
    "openGraphTitle",
    "openGraphDescription",
    "twitterTitle",
    "twitterDescription",
  ] as const;

  for (const field of stringFields) {
    if (typeof value[field] === "string" && value[field].trim()) {
      override[field] = value[field].trim();
    }
  }

  const image = normalizeImage(value.image);
  const robots = normalizeRobots(value.robots);

  if (image) {
    override.image = image;
  }

  if (robots) {
    override.robots = robots;
  }

  return override;
}

function normalizeStore(value: unknown): SeoOverrideStore {
  if (!isPlainObject(value) || !isPlainObject(value.pages)) {
    return { pages: {} };
  }

  const pages: SeoOverrideStore["pages"] = {};

  for (const [id, override] of Object.entries(value.pages)) {
    if (isSeoPageId(id)) {
      const normalizedOverride = normalizeOverride(override);

      if (Object.keys(normalizedOverride).length > 0) {
        pages[id] = normalizedOverride;
      }
    }
  }

  return {
    pages,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : undefined,
  };
}

export async function readSeoOverrideStore(): Promise<SeoOverrideStore> {
  try {
    const raw = await readFile(seoOverrideStorePath, "utf8");
    return normalizeStore(JSON.parse(raw));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { pages: {} };
    }

    const code = (error as NodeJS.ErrnoException).code;

    if (code === "ENOENT") {
      return { pages: {} };
    }

    throw error;
  }
}

export async function writeSeoOverrideStore(store: SeoOverrideStore) {
  const normalizedStore = normalizeStore({
    pages: store.pages,
    updatedAt: store.updatedAt ?? new Date().toISOString(),
  });
  const serialized = `${JSON.stringify(normalizedStore, null, 2)}\n`;
  const tempPath = `${seoOverrideStorePath}.${process.pid}.tmp`;

  await mkdir(path.dirname(seoOverrideStorePath), { recursive: true });
  await writeFile(tempPath, serialized, "utf8");
  await rename(tempPath, seoOverrideStorePath);
}

export function isReadOnlySeoStoreError(error: unknown) {
  const code = (error as NodeJS.ErrnoException | undefined)?.code;

  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

export async function getSeoPageConfig(id: SeoPageId): Promise<SeoPageConfig> {
  const store = await readSeoOverrideStore();
  const basePage: SeoPageConfig = seo.pages[id];
  const override = store.pages[id] ?? {};
  const mergedRobots = override.robots ?? basePage.robots ?? defaultRobots;

  return {
    ...basePage,
    ...override,
    path: basePage.path,
    robots: {
      ...mergedRobots,
      index: basePage.robots?.index === false ? false : mergedRobots.index,
    },
  };
}

export async function getSeoPageConfigs() {
  const entries = Object.keys(seo.pages) as SeoPageId[];
  const pages = await Promise.all(
    entries.map(async (id) => [id, await getSeoPageConfig(id)] as const),
  );

  return Object.fromEntries(pages) as Record<SeoPageId, SeoPageConfig>;
}

export async function saveSeoPageOverride(id: SeoPageId, override: SeoPageOverride) {
  const store = await readSeoOverrideStore();

  store.pages[id] = override;
  store.updatedAt = new Date().toISOString();

  await writeSeoOverrideStore(store);
}

export async function resetSeoPageOverride(id: SeoPageId) {
  const store = await readSeoOverrideStore();

  delete store.pages[id];
  store.updatedAt = new Date().toISOString();

  await writeSeoOverrideStore(store);
}

export { isSeoPageId };
