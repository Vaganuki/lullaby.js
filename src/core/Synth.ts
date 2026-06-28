import {WaveForm} from "../types";
import {Note} from "./Note";
import {PlayableNote} from "./PlayableNote";

export class Synth {
    private _volume: number = 0.2;
    private _waveform: WaveForm = 'sine';

    volume(volume: number) : this {
        this._volume = volume;
        return this;
    }

    waveform(waveform: WaveForm) : this {
        this._waveform = waveform;
        return this;
    }

    note(note: Note | number | string ) : PlayableNote {

        const n = note instanceof Note ? note : new Note(note);

        return new PlayableNote(n)
            .volume(this._volume)
            .waveform(this._waveform);
    }

    chord(notes: (Note | number | string)[]) : {play: () => void} {
        return {
            play: () => notes.forEach(n => this.note(n).play()),
        }
    }

    melody(notes: (Note | number | string)[]) : {play: () => Promise<void>} {
        return {
            play: async() => {
                for (const note of notes) {
                    await this.note(note).play();
                }
            }
        }
    }

}

export const synth = new Synth();