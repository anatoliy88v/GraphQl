import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Topic } from './topic.entity';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {

}
