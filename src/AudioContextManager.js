class _AudioContextManager {

    constructor() {
        this.ctx = null
    }

    getContext() {
        if (!this.ctx) {
            this.ctx = new (globalThis.AudioContext || globalThis.webkitAudioContext)();
        }
        return this.ctx;
    }

    unlock(){
        const ctx = this.getContext();
        if(ctx.state === 'suspended'){
            return ctx.resume();
        }
    }
}

const audioContextManager = new _AudioContextManager();

module.exports = {audioContextManager};