import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  GetManagedRestaurant,
  GetManagedRestaurantResponse,
} from "@/api/Account/Profile/get-managed-restaurant";
import { updateProfile } from "@/api/Account/Update/update-profile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const storeProfileSchema = z.object({
  name: z.string().min(1, "Preenchimento obrigatório"),
  description: z.string().nullable(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

interface StoreProfileDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function StoreProfileDialog({
  isOpen,
  setIsOpen,
}: StoreProfileDialogProps) {
  const queryClient = useQueryClient();

  const { data: restaurantInfo } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: GetManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurantInfo?.name ?? "",
      description: restaurantInfo?.description ?? "",
    },
  });

  function updateManageRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        },
      );
    }

    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManageRestaurantCache({ name, description });

      return { previousProfile: cached };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManageRestaurantCache(context.previousProfile);
      }
    },
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });

      setIsOpen(false);
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      toast.error("Falha ao atualizar o perfil, tente novamente");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perfil da loja</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu estabelecimento visíveis ao seu
            cliente
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Nome
              </Label>
              <Input className="col-span-3" id="name" {...register("name")} />
              {errors.name && (
                <sub className="col-span-4 text-right text-xs text-red-600">
                  {errors.name.message}
                </sub>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="description">
                Descrição
              </Label>
              <Textarea
                className="col-span-3"
                id="description"
                {...register("description")}
              />
              {errors.description && (
                <sub className="col-span-4 text-right text-xs text-red-600">
                  {errors.description.message}
                </sub>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"ghost"}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" variant={"success"} disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Atualizar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
