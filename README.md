# lullaby.js

Lullaby is a lightweight TypeScript library that simplifies playing music and sound effects in the browser. No complex Web Audio API setup — just notes, chords, and melodies.

## Installation

```bash
npm install lullaby.js
```

## Quick start

```ts
import { synth, Note } from 'lullaby.js';

synth.note(new Note('A4')).play();
```

## Concepts

Lullaby is built around three classes:

- **`Note`** — represents a musical note. Handles frequency calculation, MIDI conversion, and note naming.
- **`PlayableNote`** — wraps a `Note` with audio options (volume, waveform, effects) and plays it via the Web Audio API.
- **`Synth`** — a configurable factory that creates `PlayableNote` instances. Use it as your main entry point.

## Usage

### Playing a note

```ts
import { synth, Note } from 'lullaby.js';

synth.note(new Note('A4')).play();        // by name
synth.note(69).play();                    // by MIDI number
synth.note('C4').play();                  // shorthand string
synth.note('C4').play(2);                 // play for 2 seconds (default: 0.5s)
```

### Configuring the synth

```ts
synth
  .volume(0.8)          // 0 to 1
  .waveform('square')   // 'sine' | 'square' | 'sawtooth' | 'triangle'
  .note('E4')
  .play();
```

### Chords

All notes in a chord play simultaneously.

```ts
synth.chord([new Note('C4'), new Note('E4'), new Note('G4')]).play();

// Shorthand
synth.chord(['C4', 'E4', 'G4']).play();
```

### Melodies

Notes in a melody play sequentially, each waiting for the previous to finish.

```ts
synth.melody(['C4', 'D4', 'E4', 'F4', 'G4']).play();

// With custom duration per note
synth
  .note('A4')
  .play(0.25); // eighth note feel
```

### Effects

Effects are applied per `PlayableNote` via chaining.

#### Fade in / Fade out

```ts
synth.note('A4').fade('in', 0.3).play(1);   // fade in over 0.3s
synth.note('A4').fade('out', 0.5).play(1);  // fade out over 0.5s
```

#### Delay

```ts
synth.note('C4').delay(500).play();  // wait 500ms before playing
```

#### Vibrato

```ts
synth.note('E4').effect('vibrato', { rate: 5, depth: 15 }).play(2);
```

### Working with Note directly

```ts
import { Note } from 'lullaby.js';

const a4 = new Note('A4');

a4.frequency;         // 440
a4.midi;              // 69
a4.name;              // 'A4'

a4.sharp();           // Note: A#4
a4.flat();            // Note: Ab4
a4.transpose(7);      // Note: E5 (perfect fifth up)
a4.octave(2);         // Note: A2
```

## API reference

### `Note`

| Constructor | Description |
|---|---|
| `new Note(name: string)` | Create from note name, e.g. `'C4'`, `'F#3'`, `'Bb5'` |
| `new Note(midi: number)` | Create from MIDI number (0–127) |

| Method / Property | Returns | Description |
|---|---|---|
| `.frequency` | `number` | Frequency in Hz |
| `.midi` | `number` | MIDI note number |
| `.name` | `string` | Note name, e.g. `'A4'` |
| `.sharp()` | `Note` | One semitone up |
| `.flat()` | `Note` | One semitone down |
| `.transpose(semitones)` | `Note` | Transpose by N semitones |
| `.octave(n)` | `Note` | Same note in octave N |

### `Synth`

| Method | Returns | Description |
|---|---|---|
| `.volume(v: number)` | `this` | Set volume (0–1) |
| `.waveform(type)` | `this` | Set waveform type |
| `.note(note)` | `PlayableNote` | Create a playable note |
| `.chord(notes)` | `{ play() }` | Play notes simultaneously |
| `.melody(notes)` | `{ play() }` | Play notes sequentially |

### `PlayableNote`

| Method | Returns | Description |
|---|---|---|
| `.volume(v: number)` | `this` | Set volume (0–1) |
| `.waveform(type)` | `this` | Set waveform type |
| `.fade(type, duration)` | `this` | Add fade in/out effect |
| `.delay(ms)` | `this` | Delay playback by N milliseconds |
| `.effect(type, config)` | `this` | Add an effect |
| `.play(duration?)` | `Promise<void>` | Play the note (default: 0.5s) |
| `.stop()` | `void` | Stop immediately |

### Effect types

| Type | Config | Description |
|---|---|---|
| `'vibrato'` | `{ rate: number, depth: number }` | Pitch oscillation via LFO |
| `'fadeIn'` | `{ duration: number }` | Volume ramp up |
| `'fadeOut'` | `{ duration: number }` | Volume ramp down |
| `'delay'` | — | Use `.delay(ms)` instead |

## Note naming

Notes follow the format `{note}{octave}`, e.g. `C4`, `F#3`, `Bb5`.

Middle C is `C4`. A440 is `A4`.

Supported accidentals: `#` (sharp) and `b` (flat) — e.g. `C#4` and `Db4` resolve to the same frequency.

## Browser support

Lullaby uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), supported in all modern browsers. It is not compatible with server-side environments (Node.js, SSR).

Audio context unlock is handled automatically on first user interaction.

## License

MIT