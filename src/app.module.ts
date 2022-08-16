import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { PubSubModule } from './pubsub.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './orders/orders.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AuthorsModule,
    PostsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      },
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@nest-demo.cagfoce.mongodb.net/?retryWrites=true&w=majority',
    ),
    OrderModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PubSubModule, CronService],
})
export class AppModule {}
