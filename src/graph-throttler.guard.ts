import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }
  // async handleRequest(
  //   context: ExecutionContext,
  //   limit: number,
  //   ttl: number,
  // ): Promise<boolean> {
  //   const { req, res } = this.getRequestResponse(context);
  //   const key = this.generateKey(context, req.ip);
  //   console.log(key);
  //   const ttls = await this.storageService.getRecord(key);

  //   if (ttls.length >= limit) {
  //     throw new ThrottlerException();
  //   }

  //   await this.storageService.addRecord(key, ttl);
  //   return true;
  // }
}
