import Alpine from 'alpinejs'

globalThis.Alpine = Alpine

Alpine.data('paintApp', () => ({
    size: '10px',
    color: '#000000',
    startDrawing(event) {
        // TODO: implement dragging logic
    },
    draw(event) {
        // TODO: implement drawing logic
    },
    stopDrawing() {
        // TODO
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
