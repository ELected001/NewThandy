export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  const serializedData = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      dangerouslySetInnerHTML={{ __html: serializedData }}
      type="application/ld+json"
    />
  );
}
