export type EffectType = 'vibrato' | 'tremolo' | 'fadeIn' | 'fadeOut' | 'delay';

export interface VibratoConfig {
    rate: number;
    depth: number;
}