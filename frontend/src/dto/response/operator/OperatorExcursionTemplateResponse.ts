import { AnimalInfoResponse } from "../AnimalInfoResponse";

export type OperatorExcursionTemplateResponse = {
  id: number;
  price: number;
  animals: AnimalInfoResponse[];
};
