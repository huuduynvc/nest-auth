import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  addComment(post: { id: number; comment: string }) {
    return post;
  }
}
