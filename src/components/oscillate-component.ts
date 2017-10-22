export interface OscillateData {
  t: number;
  xInitial: number;
  yInitial: number;
  xFrequency: number;
  yFrequency: number;
  xAmplitude: number;
  yAmplitude: number;
}

export class OscillateComponent implements OscillateData {
  t: number;
  xInitial: number;
  yInitial: number;
  xFrequency: number;
  yFrequency: number;
  xAmplitude: number;
  yAmplitude: number;

  constructor(options?: Partial<OscillateData>) {
    Object.assign(this, {
      t: 0,
      xInitial: 0,
      yInitial: 0,
      xFrequency: 0,
      yFrequency: 0,
      xAmplitude: 0,
      yAmplitude: 0,
    }, options);
  }
}
