import type { MDXComponents } from 'mdx/types'
import {
    ArchitectureArrow,
    ArchitectureBox,
    ArchitectureDiagram,
    ArchitectureRow,
    ArchitectureSpacer,
    ArchitectureTwoWayArrow,
    ArchitectureTwoWayVerticalArrow,
} from "@/app/components/ArchitectureDiagram";

const components = {
    ArchitectureArrow,
    ArchitectureBox,
    ArchitectureDiagram,
    ArchitectureRow,
    ArchitectureSpacer,
    ArchitectureTwoWayArrow,
    ArchitectureTwoWayVerticalArrow,
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
    return components
}
