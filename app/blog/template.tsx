import { BlogRouteTransition } from "@/components/site/blog-route-transition";

export default function BlogTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BlogRouteTransition>{children}</BlogRouteTransition>;
}
