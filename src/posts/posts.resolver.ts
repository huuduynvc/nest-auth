import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GqlThrottlerGuard } from 'src/graph-throttler.guard';
import { CommentAddedDto } from './dto/comment-added.dto';
import { PostsService } from './posts.service';

@Resolver('Post')
export class PostsResolvers {
  constructor(
    private postsService: PostsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}
  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => CommentAddedDto)
  async addComment(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('comment', { type: () => String }) comment: string,
  ) {
    const newComment = this.postsService.addComment({
      id: postId,
      comment,
    });

    this.pubSub.publish('commentAdded', {
      commentAdded: newComment,
    });
    return newComment;
  }
}
