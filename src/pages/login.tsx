import Forms from "@/components/Forms";
import { trpc } from "@/utils/trpc";
import React, { useState } from "react";
import { LoginInput } from "@/server/schema/user.schema";

type Props = {};

const ProductCreateEdit = (props: Props) => {
  const { error, mutate } = trpc.user.login.useMutation({
    onSuccess: (data) => {
      if (data?.success) {
        alert("login success");
      }
    },
  });

  const formFields = [
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

  const handleSubmit = async (values: LoginInput, actions: any) => {
    mutate(values);

    actions.setSubmitting(false);
  };
  return (
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Login</h1>
      <p className="text-red-600">{error && error?.message}</p>

      <Forms
        formFields={formFields}
        handleSubmit={handleSubmit}
        // initialValues={{ product_ids: "3645,3643", description: "" }}
      />
    </div>
  );
};

export default ProductCreateEdit;
