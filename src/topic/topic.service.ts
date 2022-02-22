import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTopicInput } from './dto/create-topic.input';
import { UpdateTopicInput } from './dto/update-topic.input';
import { Topic } from './topic.entity';
import { TopicRepository } from './topic.repository';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicRepository)
    private topicRepository: TopicRepository,
  ) {}

  async createTopic(createTopicInput: CreateTopicInput): Promise<Topic> {
    const topic = this.topicRepository.create(createTopicInput);
    return await this.topicRepository.save(topic);
  }

  async getAllTopics(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }

  async getTopicById(id: number): Promise<Topic> {
    return await this.topicRepository.findOne(id);
  }

  async update(id: number, updateTopicInput: UpdateTopicInput): Promise<Topic> {
    const topic: Topic = this.topicRepository.create(updateTopicInput);
    topic.id = id;
    return await this.topicRepository.save(topic);
  }

  async remove(id: number): Promise<Topic> {
    const topic = this.getTopicById(id);
    if (topic) {
      const response = await this.topicRepository.delete(id);
      if (response.affected === 1) {
        return topic;
      }
    } else {
      throw new NotFoundException('Topic not found');
    }
  }
}
