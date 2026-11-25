import type { Metadata } from "next";
import NotFound from "@/components/NotFound";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `404 · ${site.name}`,
};

export default function NotFoundPage() {
  return <NotFound />;
}
