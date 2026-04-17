import Alpine from 'alpinejs'

export interface BrushStore {
    MIN_SIZE: number
    MAX_SIZE: number
    size: number
    color: string
}

export const MIN_BRUSH_SIZE = 1
export const MAX_BRUSH_SIZE = 50
export const DEFAULT_BRUSH_SIZE = 10
export const DEFAULT_BRUSH_COLOR = '#000000'

export const initBrushStore = () => {
    Alpine.store('brush', {
        MIN_SIZE: MIN_BRUSH_SIZE,
        MAX_SIZE: MAX_BRUSH_SIZE,
        size: DEFAULT_BRUSH_SIZE,
        color: DEFAULT_BRUSH_COLOR,
    } satisfies BrushStore)
}

export const getBrush = () => Alpine.store('brush') as BrushStore
