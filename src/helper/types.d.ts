import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
} from 'typeorm';

export type UpdateCriteriaType<E> =
  | string
  | number
  | Date
  | string[]
  | number[]
  | Date[]
  | FindOptionsWhere<E>
  | ObjectId
  | ObjectId[];

export type DeleteCriteriaType<E> = CriteriaType<E>;

export type FindAllCriteriaType<E> = FindManyOptions<E>;

export type FindOneCriteriaType<E> = FindOneOptions<E>;
