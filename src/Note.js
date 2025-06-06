class _Note {
    constructor(input) {
        if (typeof input === "string") {
            this.name = input;
            this.midi = _Note.noteToMidi(input);
            this.frequency = _Note.midiToFreq(this.midi);
        } else if (typeof input === "number") {
            this.midi = input;
            this.frequency = _Note.midiToFreq(input);
            this.name = _Note.midiToNote(input);
        } else {
            throw new Error("Note input must be a string or number");
        }
    }

    static noteToMidi(name) {
        const notes = {
            C: 0,
            'C#': 1,
            D: 2,
            'D#': 3,
            E: 4,
            F: 5,
            'F#': 6,
            G: 7,
            'G#': 8,
            A: 9,
            'A#': 10,
            B: 11,
        };
        const match = name.match(/^([A-G]#?)(-?\d)$/);
        if (!match) throw new Error(`Invalid note name for : ${name}`);
        const [, note, octave] = match;
        return 12 * (parseInt(octave) + 1) + notes[note]; // MIDI FORMULA
    }

    static midiToFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12); //MIDI to Hz formula
    }

    static midiToNote(midi) {
        const notes = [
            'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
        ];
        const note = notes[midi % 12];
        const octave = Math.floor(midi / 12) - 1; //Reversed formula
        return `${note}${octave}`;
    }

    octave(n) {
        const newName = this.name.replace(/\d$/, String(n));
        return Note(newName);
    }

    transpose(semitones){
        return Note(this.midi + semitones);
    }

    sharp(){
        return this.transpose(1);
    }

    flat() {
        return this.transpose(-1);
    }
}

function Note(input) {
    return new _Note(input);
}
module.exports = {Note}
