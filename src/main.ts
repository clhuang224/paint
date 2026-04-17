import Alpine from 'alpinejs'
import type { PaintApp } from './interfaces/PaintApp'
import { getBrush } from './stores/brush'

Alpine.data('paintApp', (): PaintApp => ({
    canvas: null,
    ctx: null,
    isDrawing: false,
    lastX: null,
    lastY: null,
    init() {
        this.canvas = this.$refs.canvas
        this.syncCanvasSize()
    },
    syncCanvasSize() {
        if (!this.canvas) return

        const rect = this.canvas.getBoundingClientRect()
        const dpr = window.devicePixelRatio || 1
        this.canvas.width = Math.round(rect.width * dpr)
        this.canvas.height = Math.round(rect.height * dpr)
        this.ctx = this.canvas.getContext('2d')
        if (!this.ctx) return
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    },
    startDrawing(event) {
        if (!this.ctx || !this.canvas) return
        this.isDrawing = true
        const { x, y } = this.getPointerPosition(event)
        this.lastX = x
        this.lastY = y
        this.drawPoint(x, y)
    },
    draw(event) {
        if (!this.isDrawing || !this.ctx || !this.canvas) return
        if (this.lastX === null || this.lastY === null) return

        const { x, y } = this.getPointerPosition(event)
        const { color, size } = getBrush()
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = size
        this.ctx.lineCap = 'round'
        this.ctx.lineJoin = 'round'
        this.ctx.beginPath()
        this.ctx.moveTo(this.lastX, this.lastY)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        this.lastX = x
        this.lastY = y
    },
    stopDrawing() {
        this.isDrawing = false
        this.lastX = null
        this.lastY = null
    },
    getPointerPosition(event) {
        if (!this.canvas) return { x: 0, y: 0 }
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
    },
    drawPoint(x, y) {
        if (!this.ctx) return
        const { color, size } = getBrush()
        this.ctx.fillStyle = color
        this.ctx.beginPath()
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2)
        this.ctx.fill()
    },
    exportImage() {
        // TODO
    },
    clearCanvas() {
        // TODO
    },
    undoAction() {
        // TODO
    },
    redoAction() {
        // TODO
    },
}))

Alpine.start()
