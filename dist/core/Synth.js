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
exports.synth = exports.Synth = void 0;
const Note_1 = require("./Note");
const PlayableNote_1 = require("./PlayableNote");
class Synth {
    constructor() {
        this._volume = 0.2;
        this._waveform = 'sine';
    }
    volume(volume) {
        this._volume = volume;
        return this;
    }
    waveform(waveform) {
        this._waveform = waveform;
        return this;
    }
    note(note) {
        const n = note instanceof Note_1.Note ? note : new Note_1.Note(note);
        return new PlayableNote_1.PlayableNote(n)
            .volume(this._volume)
            .waveform(this._waveform);
    }
    chord(notes) {
        return {
            play: () => notes.forEach(n => this.note(n).play()),
        };
    }
    melody(notes) {
        return {
            play: () => __awaiter(this, void 0, void 0, function* () {
                for (const note of notes) {
                    yield this.note(note).play();
                }
            })
        };
    }
}
exports.Synth = Synth;
exports.synth = new Synth();
