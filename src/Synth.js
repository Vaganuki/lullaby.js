const {_PlayableNote} = require('./PlayableNote');

class _Synth {
    constructor() {
        this._volume = 0.2;
        this._waveform = 'sine';
        this._effects = [];
    }

    volume(volume) {
        this._volume = volume;
        return this;
    }

    waveform(waveform) {
        this._waveform = waveform;
        return this;
    }

    effects(effects) {
        this._effects = effects;
        return this;
    }

    note(note) {
        return new _PlayableNote(note)
            .volume(this._volume)
            .waveform(this._waveform);
    }

    chord(notes) {
        return {
            play: () => notes.forEach(note => this.note(note).play()),
        };
    }

    melody(notes) {
        return {
            play: async () => {
                for (const note of notes) {
                    await this.note(note).play();
                }
            }
        };
    }
}

const synth = new _Synth();

module.exports = synth;