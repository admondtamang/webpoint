import Forms from "@/components/Forms";
import { CreateUserInput } from "@/server/schema/user.schema";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useState } from "react";

const genRand = (len: number) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

const PasswordList = () => {
  const [initialValues, setInitialValues] = useState({
    password: genRand(8) || "",
  });

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

  const { mutate, error } = trpc.user.addPasswordList.useMutation({
    onSuccess: ({ message }) => {
      alert(message);
    },
  });

  const handleSubmit = async (values: CreateUserInput, actions: any) => {
    let uniqueUserName = "";
    if (typeof window !== "undefined") {
      uniqueUserName = localStorage.getItem("username") || "";
    }
    setInitialValues({ password: genRand(8) });
    mutate({ ...values, uniqueUserName });
    actions.setSubmitting(false);
  };

  const handleReset = () => {
    if (!window.confirm("Reset?")) {
      throw new Error("Cancel reset");
    }
  };

  return (
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Add</h1>
      <p className="text-red-600">{error && error?.message}</p>
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        onReset={handleReset}
      />
    </div>
  );
};

export default PasswordList;
