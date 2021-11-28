import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto } from './Dto/create.dto';
import { UpdateDto } from './Dto/update.dto';
import { Entity } from './entities/entityname.entity';

@Injectable()
export class AppService {
  //fake database
  private entities: Entity[] = [];

  //service methods
  getAll(): Entity[] {
    return this.entities;
  }

  getOne(id: string): Entity {
    const foundEntity = this.entities.find((entity) => entity.id === id);
    if (!foundEntity) {
      throw new NotFoundException(`Cannot find entity with id = ${id}`);
    }
    return foundEntity;
  }

  create(payload: CreateDto): Entity {
    this.entities.push({
      id: (this.entities.length + 1).toString(),
      ...payload,
    });
    return this.entities[this.entities.length - 1];
  }

  delete(id: string) {
    this.getOne(id);
    this.entities = this.entities.filter((entity) => entity.id !== id);
    return true;
  }

  update(id: string, updateData: UpdateDto): Entity {
    const foundEntity = this.getOne(id);
    this.delete(id);
    this.entities.push({ ...foundEntity, ...updateData });
    return this.getOne(id);
  }
}
