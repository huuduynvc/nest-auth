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
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './graph-throttler.guard';

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
      context: ({ req, res }) => ({ req, res }),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@nest-demo.cagfoce.mongodb.net/?retryWrites=true&w=majority',
    ),
    OrderModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
      storage: new ThrottlerStorageRedisService(),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PubSubModule,
    CronService,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
