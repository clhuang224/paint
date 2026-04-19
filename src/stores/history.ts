import Alpine from 'alpinejs'

export interface HistoryStore {
    MAX_ENTRIES: number
    snapshots: ImageData[]
    pointer: number
    canUndo(): boolean
    canRedo(): boolean
    push(snapshot: ImageData): void
    undo(): ImageData | null
    redo(): ImageData | null
}

export const DEFAULT_MAX_HISTORY_ENTRIES = 100

export const initHistoryStore = () => {
    Alpine.store('history', {
        MAX_ENTRIES: DEFAULT_MAX_HISTORY_ENTRIES,
        snapshots: [],
        pointer: -1,
        canUndo() {
            return this.pointer > 0
        },
        canRedo() {
            return this.pointer < this.snapshots.length - 1
        },
        push(snapshot) {
            this.snapshots = this.snapshots.slice(0, this.pointer + 1)
            this.snapshots.push(snapshot)
            if (this.snapshots.length > this.MAX_ENTRIES) {
                this.snapshots.shift()
            }
            this.pointer = this.snapshots.length - 1
        },
        undo() {
            if (!this.canUndo()) return null
            this.pointer -= 1
            return this.snapshots[this.pointer] ?? null
        },
        redo() {
            if (!this.canRedo()) return null
            this.pointer += 1
            return this.snapshots[this.pointer] ?? null
        },
    } satisfies HistoryStore)
}

export const getHistory = () => Alpine.store('history') as HistoryStore
