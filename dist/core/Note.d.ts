export declare class Note {
    private _name;
    private _frequency;
    private _midi;
    constructor(note: number | string);
    octave(n: number): Note;
    transpose(semitones: number): Note;
    sharp(): Note;
    flat(): Note;
    get frequency(): number;
    get name(): string;
    get midi(): number;
    private nameToMidi;
    private midiToFreq;
    private midiToName;
}
