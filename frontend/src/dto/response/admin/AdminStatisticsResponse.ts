export type AdminStatisticsResponse = {
  day: string;
  animals: AnimalResponse[];
  excursions: ExcursionResponse[];
};

type AnimalResponse = {
  nickname: string;
  keeping: number;
  illnessKeeping: { [key: string]: number };
};

type ExcursionResponse = {
  time: string;
  title: string;
  visitors: number;
  price: number;
};
