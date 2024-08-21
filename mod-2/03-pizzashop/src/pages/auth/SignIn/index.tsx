import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const signInFormSchema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  async function handleSignIn(data: SignInForm) {
    try {
      if (!data.email) throw new Error();

      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Autenticação solicitada!", {
        description: "Um link foi enviado para o e-mail cadastrado.",
      });
    } catch (error) {
      toast.error("Ops! Algo deu errado.", {
        description: "Erro de envio do link, tente novamente.",
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(data),
        },
      });
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-full max-w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button
              className="flex w-full items-center justify-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Acessar painel"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
