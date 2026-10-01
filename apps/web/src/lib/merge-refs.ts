import type { Ref, RefObject } from "react"

export const mergeRefs = <T>(...refs: (Ref<T> | undefined)[]) => (node: T | null) => {
    refs.forEach((ref) => {
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as RefObject<T | null>).current = node
    })
}
