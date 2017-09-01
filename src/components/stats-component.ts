export interface StatsData {
  hitPoints: number;
  hitPointsMax: number;
}

export class StatsComponent implements StatsData {
  hitPoints: number;
  hitPointsMax: number;

  constructor(options: Partial<StatsData> = {}) {
    Object.assign(this, {
      hitPoints: 0,
      hitPointsMax: 0,
    }, options);
  }
}
