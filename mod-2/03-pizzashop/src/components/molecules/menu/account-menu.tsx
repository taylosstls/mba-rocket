import { useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";

import { GetManagedRestaurant } from "@/api/get-managed-restaurant";
import { getProfile } from "@/api/get-profile";
import { StoreProfileDialog } from "@/components/molecules/profile/store-profile-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false); // Controla a abertura/fechamento do modal

  const { data: profileInfo, isLoading: isLoadingProfileInfo } = useQuery({
    queryKey: ["profile-account"],
    queryFn: getProfile,
  });

  const { data: restaurantInfo, isLoading: isLoadingRestaurantInfo } = useQuery(
    {
      queryKey: ["managed-restaurant"],
      queryFn: GetManagedRestaurant,
      staleTime: Infinity,
    },
  );

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className="flex select-none items-center gap-2"
          >
            {isLoadingRestaurantInfo ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              restaurantInfo?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfileInfo ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>profileInfo?.name</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {profileInfo?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Button
                variant={"ghost"}
                size={"nospace"}
                onClick={() => setIsOpen(true)}
              >
                <Building className="mr-2 h-4 w-4" />
                <span>Perfil da loja</span>
              </Button>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </Dialog>
  );
}
