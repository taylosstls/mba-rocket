import { http, HttpResponse } from 'msw'

import { GetMonthCanceledOrdersAmountResponse } from '../Dashboard/get-month-canceled-orders'

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
})