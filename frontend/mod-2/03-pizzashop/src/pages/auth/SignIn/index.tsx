import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, LogIn } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/api/Account/Sign/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInFormSchema = z.object({
  email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      if (!data.email) throw new Error();

      await authenticate({ email: data.email });

      toast.success("Autenticação solicitada!", {
        description: "Um link foi enviado para o e-mail cadastrado.",
      });

      reset();
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
      <div className="flex w-full flex-col items-center justify-center p-8">
        <Button asChild className="absolute right-6 top-8" variant={"ghost"}>
          <Link to={"/sign-up"} className="flex flex-row gap-2 align-middle">
            Cadastrar-se <LogIn size={16} />
          </Link>
        </Button>

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
            {errors.email && (
              <sub className="text-right text-xs text-red-600">
                {errors.email.message}
              </sub>
            )}

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
