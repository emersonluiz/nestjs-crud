import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PersonModule } from './person/person.module';
import { LoggerMiddleware } from './logger.middleware';
import { PersonController } from 'person/person.controller';

@Module({
  imports: [ 
    PersonModule,
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [AppController ],
  providers: [ AppService ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'persons', method: RequestMethod.POST },
      )
      .forRoutes(PersonController);
      //{ path: '*', method: RequestMethod.ALL}
  }
}
