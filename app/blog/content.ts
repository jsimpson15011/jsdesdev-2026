import { evaluate } from "@mdx-js/mdx";
import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import path from "path";
import type { ComponentType } from "react";
import * as runtime from "react/jsx-runtime";

const contentRoot = path.join(process.cwd(), "content");
const contentTypes = ["blog", "projects"] as const;
const contentExtensions = new Set([".md", ".mdx"]);

export type ContentType = (typeof contentTypes)[number];

export type ContentEntry = {
  type: ContentType;
  slug: string;
  title: string;
  description?: string;
  published?: string;
  tags: string[];
  extension: string;
};

type ParsedContent = {
  frontmatter: Record<string, string>;
  body: string;
};

export function getGroupedContent() {
  return {
    blog: getContentEntries("blog"),
    projects: getContentEntries("projects"),
  };
}

export function getAllContentEntries() {
  return contentTypes.flatMap((type) => getContentEntries(type));
}

export function getContentEntry(slug: string) {
  return getAllContentEntries().find((entry) => entry.slug === slug);
}

export async function getContentComponent(entry: ContentEntry) {
  const source = readContentFile(entry);
  const { body } = parseContent(source);
  const { default: Content } = await evaluate(
    { path: getContentPath(entry), value: body },
    { ...runtime, baseUrl: import.meta.url },
  );

  return Content as ComponentType;
}

function getContentEntries(type: ContentType) {
  const directory = path.join(contentRoot, type);

  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory)
    .filter((fileName) => {
      const filePath = path.join(directory, fileName);

      return statSync(filePath).isFile() && contentExtensions.has(path.extname(fileName));
    })
    .map((fileName) => {
      const extension = path.extname(fileName);
      const slug = path.basename(fileName, extension);
      const { frontmatter } = parseContent(readFileSync(path.join(directory, fileName), "utf8"));

      return {
        type,
        slug,
        extension,
        title: frontmatter.title || titleFromSlug(slug),
        published: frontmatter.published,
        description: frontmatter.description,
        tags: parseTags(frontmatter.tags),
      };
    })
    .sort(compareContentEntries);
}

function getContentPath(entry: ContentEntry) {
  return path.join(contentRoot, entry.type, `${entry.slug}${entry.extension}`);
}

function readContentFile(entry: ContentEntry) {
  return readFileSync(getContentPath(entry), "utf8");
}

function parseContent(source: string): ParsedContent {
  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!frontmatterMatch) {
    return { frontmatter: {}, body: source };
  }

  const frontmatter = Object.fromEntries(
    frontmatterMatch[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([^:]+):\s*(.*)$/))
      .filter((match): match is RegExpMatchArray => Boolean(match))
      .map((match) => [match[1].trim(), match[2].trim()]),
  );

  return {
    frontmatter,
    body: source.slice(frontmatterMatch[0].length),
  };
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function compareContentEntries(firstEntry: ContentEntry, secondEntry: ContentEntry) {
  const dateDifference =
    getPublishedTimestamp(secondEntry) - getPublishedTimestamp(firstEntry);

  if (dateDifference !== 0) {
    return dateDifference;
  }

  return firstEntry.title.localeCompare(secondEntry.title);
}

function getPublishedTimestamp(entry: ContentEntry) {
  if (!entry.published) {
    return 0;
  }

  const timestamp = Date.parse(entry.published);

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function parseTags(tags?: string) {
  if (!tags) {
    return [];
  }

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
