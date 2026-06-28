"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
class Note {
    constructor(note) {
        if (typeof note === "string") {
            this._name = note;
            this._midi = this.nameToMidi(note);
            this._frequency = this.midiToFreq(this._midi);
        }
        else {
            if (note >= 0 && note <= 127) {
                this._midi = note;
                this._frequency = this.midiToFreq(note);
                this._name = this.midiToName(note);
            }
            else {
                throw new Error("Midi note must be between 0 and 127");
            }
        }
    }
    octave(n) {
        const baseNote = this._name.replace(/\d+$/, '');
        return new Note(`${baseNote}${n}`);
    }
    transpose(semitones) {
        return new Note(this._midi + semitones);
    }
    sharp() {
        return this.transpose(1);
    }
    flat() {
        return this.transpose(-1);
    }
    get frequency() {
        return this._frequency;
    }
    get name() {
        return this._name;
    }
    get midi() {
        return this._midi;
    }
    nameToMidi(name) {
        const noteMap = {
            C: 0,
            'C#': 1, 'Db': 1,
            D: 2,
            'D#': 3, 'Eb': 3,
            E: 4,
            F: 5,
            'F#': 6, 'Gb': 6,
            G: 7,
            'G#': 8, 'Ab': 8,
            A: 9,
            'A#': 10, 'Bb': 10,
            B: 11,
        };
        const match = name.match(/^([A-G]#?)(-?\d)$/);
        if (!match) {
            throw new Error(`Invalid note name: ${name}`);
        }
        const [, note, octave] = match;
        return noteMap[note] + (parseInt(octave) + 1) * 12;
    }
    ;
    midiToFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }
    midiToName(midi) {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const octave = Math.floor(midi / 12);
        const note = noteNames[midi % 12];
        return `${note}${octave}`;
    }
}
exports.Note = Note;
