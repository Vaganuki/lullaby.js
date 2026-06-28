"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioContextManager = void 0;
class AudioContextManager {
    constructor() {
        this.audioCtx = null;
        this.unlocked = false;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AudioContextManager();
        }
        return this.instance;
    }
    getContext() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (!this.unlocked || this.audioCtx.state === 'suspended') {
                yield this.unlock();
            }
            return this.audioCtx;
        });
    }
    unlock() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.unlocked || !this.audioCtx) {
                return;
            }
            try {
                yield this.audioCtx.resume();
                this.unlocked = true;
            }
            catch (e) {
                console.warn('Failed to unlock audio context :', e);
            }
        });
    }
    getCurrentTime() {
        var _a;
        return ((_a = this.audioCtx) === null || _a === void 0 ? void 0 : _a.currentTime) || 0;
    }
}
exports.AudioContextManager = AudioContextManager;
