import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Rotas de transação', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('O usuário deve ser capaz de conseguir criar uma requisição', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Nova transação',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })
})