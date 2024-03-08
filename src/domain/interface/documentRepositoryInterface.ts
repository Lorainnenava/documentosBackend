import { SaveOptions } from 'typeorm';
import {
  DeleteCriteriaType,
  FindAllCriteriaType,
  FindOneCriteriaType,
  UpdateCriteriaType,
} from './types';
import { DocumentEntity } from '../documents/entity/document.entity';

/**
 * Representa la interfaz para un repositorio de documentos.
 * @template Document El tipo de entidad.
 */
export interface DocumentRepositoryInterface {
  /**
   * Recupera todas las entidades.
   * @returns Una promesa que resuelve una matriz de entidades
   */
  findAll(
    options?: FindAllCriteriaType<DocumentEntity>,
  ): Promise<DocumentEntity[]>;

  /**
   * Recupera una única entidad por su termino de búsqueda.
   * @param criteria - Termino de búsqueda.
   * @returns Una promesa que resuelve la entidad encontrada.
   */
  findOne(
    criteria: FindOneCriteriaType<DocumentEntity>,
  ): Promise<DocumentEntity>;

  /**
   * Crea una nueva entidad.
   * @param entity - La entidad a crear.
   * @returns La entidad creada.
   */
  create(entity: DocumentEntity): Promise<DocumentEntity>;

  /**
   * Grabar una nueva entidad.
   * @param entity - La entidad a grabar.
   * @returns La entidad grabada.
   */
  save(entity: DocumentEntity, options?: SaveOptions): Promise<DocumentEntity>;

  /**
   * Actualiza una entidad existente.
   * @param criteria - Termino de búsqueda.
   * @param entity - La entidad actualizada.
   * @returns Una promesa que resuelve a la entidad actualizada.
   */
  update(
    criteria: UpdateCriteriaType<DocumentEntity>,
    entity: DocumentEntity,
  ): Promise<DocumentEntity>;

  /**
   * Elimina una entidad por su termino eliminación.
   * @param criteria - El termino de la entidad a eliminar.
   * @returns Una promesa que resuelve a la entidad eliminada.
   */
  delete(criteria: DeleteCriteriaType<DocumentEntity>): Promise<DocumentEntity>;
}
