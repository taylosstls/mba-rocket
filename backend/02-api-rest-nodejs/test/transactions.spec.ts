import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

// Definição da estrutura de transação para tipagem
interface Transaction {
  title: string
  amount: number
  type: 'credit' | 'debit'
}

// Função auxiliar para criar uma transação tipada
async function createTransaction(
  transaction: Transaction,
  cookies: string[] = []
) {
  return request(app.server)
    .post('/transactions')
    .set('Cookie', cookies)
    .send(transaction)
}

describe('Rotas de transação', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // Reseta o banco antes de cada teste
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('O usuário deve ser capaz de conseguir criar uma requisição', async () => {
    const response = await createTransaction({ title: 'Nova transação', amount: 5000, type: 'credit' })
    expect(response.status).toBe(201)
  })

  it('Deve ser capaz de listar todas as transações', async () => {
    const createTransactionResponse = await createTransaction({ title: 'Nova transação', amount: 5000, type: 'credit' })

    const cookies = createTransactionResponse.get('Set-Cookie') || []

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Nova transação',
        amount: 5000,
      }),
    ])
  })

  it('Deve resgatar uma transação específica', async () => {
    // Cria a transação e obtém os cookies
    const createTransactionResponse = await createTransaction({ title: 'New transaction', amount: 5000, type: 'credit' })
    const cookies = createTransactionResponse.get('Set-Cookie') || []

    // Lista todas as transações e obtém o ID da primeira
    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId: string = listTransactionsResponse.body.transactions[0].id
    
    // Busca a transação específica
    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    // Espera encontrar a transação informada
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  it('Deve retornar o resumo de transações', async () => {
    // Cria transação de crédito
    const createTransactionResponse = await createTransaction({ title: 'Credit transaction', amount: 5000, type: 'credit' })
    const cookies = createTransactionResponse.get('Set-Cookie') || []

    // Cria transação de débito na conta
    await createTransaction({ title: 'Debit transaction', amount: 2000, type: 'debit' }, cookies)

    // Retorna o valor total
    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })

})