import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllContentEntries,
  getContentComponent,
  getContentEntry,
} from "../content";

export function generateStaticParams() {
  return getAllContentEntries().map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getContentEntry(slug);

  if (!entry) {
    return {
      title: "Not Found",
    };
  }

  const title = entry.title;
  const description =
    entry.description ??
    `${entry.title} by Joseph Simpson, covering ${entry.tags.join(", ")}.`;
  const url = `/projects/${entry.slug}`;

  return {
    title,
    description,
    keywords: entry.tags,
    openGraph: {
      title: `${title} | Joseph Simpson`,
      description,
      url,
      type: "article",
      publishedTime: entry.published,
      authors: ["Joseph Simpson"],
      tags: entry.tags,
      images: [
        {
          url: "/bracket-logo.png",
          width: 431,
          height: 576,
          alt: "Joseph Simpson bracket logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} | Joseph Simpson`,
      description,
      images: ["/bracket-logo.png"],
    },
  };
}

export default async function ContentPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const entry = getContentEntry(slug);

  if (!entry) {
    notFound();
  }

  const Content = await getContentComponent(entry);

  return (
    <main className="w-full bg-white px-8 py-16 font-serif text-zinc-950 dark:bg-black dark:text-zinc-50 sm:px-16">
      <article className="prose prose-zinc max-w-3xl dark:prose-invert">
        <Link
          href="/projects"
          className="font-mono text-sm no-underline text-zinc-500 hover:text-accent-700 dark:text-zinc-400 dark:hover:text-accent-300"
        >
          Back to all projects
        </Link>
        <p className="mt-8 font-mono text-sm font-semibold uppercase tracking-normal text-accent-700 dark:text-accent-300">
          {entry.type}
        </p>
        <TagList tags={entry.tags} />
        <Content />
      </article>
    </main>
  );
}

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="not-prose mb-8 mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-sm border border-accent-300 px-2 py-1 font-mono text-xs font-medium uppercase tracking-normal text-accent-800 dark:border-accent-700 dark:text-accent-200"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
