import Link from "next/link";
import {getGroupedContent, type ContentEntry} from "@/app/projects/content";

const contactLinks = [
    {
        label: "Email",
        value: "joseph.simpson@jsdesdev.com",
        href: "mailto:joseph.simpson@jsdesdev.com",
    },
    {
        label: "GitHub",
        value: "github.com/jsimpson15011",
        href: "https://github.com/jsimpson15011",
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/joseph-simpson-development/",
        href: "https://www.linkedin.com/in/joseph-simpson-development/",
    },
];

export default function Home() {
    const featuredProject = getFeaturedProject(getGroupedContent().projects);
    const projects = featuredProject ? [featuredProject] : [];

    return (
        <main
            className="flex w-full flex-col gap-16 bg-white px-8 py-16 font-serif text-zinc-950 dark:bg-black dark:text-zinc-50 sm:px-16">
            <section>
                <p className="font-mono text-sm font-semibold uppercase tracking-normal text-accent-700 dark:text-accent-300">
                    Software design and development
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                    A software engineer focused on building practical, scalable software that&#39;s a delight to use.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                    At the end of the day, software exists to serve people. I take pride in building products that solve
                    real problems while remaining intuitive, reliable, and enjoyable to use.
                </p>
            </section>
            <section className="max-w-5xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-normal">Projects</h2>
                    </div>
                    <Link
                        href="/projects"
                        className="font-mono text-sm font-semibold uppercase tracking-normal text-accent-700 hover:text-accent-900 dark:text-accent-300 dark:hover:text-accent-100"
                    >
                        View all projects
                    </Link>
                </div>

                <ProjectList projects={projects}/>
            </section>
            <section className="border-y border-zinc-200 py-8 dark:border-zinc-800">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-normal">Contact</h2>
                        <p className="mt-2 max-w-md font-mono text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            For project work, collaboration, or technical questions, these are
                            the best places to reach me.
                        </p>
                    </div>
                    <dl className="grid gap-4 sm:grid-cols-3 md:min-w-136">
                        {contactLinks.map((item) => (
                            <div key={item.label}>
                                <dt className="font-mono text-xs font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
                                    {item.label}
                                </dt>
                                <dd className="mt-1">
                                    <a
                                        href={item.href}
                                        className="wrap-break-word text-base font-semibold text-zinc-950 underline decoration-accent-400 underline-offset-4 hover:text-accent-700 dark:text-zinc-50 dark:hover:text-accent-300"
                                    >
                                        {item.value}
                                    </a>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

        </main>
    );
}

function ProjectList({projects}: { projects: ContentEntry[] }) {
    if (projects.length === 0) {
        return (
            <p className="mt-8 font-mono text-sm text-zinc-500 dark:text-zinc-400">
                No projects published yet.
            </p>
        );
    }

    return (
        <ul className="mt-8 grid max-w-2xl gap-6">
            {projects.map((project) => (
                <li
                    key={project.slug}
                    className="border border-zinc-200 p-5 dark:border-zinc-800"
                >
                    <Link href={`/projects/${project.slug}`} className="group block">
                        <h3 className="mt-3 text-2xl font-semibold tracking-normal group-hover:text-accent-700 dark:group-hover:text-accent-300">
                            {project.title}
                        </h3>
                        {project.description ? (
                            <p className="mt-3 font-mono text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                {project.description}
                            </p>
                        ) : null}
                        <TagList tags={project.tags}/>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function getFeaturedProject(projects: ContentEntry[]) {
    const featuredProjects = projects.filter((project) => project.featured);

    return featuredProjects[0] ?? projects[0];
}

function TagList({tags}: { tags: string[] }) {
    if (tags.length === 0) {
        return null;
    }

    return (
        <ul className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
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
