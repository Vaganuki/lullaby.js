export class AudioContextManager {
    private static instance: AudioContextManager;
    private audioCtx: AudioContext | null = null;
    private unlocked: boolean = false;

    static getInstance() {
        if (!this.instance) {
            this.instance = new AudioContextManager();
        }
        return this.instance;
    }

    async getContext() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        if (!this.unlocked || this.audioCtx.state === 'suspended') {
            await this.unlock();
        }

        return this.audioCtx;
    }

    private async unlock(): Promise<void> {
        if (this.unlocked || !this.audioCtx) {
            return;
        }
        try {
            await this.audioCtx.resume();
            this.unlocked = true;
        } catch (e) {
            console.warn('Failed to unlock audio context :', e);
        }
    }

    getCurrentTime(): number {
        return this.audioCtx?.currentTime || 0;
    }

}