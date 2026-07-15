import Link from "next/link";
import { getGroupedContent, type ContentEntry } from "./content";

export default function BlogPage() {
  const content = getGroupedContent();

  return (
    <main className="flex flex-1 w-full flex-col gap-12 bg-white px-8 py-16 font-serif text-zinc-950 dark:bg-black dark:text-zinc-50 sm:px-16">
      <div className="max-w-3xl">
          <Link
              href="/"
              className="mb-6 block font-mono text-sm no-underline text-zinc-500 hover:text-accent-700 dark:text-zinc-400 dark:hover:text-accent-300"
          >
              Back to Home
          </Link>
        <h1 className="text-4xl font-semibold tracking-normal">Projects</h1>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Selected work from software design, architecture, and full-stack product development.
        </p>
      </div>

      <div className="w-full max-w-5xl">
        <ContentList title="Projects" entries={content.projects} />
      </div>
    </main>
  );
}

function ContentList({
  title,
  entries,
}: {
  title: string;
  entries: ContentEntry[];
}) {
  return (
    <section>
      <h2 className="border-b border-zinc-200 pb-3 font-mono text-sm font-semibold uppercase tracking-normal text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {title}
      </h2>
      {entries.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-5">
          {entries.map((entry) => (
            <li key={`${entry.type}-${entry.slug}`}>
              <Link
                href={`/blog/${entry.slug}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                <h3 className="text-2xl font-semibold tracking-normal group-hover:text-accent-700 dark:group-hover:text-accent-300">
                  {entry.title}
                </h3>
                {entry.description ? (
                  <p className="mt-2 font-mono text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {entry.description}
                  </p>
                ) : null}
                <TagList tags={entry.tags} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 font-mono text-sm text-zinc-500 dark:text-zinc-400">
          No entries yet.
        </p>
      )}
    </section>
  );
}

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="mt-3 flex flex-wrap gap-2">
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
