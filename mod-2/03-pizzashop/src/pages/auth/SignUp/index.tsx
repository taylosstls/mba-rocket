import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

// Expressões regulares para validação de telefone
const landlineRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
const mobileRegex = /^\(\d{2}\) \d{1} \d{4}-\d{4}$/;

const signUpFormSchema = z.object({
  restaurantName: z.string().min(1, "Campo obrigatório"),
  managerName: z.string().min(1, "Campo obrigatório"),
  phone: z
    .string()
    .min(1, "Campo obrigatório")
    .refine((value) => landlineRegex.test(value) || mobileRegex.test(value), {
      message: "Telefone inválido",
    }),
  email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
});

type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    const cleanedPhone = data.phone.replace(/\D/g, "");

    const formattedData = {
      ...data,
      phone: cleanedPhone,
    };

    try {
      if (!formattedData.email) throw new Error();

      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });

      toast.success("Cadastro realizado!", {
        description: "Oba! Agora vamos começar.",
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });

      console.log(formattedData);
      reset();
    } catch (error) {
      toast.error("Ops! Algo deu errado.", {
        description: "Erro ao cadastrar seu restaurante, tente novamente.",
        action: {
          label: "Reenviar",
          onClick: () => handleSignUp(formattedData),
        },
      });
    }
  }

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setValue("phone", formattedPhone, {
      shouldValidate: true,
      shouldTouch: true,
    });
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex w-full flex-col items-center justify-center p-8">
        <Button asChild className="absolute left-6 top-8" variant={"ghost"}>
          <Link to={"/sign-in"} className="flex flex-row gap-2 align-middle">
            <ArrowLeft size={16} /> Voltar
          </Link>
        </Button>

        <div className="flex w-full max-w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crie sua conta gratuitamente
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            {errors.restaurantName && (
              <sub className="text-right text-xs text-red-600">
                {errors.restaurantName.message}
              </sub>
            )}

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            {errors.managerName && (
              <sub className="text-right text-xs text-red-600">
                {errors.managerName.message}
              </sub>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            {errors.email && (
              <sub className="text-right text-xs text-red-600">
                {errors.email.message}
              </sub>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone/celular</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                onChange={handlePhoneChange}
                maxLength={15}
              />
            </div>
            {errors.phone && (
              <sub className="text-right text-xs text-red-600">
                {errors.phone.message}
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
                "Realizar cadastro"
              )}
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao prosseguir, você concorda com nossos{" "}
              <a href="#" className="text-primary underline underline-offset-2">
                Termos de uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary underline underline-offset-2">
                Políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
