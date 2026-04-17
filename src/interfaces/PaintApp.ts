import type { Point } from './Point'

export interface PaintApp {
    size: number
    color: string
    canvas: HTMLCanvasElement | null
    ctx: CanvasRenderingContext2D | null
    isDrawing: boolean
    lastX: number | null
    lastY: number | null
    init(this: PaintApp & { $refs: { canvas: HTMLCanvasElement } }): void
    syncCanvasSize(this: PaintApp): void
    startDrawing(this: PaintApp, event: PointerEvent): void
    draw(this: PaintApp, event: PointerEvent): void
    stopDrawing(this: PaintApp): void
    getPointerPosition(this: PaintApp, event: PointerEvent): Point
    drawPoint(this: PaintApp, x: number, y: number): void
    exportImage(this: PaintApp): void
    clearCanvas(this: PaintApp): void
    undoAction(this: PaintApp): void
    redoAction(this: PaintApp): void
}
