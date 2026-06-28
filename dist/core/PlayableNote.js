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
exports.PlayableNote = void 0;
const AudioContextManager_1 = require("./AudioContextManager");
class PlayableNote {
    constructor(note) {
        this._volume = 0.5;
        this._waveform = 'sine';
        this._effects = [];
        this._delayTime = 0;
        this._note = note;
    }
    volume(v) {
        this._volume = Math.max(0, Math.min(1, v));
        return this;
    }
    waveform(type) {
        this._waveform = type;
        return this;
    }
    effect(type, config) {
        this._effects.push({ type, config });
        return this;
    }
    delay(duration) {
        this._delayTime = duration / 1000;
        return this;
    }
    fade(type, duration) {
        return this.effect(type === 'in' ? 'fadeIn' : 'fadeOut', { duration });
    }
    play() {
        return __awaiter(this, arguments, void 0, function* (duration = 0.5) {
            const audioManager = AudioContextManager_1.AudioContextManager.getInstance();
            const audioCtx = yield audioManager.getContext();
            const startTime = audioCtx.currentTime + this._delayTime;
            const endTime = startTime + duration;
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = this._waveform;
            osc.frequency.value = this._note.frequency;
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            gainNode.gain.value = this._volume;
            this.applyEffects(audioCtx, osc, gainNode, startTime, duration);
            osc.start(startTime);
            osc.stop(endTime);
            return new Promise((resolve) => {
                setTimeout(() => resolve(), (this._delayTime + duration) * 1000);
            });
        });
    }
    applyEffects(audioCtx, osc, gainNode, startTime, duration) {
        this._effects.forEach(({ type, config }) => {
            switch (type) {
                case 'vibrato':
                    this.applyVibrato(audioCtx, osc, startTime, duration, config);
                    break;
            }
        });
    }
    applyVibrato(audioCtx, osc, startTime, duration, config = { rate: 4, depth: 10 }) {
        const lfo = audioCtx.createOscillator();
        const lfoGain = audioCtx.createGain();
        lfo.frequency.value = config.rate;
        lfoGain.gain.value = config.depth;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(startTime);
        lfo.stop(startTime + duration);
    }
}
exports.PlayableNote = PlayableNote;
