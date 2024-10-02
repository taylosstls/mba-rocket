export type Status =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: Status;
}

const orderStatusMap: Record<Status, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  processing: "Em preparo",
  delivering: "Em entrega",
  delivered: "Entregue",
};

const statusColorMap: Record<Status, string> = {
  pending: "bg-slate-400",
  canceled: "bg-rose-500 dark:bg-rose-400",
  processing: "bg-amber-500 dark:bg-amber-400",
  delivering: "bg-amber-500 dark:bg-amber-400",
  delivered: "bg-emerald-500 dark:bg-emerald-400",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${statusColorMap[status]}`} />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
