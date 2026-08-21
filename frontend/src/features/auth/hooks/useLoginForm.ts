import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  loginSchema,
  type LoginFormData,
} from "../schemas/auth.schema";

import { useLogin } from "./useLogin";

export default function useLoginForm() {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    mode: "onChange",

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync(values);

      toast.success("Welcome back!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Invalid credentials"
        );
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}