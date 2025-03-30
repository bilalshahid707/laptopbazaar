import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

export const Users = () => {
  const user = useSelector((state) => state.User.User);
  const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState();

  let { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/users", {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      });
      return response.data;
    },
  });
  const mutation = useMutation({
    queryKey: ["users"],
    mutationFn: async (id) => {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );
      return response.data;
    },
  });

  const openDeleteModal = async (id) => {
    setOpenModal(true);
    setUserId(id);
  };
  const deleteUser = async (id) => {
    mutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        alert("deleted");
        setOpenModal(false);
        setUserId(null);
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    });
  };
  users = users?.data;
  return (
    <main>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#F4F4F4",
            borderRadius: "10px",
            boxShadow: 10,
            p: 4,
          }}
        >
          <p>Are you sure you want to remove this user?</p>
          <div className="flex gap-3 mt-3">
            <button onClick={() => deleteUser(userId)} className="btn-filled">
              Yes
            </button>
            <button
              onClick={() => {
                setUserId(null);
                setOpenModal(false);
              }}
              className="btn-outlined"
            >
              No
            </button>
          </div>
        </Box>
      </Modal>
      <div className="custom-flex flex-col">
        <div className="custom-flex justify-between w-full p-4">
          <p>Total Users ({users?.length})</p>
        </div>
        <TableContainer
          component={Paper}
          sx={{ height: "100vh", overflow: "scroll" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{user._id}</TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="custom-flex gap-2">
                      {/* <Link to={`/${laptop.name}/${laptop.id}`}>
                      <RemoveRedEyeIcon />
                    </Link> */}
                      <button onClick={()=>makeAdmin(user?._id)} className="btn-filled w-full">Make Admin</button>
                      <Link onClick={() => openDeleteModal(user?._id)}>
                        <DeleteIcon />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
};

export default Users;
