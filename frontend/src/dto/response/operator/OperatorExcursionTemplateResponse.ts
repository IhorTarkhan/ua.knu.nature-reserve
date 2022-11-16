import { AnimalInfoResponse } from "../AnimalInfoResponse";
import { PlanedExcursionInfoResponse } from "../PlanedExcursionInfoResponse";

export type OperatorExcursionTemplateResponse = {
  id: number;
  price: number;
  animals: AnimalInfoResponse[];
  excursions: PlanedExcursionInfoResponse[];
};
