import { Module } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { PubSubModule } from 'src/pubsub.module';
import { PostsResolvers } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [PubSubModule],
  providers: [PostsResolvers, AuthorsService, PostsService],
})
export class PostsModule {}
