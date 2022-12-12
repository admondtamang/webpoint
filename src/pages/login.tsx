import Forms from "@/components/Forms";
import { trpc } from "@/utils/trpc";
import React, { useState } from "react";
import { LoginInput } from "@/server/schema/user.schema";
import { signIn, signOut, useSession } from "next-auth/react";
import { router } from "@/server/trpc/trpc";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { setloalStorage } from "@/utils/localstorage";

const ProductCreateEdit = () => {
  const router = useRouter();
  const toast = useToast();
  const { data: session, status } = useSession();

  console.log(session);

  const { error, mutate } = trpc.user.login.useMutation({
    onSuccess: (data) => {
      setloalStorage("token", data.token);
      setloalStorage("username", data.user.username);

      if (data?.success) {
        toast({
          title: "Login.",
          description: "Login sucess.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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
    // mutate(values);

    const status = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    console.log(status);

    if (status?.error)
      return toast({
        title: "Login.",
        description: status?.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

    if (status?.error == null) {
      if (typeof window !== "undefined") {
        localStorage.setItem("username", values.username);
        router.push("/dashboard");
      }
    }
    actions.setSubmitting(false);
  };

  return (
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Login</h1>
      {/* <p className="text-red-600">{error && error?.message}</p> */}
      {session ? (
        <div>
          <p>hi {session.user?.name}</p>

          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => signIn("discord", { redirect: true })}>
            Login with Discord
          </button>
        </div>
      )}
      <Forms formFields={formFields} handleSubmit={handleSubmit} />
    </div>
  );
};

export default ProductCreateEdit;
