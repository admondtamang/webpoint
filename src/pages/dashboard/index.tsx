import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { trpc } from "@/utils/trpc";
import Protected from "../protected";
import { useRouter } from "next/router";
import PasswordList from "./passwordList";
import { signOut, useSession } from "next-auth/react";
import { getloalStorage } from "@/utils/localstorage";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const username = getloalStorage("username");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("username");
    }
    signOut({ callbackUrl: "/" });
  };

  const { data, error } = trpc.password.getAll.useQuery({
    url,
    uniqueUserName: username || "",
  });

  const handleChange = (e: any) => {
    setUrl(e.target.value);
  };
  return (
    // <Protected>
    <div className="container m-auto mt-4">
      <div className="flex justify-between">
        <h1 className="mb-4 text-4xl">Dashboard</h1>
        <p className="text-red-600">{error && error?.message}</p>

        <button
          className="inline-flex items-center rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <PasswordList />
      <h1 className="my-4 text-4xl">search</h1>

      <Input placeholder="Enter url" className="my-4" onChange={handleChange} />

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>URL</Th>
              <Th>User Name</Th>
              <Th>Password</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(data) &&
              data.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.url}</Td>
                  <Td>{row.username}</Td>
                  <Td>{row.password}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
    // </Protected>
  );
}
