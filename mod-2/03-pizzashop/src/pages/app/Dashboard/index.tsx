import { Helmet } from "react-helmet-async";

import { CardDayOrdersAmountCount } from "@/components/molecules/cards-dashboard/card-day-orders-amount-count";
import { CardMonthCanceledOrdersAmount } from "@/components/molecules/cards-dashboard/card-month-canceled-orders-amount";
import { CardMonthOrdersAmount } from "@/components/molecules/cards-dashboard/card-month-orders-amount";
import { CardMonthRevenue } from "@/components/molecules/cards-dashboard/card-month-revenue";

export function Dashboard() {
  return (
    <>
      <Helmet title="Painel Administrativo" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <CardMonthRevenue />
          <CardMonthOrdersAmount />
          <CardDayOrdersAmountCount />
          <CardMonthCanceledOrdersAmount />
        </div>
      </div>
    </>
  );
}
