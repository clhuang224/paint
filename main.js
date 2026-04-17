import Alpine from 'alpinejs'

globalThis.Alpine = Alpine

Alpine.data('paintApp', () => ({
    size: 10,
    color: '#000000',
    canvas: null,
    isDrawing: false,
    startDrawing() {
        this.isDrawing = true
    },
    draw(event) {
        if (!this.isDrawing) return

        const rect = this.canvas.getBoundingClientRect()
        const scaleX = this.canvas.width / rect.width
        const scaleY = this.canvas.height / rect.height
        const x = (event.clientX - rect.left) * scaleX
        const y = (event.clientY - rect.top) * scaleY

        const ctx = this.canvas.getContext('2d')
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(x, y, this.size / 2, 0, Math.PI * 2)
        ctx.fill()
    },
    stopDrawing() {
        this.isDrawing = false
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
