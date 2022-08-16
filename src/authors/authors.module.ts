import { Module } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { PubSubModule } from 'src/pubsub.module';
import { AuthorsResolver } from './authors.resolver';

@Module({
  imports: [PubSubModule],
  providers: [AuthorsResolver, PostsService, PubSubModule],
})
export class AuthorsModule {}
