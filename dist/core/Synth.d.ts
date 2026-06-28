import { WaveForm } from "../types";
import { Note } from "./Note";
import { PlayableNote } from "./PlayableNote";
export declare class Synth {
    private _volume;
    private _waveform;
    volume(volume: number): this;
    waveform(waveform: WaveForm): this;
    note(note: Note | number | string): PlayableNote;
    chord(notes: (Note | number | string)[]): {
        play: () => void;
    };
    melody(notes: (Note | number | string)[]): {
        play: () => Promise<void>;
    };
}
export declare const synth: Synth;
