import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentAddedDto {
  @Field()
  id: number;
  @Field()
  comment: string;
}
