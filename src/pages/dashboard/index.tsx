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

export default function Dashboard() {
  const [url, setUrl] = useState("");
  let username = "";
  if (typeof window !== "undefined") {
    username = localStorage.getItem("username") || "";
  }

  const { data, error } = trpc.user.getAll.useQuery({
    url,
    username,
  });

  const handleChange = (e: any) => {
    setUrl(e.target.value);
  };
  return (
    // <Protected>
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Dashboard</h1>
      <p className="text-red-600">{error && error?.message}</p>

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
