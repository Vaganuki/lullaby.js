const audioContextManager = require('./AudioContextManager');
const {Note} = require('./core/Note');

class _PlayableNote {
    constructor(note) {
        this.note = typeof note === 'string' || typeof note === 'number' ? Note(note) : note;
        this.options = {
            type: 'sine',
            volume: 0.2,
            fade: null,
            fadeDuration: 0.2,
            delay: 0,
        };
    }

    waveform(type) {
        this.options.type = type;
        return this;
    }

    volume(v) {
        this.options.volume = v;
        return this;
    }

    fade(type, duration = 0.2) {
        this.options.fade = type;
        this.options.fadeDuration = duration;
        return this;
    }

    delay(ms) {
        this.options.delay = ms;
        return this;
    }

    stop() {
        if (this.oscillator) this.oscillator.stop();
    }

    async play(duration = 0.5) {
        await audioContextManager.unlock();
        const ctx = audioContextManager.getContext();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        this.oscillator = osc;

        osc.type = this.options.type;
        osc.frequency.value = this.note.frequency;

        gain.gain.setValueAtTime(this.options.volume, ctx.currentTime);

        osc.connect(gain).connect(ctx.destination);

        const start = ctx.currentTime + this.options.delay / 1000;

        if (this.options.fade === 'out') {
            gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        } else if (this.options.fade === 'in') {
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.exponentialRampToValueAtTime(this.options.volume, start + this.options.fadeDuration);
        }

        osc.start(start);
        osc.stop(start + duration);

        return new Promise((resolve) => {
            osc.onended = resolve;
        });
    }
}

module.exports = _PlayableNote;