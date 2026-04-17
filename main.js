import Alpine from 'alpinejs'

globalThis.Alpine = Alpine

Alpine.data('paintApp', () => ({
    size: 10,
    color: '#000000',
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
        const rect = this.canvas.getBoundingClientRect()
        const dpr = window.devicePixelRatio || 1
        this.canvas.width = Math.round(rect.width * dpr)
        this.canvas.height = Math.round(rect.height * dpr)
        this.ctx = this.canvas.getContext('2d')
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    },
    startDrawing(event) {
        if (!this.ctx) return
        this.isDrawing = true
        const { x, y } = this.getPointerPosition(event)
        this.lastX = x
        this.lastY = y
        this.drawPoint(x, y)
    },
    draw(event) {
        if (!this.isDrawing || !this.ctx) return

        const { x, y } = this.getPointerPosition(event)
        const brushSize = Number(this.size)
        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = brushSize
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
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
    },
    drawPoint(x, y) {
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(x, y, Number(this.size) / 2, 0, Math.PI * 2)
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
