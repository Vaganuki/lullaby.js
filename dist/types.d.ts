export type EffectType = 'vibrato' | 'tremolo' | 'fadeIn' | 'fadeOut' | 'delay';
export type WaveForm = 'sine' | 'square' | 'sawtooth' | 'triangle';
export interface VibratoConfig {
    rate: number;
    depth: number;
}
