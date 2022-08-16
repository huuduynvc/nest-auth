import { Inject } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CommentAddedDto } from 'src/posts/dto/comment-added.dto';
import { PostsService } from 'src/posts/posts.service';
import { Author } from './models/author.model';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private postsService: PostsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(() => Author, { name: 'author' })
  async getAuthor() {
    return null;
    //return this.authorsService.findOneById(id);
  }

  @Subscription(() => CommentAddedDto)
  commentAdded() {
    return this.pubSub.asyncIterator('commentAdded');
  }
}
