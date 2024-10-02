import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Loader2, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { approveOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order.ts";
import { GetOrdersResponse } from "@/api/get-orders";
import { OrderStatus, Status } from "@/components/atoms/order-status";
import { OrderDetails } from "@/components/molecules/orders/order-details";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  function UpdateOrderStatusOnCache(orderId: string, status: Status) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) return { ...order, status };

          return order;
        }),
      });
    });
  }

  // Cancelar Pedido
  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        UpdateOrderStatusOnCache(orderId, "canceled");

        toast.success(`Pedido: ${orderId} cancelado`);
      },
    });

  // Pedido Aprovado
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        UpdateOrderStatusOnCache(orderId, "processing");

        toast.success(`Pedido: ${orderId} sendo processado`);
      },
    });

  // Pedido em rota de entrega
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        UpdateOrderStatusOnCache(orderId, "delivering");

        toast.success(`Pedido: ${orderId} em rota`);
      },
    });

  // Pedido entregue
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        UpdateOrderStatusOnCache(orderId, "delivered");

        toast.success(`Pedido: ${orderId} entregue!`);
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"xs"}>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="truncate font-mono text-sm font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        {order.status === "pending" && (
          <Button
            variant={"outline"}
            size={"xs"}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isApprovingOrder ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Aprovar"
            )}
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            variant={"outline"}
            size={"xs"}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isApprovingOrder ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Em entrega"
            )}
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            variant={"outline"}
            size={"xs"}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isApprovingOrder ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Entregue"
            )}
          </Button>
        )}

        {order.status === "pending" && (
          <Button
            variant={"outline"}
            size={"xs"}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isApprovingOrder ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Aprovar"
            )}
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          variant={"ghost"}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          size={"xs"}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
