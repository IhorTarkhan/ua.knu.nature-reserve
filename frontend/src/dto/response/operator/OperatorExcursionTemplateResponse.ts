import { AnimalInfoResponse } from "../AnimalInfoResponse";
import { PlanedExcursionInfoResponse } from "../PlanedExcursionInfoResponse";

export type OperatorExcursionTemplateResponse = {
  id: number;
  title: string;
  price: number;
  animals: AnimalInfoResponse[];
  excursions: PlanedExcursionInfoResponse[];
};
