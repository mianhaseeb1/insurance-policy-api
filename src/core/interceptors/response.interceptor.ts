import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        let ctx = context.switchToHttp();
        let response: any = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        return next.handle().pipe(
            map((data: any) => {
                if (data.Message && data.Message) {
                    data = {
                        ...data,
                    };
                }
                response.__ss_body = { ...data };
                return data;
            }),
        );
    }
}
