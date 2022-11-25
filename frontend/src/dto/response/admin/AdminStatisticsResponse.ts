export type AdminStatisticsResponse = {
  day: Date;
  animals: AnimalResponse[];
  excursions: ExcursionResponse[];
};

type AnimalResponse = {
  nickname: string;
  keeping: number;
  illnessKeeping: { [key: string]: number };
};

type ExcursionResponse = {
  time: Date;
  title: string;
  visitors: number;
};
