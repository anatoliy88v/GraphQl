import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { TopicService } from './topic.service';
import { Topic } from './topic.entity';
import { CreateTopicInput } from './dto/create-topic.input';
import { UpdateTopicInput } from './dto/update-topic.input';
import { User } from 'src/user/user.entity';
import { forwardRef, Inject } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/course.entity';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(
    private readonly topicService: TopicService,
    @Inject(forwardRef(() => CourseService)) private courseService: CourseService,
  ) {}

  @Mutation(() => Topic)
  createTopic(@Args('createTopicInput') createTopicInput: CreateTopicInput) {
    return this.topicService.createTopic(createTopicInput);
  }

  @Query(() => [Topic], { name: 'getAllTopics' })
  getAllTopics() {
    return this.topicService.getAllTopics();
  }

  @Query(() => Topic, { name: 'getTopicById' })
  getTopicById(@Args('id', { type: () => Int }) id: number) {
    return this.topicService.getTopicById(id);
  }

  @ResolveField(() => Course)
  course(@Parent() topic: Topic) {
    return this.courseService.getCourseById(topic.courseId);
  }

  @ResolveField(() => [User])
  users(@Parent() user: User) {
    return this.courseService.getUsersByCourseId(user.courseId);
  }

  @Mutation(() => Topic)
  updateTopic(@Args('updateTopicInput') updateTopicInput: UpdateTopicInput) {
    return this.topicService.update(updateTopicInput.id, updateTopicInput);
  }

  @Mutation(() => Topic)
  removeTopic(@Args('id', { type: () => Int }) id: number) {
    return this.topicService.remove(id);
  }
}
