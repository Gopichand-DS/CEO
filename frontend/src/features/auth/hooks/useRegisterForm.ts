import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/auth.schema";

import { useRegister } from "./useRegister";

export default function useRegisterForm() {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      company_name: "",
      email: "",
      phone: "",
      designation: "",
      password: "",
      confirm_password: "",
      accept_terms: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
  try {
    const {
      accept_terms: _accept_terms,
      ...payload
    } = values;

    await registerMutation.mutateAsync(payload);

    toast.success("Account created successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.detail ??
          "Registration failed."
      );
    } else {
      toast.error("Unexpected error occurred.");
    }
  }
});

  return {
    form,
    onSubmit,
    isLoading: registerMutation.isPending,
  };
}