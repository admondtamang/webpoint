import Forms from "@/components/Forms";
import { CreateUserInput } from "@/server/schema/user.schema";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

const ProductCreateEdit = () => {
  const router = useRouter();
  const toast = useToast();

  const formFields = [
    // {
    //   name: "url",
    //   label: "URL",
    //   type: "InputField",
    //   placeholder: "Enter Url",
    //   isRequired: true,
    // },
    {
      name: "username",
      label: "Username",
      type: "InputField",
      placeholder: "Enter your user name",
      isRequired: true,
    },
    {
      name: "password",
      label: "Password",
      type: "InputField",
      placeholder: "Enter Password",
      isRequired: true,
    },
  ];

  const { mutate, error } = trpc.user.signup.useMutation({
    onSuccess: ({ message }) => {
      toast({
        title: "signup.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/login");
    },
    onError: ({ message }) => {
      toast({
        title: "signup.",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (values: CreateUserInput, actions: any) => {
    const data = await mutate(values);

    actions.setSubmitting(false);
  };

  return (
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Register</h1>
      <p className="text-red-600">{error && error?.message}</p>
      <Forms formFields={formFields} handleSubmit={handleSubmit} />
    </div>
  );
};

export default ProductCreateEdit;
