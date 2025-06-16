import {Note} from "./Note";
import {EffectType, VibratoConfig} from "../types";
import {AudioContextManager} from "./AudioContextManager";

export class PlayableNote {
    private _note: Note;
    private _volume = 0.5;
    private _waveform: OscillatorType = 'sine';
    private _effects: Array<{ type: EffectType; config?: any }> = [];
    private _delayTime = 0;

    constructor(note: Note) {
        this._note = note;
    }

    volume(v: number): PlayableNote {
        this._volume = Math.max(0, Math.min(1, v));
        return this;
    }

    waveform(type: OscillatorType): PlayableNote {
        this._waveform = type;
        return this;
    }

    effect(type: EffectType, config: any): PlayableNote {
        this._effects.push({type, config});
        return this;
    }

    delay(duration: number): PlayableNote {
        this._delayTime = duration / 1000;
        return this;
    }

    fade(type: 'in' | 'out', duration: number): PlayableNote {
        return this.effect(type === 'in' ? 'fadeIn' : 'fadeOut', {duration});
    }

    async play(duration = 0.5): Promise<void> {
        const audioManager = AudioContextManager.getInstance();
        const audioCtx = await audioManager.getContext();

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
    }

    private applyEffects(
        audioCtx: AudioContext,
        osc: OscillatorNode,
        gainNode: GainNode,
        startTime: number,
        duration: number
    ) {
        this._effects.forEach(({type, config}) => {
            switch (type) {
                case 'vibrato':
            }
        })
    }

    private applyVibrato(
        audioCtx: AudioContext,
        osc: OscillatorNode,
        startTime: number,
        duration: number,
        config: VibratoConfig = { rate: 4, depth:10}
    ){
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