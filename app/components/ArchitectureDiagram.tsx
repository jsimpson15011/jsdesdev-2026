import Image from "next/image";
import type {ReactNode} from "react";

type ArchitectureBoxKind = "client" | "server" | "database";
type ArchitectureArrowDirection = "right" | "left" | "down";

const boxAssets: Record<
    ArchitectureBoxKind,
    {
        src: string;
        width: number;
        height: number;
        className: string;
        contentClassName: string;
    }
> = {
    client: {
        src: "/client-box-43.png",
        width: 1000,
        height: 750,
        className: "aspect-[4/3]",
        contentClassName: "px-[17%] pb-[13%] pt-[18%]",
    },
    server: {
        src: "/server-box-43.png",
        width: 1000,
        height: 750,
        className: "aspect-[4/3]",
        contentClassName: "px-[16%] pb-[14%] pt-[18%]",
    },
    database: {
        src: "/data-base.png",
        width: 334,
        height: 397,
        className: "aspect-[334/397]",
        contentClassName: "px-[11%] pb-[22%] pt-[24%]",
    },
};

const arrowAssets: Record<
    ArchitectureArrowDirection,
    {
        src: string;
        width: number;
        height: number;
        className: string;
    }
> = {
    right: {
        src: "/right-arrow.png",
        width: 463,
        height: 191,
        className: "h-8 w-20 sm:h-10 sm:w-24",
    },
    left: {
        src: "/right-arrow.png",
        width: 463,
        height: 191,
        className: "h-8 w-20 -scale-x-100 sm:h-10 sm:w-24",
    },
    down: {
        src: "/down-arrow.png",
        width: 137,
        height: 395,
        className: "h-16 w-7 sm:h-20 sm:w-8",
    },
};

export function ArchitectureDiagram({children}: { children: ReactNode }) {
    return (
        <div className="not-prose relative overflow-x-auto border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950 sm:p-4">
            <div className="mx-auto flex min-w-152 max-w-384 flex-col items-center gap-3">
                {children}
            </div>
        </div>
    );
}

export function ArchitectureRow({children}: { children: ReactNode }) {
    return (
        <div className="flex w-full items-center justify-center gap-2">
            {children}
        </div>
    );
}

export function ArchitectureSpacer() {
    return <div className="w-48 shrink-0" aria-hidden="true"/>;
}

export function ArchitectureBox({
                                    children,
                                    kind = "server",
                                    label,
                                }: {
    children: ReactNode;
    kind?: ArchitectureBoxKind;
    label: string;
}) {
    const asset = boxAssets[kind];

    return (
        <figure className={`relative w-48 shrink-0 ${asset.className}`}>
            <Image
                src={asset.src}
                alt=""
                width={asset.width}
                height={asset.height}
                className={
                    kind === "database"
                        ? "absolute left-1/2 top-1/2 h-auto w-32 -translate-x-1/2 -translate-y-1/2 object-contain opacity-70"
                        : "absolute inset-0 h-full w-full object-contain opacity-70"
                }
            />
            <figcaption className={`relative z-10 flex h-full flex-col items-center justify-center text-center ${asset.contentClassName}`}>
                <span className="font-mono text-[0.55rem] font-semibold uppercase tracking-normal text-accent-700 dark:text-accent-300">
                    {label}
                </span>
                <div className="font-mono mt-1 text-balance text-sm leading-tight text-zinc-950 dark:text-zinc-50">
                    {children}
                </div>
            </figcaption>
        </figure>
    );
}

export function ArchitectureArrow({
                                      direction = "right",
                                      label,
                                  }: {
    direction?: ArchitectureArrowDirection;
    label?: string;
}) {
    const asset = arrowAssets[direction];

    return (
        <div className="flex w-48 shrink-0 flex-col items-center gap-1">
            <Image
                src={asset.src}
                alt=""
                width={asset.width}
                height={asset.height}
                className={`object-contain opacity-90 ${asset.className}`}
            />
            {label ? (
                <span className="max-w-28 text-center font-mono text-[0.55rem] font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
                    {label}
                </span>
            ) : null}
        </div>
    );
}

export function ArchitectureTwoWayArrow({label}: { label?: string }) {
    return (
        <div className="flex w-48 shrink-0 flex-col items-center gap-1">
            <div className="flex flex-col items-center justify-center gap-0.5">
                <Image
                    src="/right-arrow.png"
                    alt=""
                    width={463}
                    height={191}
                    className="h-7 w-20 object-contain opacity-90 sm:h-8 sm:w-24"
                />
                <Image
                    src="/right-arrow.png"
                    alt=""
                    width={463}
                    height={191}
                    className="h-7 w-20 -scale-x-100 object-contain opacity-90 sm:h-8 sm:w-24"
                />
            </div>
            {label ? (
                <span className="max-w-32 text-center font-mono text-[0.55rem] font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
                    {label}
                </span>
            ) : null}
        </div>
    );
}
