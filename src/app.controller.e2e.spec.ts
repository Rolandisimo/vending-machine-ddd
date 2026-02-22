import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

import request from 'supertest';
import { ProductName } from './product/product.model';
import { App } from 'supertest/types';

describe('AppController E2E', () => {
  let app: INestApplication;
  let server: App;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    server = app.getHttpServer() as App;

    await app.init();
  });

  it(`/POST buy Product A`, () => {
    return request(server)
      .post('/buy')
      .send({
        productName: ProductName.A,
        coins: '50 50',
      })
      .expect(201)
      .expect('5');
  });

  it(`/POST buy Product B`, () => {
    return request(server)
      .post('/buy')
      .send({
        productName: ProductName.B,
        coins: '50 50 50',
      })
      .expect(201)
      .expect('20 2 2');
  });

  it(`/POST buy Product C`, () => {
    return request(server)
      .post('/buy')
      .send({
        productName: ProductName.C,
        coins: '50 50 50 50 50',
      })
      .expect(201)
      .expect('10 5 2');
  });

  it(`/POST buy Product A with an invalid coin`, () => {
    return request(server)
      .post('/buy')
      .send({
        productName: ProductName.A,
        coins: '50 20 17 20 5',
      })
      .expect(HttpStatus.CREATED)
      .expect('');
  });

  it(`/POST fail to buy invalid product`, () => {
    return request(server)
      .post('/buy')
      .send({
        productName: 'RANDOM PRODUCT',
        coins: '50 50',
      })
      .expect(HttpStatus.NOT_FOUND);
  });

  it(`/POST fail to buy Product with insufficient balance`, () => {
    return request(server)
      .post('/buy')
      .send({
        productName: ProductName.A,
        coins: '2',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterEach(async () => {
    await app.close();
  });
});
