import Forms from "@/components/Forms";
import { CreateUserInput } from "@/server/schema/user.schema";
import { trpc } from "@/utils/trpc";
import React, { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
type Props = {};

const ProductCreateEdit = (props: Props) => {
  const formFields = [
    {
      name: "url",
      label: "URL",
      type: "InputField",
      placeholder: "Enter Url",
      isRequired: true,
    },
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
      alert(message);
    },
  });

  const handleSubmit = async (values: CreateUserInput, actions: any) => {
    mutate(values);
    actions.setSubmitting(false);
    // router.push("/login");
  };

  return (
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Signup</h1>
      <p className="text-red-600">{error && error?.message}</p>
      <Forms formFields={formFields} handleSubmit={handleSubmit} />
    </div>
  );
};

export default ProductCreateEdit;
