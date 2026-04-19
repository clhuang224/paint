import Alpine from 'alpinejs'
import type { PaintApp } from './interfaces/PaintApp'
import { getBrush, initBrushStore } from './stores/brush'
import { getHistory, initHistoryStore } from './stores/history'
import { formatDate } from './utils/formatDate'

initBrushStore()
initHistoryStore()

Alpine.data('paintApp', (): PaintApp => ({
    canvas: null,
    ctx: null,
    isDrawing: false,
    lastX: null,
    lastY: null,
    init() {
        this.canvas = this.$refs.canvas
        this.syncCanvasSize()
        this.captureSnapshot()
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
        if (this.isDrawing) this.captureSnapshot()
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
    captureSnapshot() {
        if (!this.ctx || !this.canvas) return

        const history = getHistory()
        const snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        history.push(snapshot)
    },
    restoreSnapshot(snapshot) {
        if (!this.ctx || !this.canvas) return
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.putImageData(snapshot, 0, 0)
    },
    exportImage() {
        if (!this.canvas) return

        const link = document.createElement('a')
        link.download = `paint-${formatDate(new Date())}.png`
        link.href = this.canvas.toDataURL('image/png')
        link.click()
    },
    clearCanvas() {
        if (!this.ctx || !this.canvas) return
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.captureSnapshot()
    },
    undoAction() {
        const history = getHistory()
        const snapshot = history.undo()
        if (!snapshot) return
        this.restoreSnapshot(snapshot)
    },
    redoAction() {
        const history = getHistory()
        const snapshot = history.redo()
        if (!snapshot) return
        this.restoreSnapshot(snapshot)
    },
}))

Alpine.start()
