"use client";

import { z } from "zod";
import Image from "next/image";

import Logo from "@/public/free-state-logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "@/components/loading-spinner";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

const loginForm = z.object({
  email: z.email({ error: "Invalid email." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." }),
});

type LoginForm = z.infer<typeof loginForm>;

const AdminLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
  });
  const router = useRouter();

  const handleLogin = async ({ email, password }: LoginForm) => {
    try {
      const response = await api.post(
        "/admin/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        router.push("/admin/dashboard/add-players");
        return toast.success(response.data.message);
      }
      console.log(Object.keys(response.data));
      toast.error(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 max-w-96 w-full border p-5">
        <Image
          src={Logo}
          alt="Free state firebird logo"
          height={125}
          width={125}
        />
        <h1 className="text-4xl font-bold">Admin Login</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              className="border py-2 px-3 outline-0"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="border py-2 px-3 outline-0"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className={`free-green-bg text-xl font-medium text-white py-2 cursor-pointer flex justify-center ${
              isSubmitting && "opacity-60"
            }`}
          >
            {isSubmitting ? (
              <LoadingSpinner
                color="border-white"
                thickness="border-2"
                size="size-6"
              />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
