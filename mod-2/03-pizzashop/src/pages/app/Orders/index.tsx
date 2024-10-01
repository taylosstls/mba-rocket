import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { getOrders } from "@/api/get-orders";
import { OrderTableFilters } from "@/components/molecules/orders/order-table-filters";
import { OrderTableRow } from "@/components/molecules/orders/order-table-row";
import { Pagination } from "@/components/molecules/page-navigation/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(Number(searchParams.get("page") ?? "1"));

  const { data: ordersResult } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        customerName,
        orderId,
        status: status === "all" ? null : status,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());

      return state;
    });
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[250px] truncate">
                    Identificador
                  </TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersResult &&
                  ordersResult.orders.map((order) => {
                    return <OrderTableRow key={order.orderId} order={order} />;
                  })}
              </TableBody>
            </Table>
          </div>

          {ordersResult && (
            <Pagination
              pageIndex={ordersResult.meta.pageIndex}
              totalCount={ordersResult.meta.totalCount}
              perPage={ordersResult.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  );
}
