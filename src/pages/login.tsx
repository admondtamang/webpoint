import Forms from "@/components/Forms";
import { trpc } from "@/utils/trpc";
import React, { useState } from "react";
import { LoginInput } from "@/server/schema/user.schema";
import { signIn, useSession } from "next-auth/react";
import { router } from "@/server/trpc/trpc";
import { useRouter } from "next/router";

const ProductCreateEdit = () => {
  const { data } = useSession();
  const router = useRouter();

  // const { error, mutate } = trpc.user.login.useMutation({
  //   onSuccess: (data) => {
  //     if (data?.success) {
  //       alert("login success");
  //     }
  //   },
  // });

  console.log(data, "session");

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
    // mutate(values);

    await signIn("credentials", { ...values, redirect: false });
    actions.setSubmitting(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("username", values.username);
    }
    router.push("/dashboard");
  };
  return (
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Login</h1>
      {/* <p className="text-red-600">{error && error?.message}</p> */}

      <Forms
        formFields={formFields}
        handleSubmit={handleSubmit}
        initialValues={{ username: "ram", password: "ram" }}
      />
    </div>
  );
};

export default ProductCreateEdit;
