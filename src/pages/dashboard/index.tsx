import React from "react";
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
} from "@chakra-ui/react";

export default function Dashboard() {
  const passwords = [
    { url: "github.com", username: "hari", password: "slkfjasljlk" },
    { url: "github.com", username: "hari", password: "slkfjasljlk" },
    { url: "github.com", username: "hari", password: "slkfjasljlk" },
    { url: "github.com", username: "hari", password: "slkfjasljlk" },
    { url: "github.com", username: "hari", password: "slkfjasljlk" },
  ];
  return (
    <div className="container m-auto mt-4">
      <h1 className="mb-4 text-4xl">Dashboard</h1>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>URL</Th>
              <Th>User Name</Th>
              <Th>Password</Th>
            </Tr>
          </Thead>
          <Tbody>
            {passwords.map((row, index) => (
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
  );
}
