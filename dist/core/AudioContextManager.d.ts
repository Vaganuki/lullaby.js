export declare class AudioContextManager {
    private static instance;
    private audioCtx;
    private unlocked;
    static getInstance(): AudioContextManager;
    getContext(): Promise<AudioContext>;
    private unlock;
    getCurrentTime(): number;
}
