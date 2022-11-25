export type AdminStatisticsResponse = {
    day: Date;
    animals: AnimalResponse[];
    exceptions: ExcursionResponse[];
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
