import { Note } from "./Note";
import { EffectType } from "../types";
export declare class PlayableNote {
    private _note;
    private _volume;
    private _waveform;
    private _effects;
    private _delayTime;
    constructor(note: Note);
    volume(v: number): PlayableNote;
    waveform(type: OscillatorType): PlayableNote;
    effect(type: EffectType, config: any): PlayableNote;
    delay(duration: number): PlayableNote;
    fade(type: 'in' | 'out', duration: number): PlayableNote;
    play(duration?: number): Promise<void>;
    private applyEffects;
    private applyVibrato;
}
