import { AnimalInfoResponse } from "../dto/response/AnimalInfoResponse";
import { OperatorExcursionTemplateResponse } from "../dto/response/operator/OperatorExcursionTemplateResponse";

export const isAvailable = (a: AnimalInfoResponse): boolean => {
  return a.alive && a.healthy;
};

export const isAllAvailable = (
  excursionTemplate: OperatorExcursionTemplateResponse
): boolean => {
  return !excursionTemplate.animals.find((x) => !isAvailable(x));
};
