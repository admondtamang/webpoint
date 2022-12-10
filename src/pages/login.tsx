import Forms from "@/components/Forms";
import React, { useState } from "react";

type Props = {};

const ProductCreateEdit = (props: Props) => {
  const [jsonView, setjsonView] = useState({});
  // URL, username, and a randomly generated password.
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

  const handleSubmit = async (values: any, actions: any) => {
    console.log(values);

    actions.setSubmitting(false);
  };
  return (
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Login</h1>
      <Forms
        formFields={formFields}
        handleSubmit={handleSubmit}
        // initialValues={{ product_ids: "3645,3643", description: "" }}
      />
    </div>
  );
};

export default ProductCreateEdit;
