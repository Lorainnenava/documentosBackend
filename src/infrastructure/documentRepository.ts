import { HttpException, Injectable } from '@nestjs/common';
import { DocumentEntity } from '../domain/documents/entity/document.entity';
import { DocumentRepositoryInterface } from '../domain/interface/documentRepositoryInterface';
import {
  UpdateCriteriaType,
  DeleteCriteriaType,
  FindAllCriteriaType,
  FindOneCriteriaType,
} from '../domain/interface/types';
import { Repository, SaveOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Repositorio de documentos.
 */
@Injectable()
export class DocumentRepository implements DocumentRepositoryInterface {
  /**
   * Inicializa una nueva instancia de la clase.
   * @param _context - El contexto a utilizar.
   */
  constructor(
    @InjectRepository(DocumentEntity)
    private _documentEntity: Repository<DocumentEntity>,
  ) {}

  /**
   * Recupera todas las entidades.
   * @returns Una promesa que resuelve una matriz de entidades
   * @throws {HttpException} Si se produce un error al recuperar las entidades.
   */
  async findAll(
    options?: FindAllCriteriaType<DocumentEntity>,
  ): Promise<DocumentEntity[]> {
    try {
      const response = await this._documentEntity.find(options);
      return response;
    } catch (error) {
      throw new HttpException(
        `Error encontrando todos los documentos: ${error?.message}`,
        error.status || 500,
      );
    }
  }

  /**
   * Recupera una única entidad por su termino de búsqueda.
   * @param criteria - Termino de búsqueda.
   * @returns Una promesa que resuelve la entidad encontrada.
   * @throws {HttpException} Si se produce un error al recuperar un registro.
   */
  async findOne(
    criteria: FindOneCriteriaType<DocumentEntity>,
  ): Promise<DocumentEntity> {
    try {
      const response = await this._documentEntity.findOne(criteria);
      return response;
    } catch (error) {
      throw new HttpException(
        `Error al encontrar un documento: ${error?.message}`,
        error.status || 500,
      );
    }
  }

  /**
   * Crea una nueva entidad.
   * @param entity - La entidad a crear.
   * @returns La entidad creada.
   * @throws {HttpException} Si se produce un error al crear un registro.
   */
  async create(entity: DocumentEntity): Promise<DocumentEntity> {
    try {
      const response = await this._documentEntity.create(entity);
      await this._documentEntity.save(response);
      return response;
    } catch (error) {
      throw new HttpException(
        `Error creando un documento: ${error.message}`,
        error.status || 500,
      );
    }
  }

  /**
   * Grabar una entidad.
   * @param entity - La entidad a grabar.
   * @returns La entidad grabada.
   * @throws {HttpException} Si se produce un error al grabar un registro.
   */
  async save(
    entity: DocumentEntity,
    options?: SaveOptions,
  ): Promise<DocumentEntity> {
    try {
      const response = await this._documentEntity.save(entity, options);
      return response;
    } catch (error) {
      throw new HttpException(
        `Error grabando un documento: ${error.message}`,
        error.status || 500,
      );
    }
  }

  /**
   * Actualiza una entidad existente.
   * @param criteria - Termino de búsqueda.
   * @param entity - La entidad actualizada.
   * @returns Una promesa que resuelve a la entidad actualizada.
   * @throws {HttpException} Si se produce un error al actualizar un registro.
   */
  async update(
    criteria: UpdateCriteriaType<DocumentEntity>,
    entity: DocumentEntity,
  ): Promise<DocumentEntity> {
    try {
      const response = await this._documentEntity.update(criteria, entity);
      return { ...entity, ...response.raw[0], ...response.generatedMaps[0] };
    } catch (error) {
      throw new HttpException(
        `Error actualizando un documento: ${error.message}`,
        error.status || 500,
      );
    }
  }

  /**
   * Elimina una entidad por su termino eliminación.
   * @param criteria - El termino de la entidad a eliminar.
   * @returns Una promesa que resuelve a la entidad eliminada.
   * @throws {HttpException} Si se produce un error al eliminar un registro.
   */
  async delete(criteria: DeleteCriteriaType<DocumentEntity>): Promise<any> {
    try {
      const response = await this._documentEntity.delete(criteria);
      return response;
    } catch (error) {
      throw new HttpException(
        `Error eliminando un documento: ${error.message}`,
        error.status || 500,
      );
    }
  }
}
