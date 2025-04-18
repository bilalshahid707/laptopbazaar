import React, { useState } from "react"; 
import { Snack } from "../../imports"; 
import { Link } from "react-router-dom";  
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";  
import { useSelector } from "react-redux";  
import Cookies from "js-cookie";  
import axios from "axios";  
import {  
  Table,  
  TableBody,  
  TableCell,  
  TableContainer,  
  TableHead,  
  TableRow,  
  Paper,  
  Box,  
  Modal,  
} from "@mui/material";  
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";  
import UpdateIcon from "@mui/icons-material/Update";  
import DeleteIcon from "@mui/icons-material/Delete";  

export const Laptops = () => {
  const user = useSelector((state) => state.User.User);
  const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);
  const [openSnack,setOpenSnackBar] = useState(false)
  const [snackMsg,setSnackMsg] = useState('')
  const [snackType,setSnackType] = useState('')
  const [laptopId, setLaptopId] = useState();

  const { data: laptops } = useQuery({
    queryKey: ["laptops"],
    queryFn: async () => {
      const response = user?.role === "admin"?await axios.get(
        `${process.env.BASEURL}/api/v1/laptops`
      ):await axios.get(
        `${process.env.BASEURL}/api/v1/suppliers/${user?.slug}/all-laptops`
      );
      return response.data;
    },
  });
  const mutation = useMutation({
    queryKey: ["laptops"],
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${process.env.BASEURL}/api/v1/laptops/${id}`,
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
    setLaptopId(id);
  };
  const deleteLaptop = async (id) => {
    mutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("laptops");
        setOpenSnackBar(true)
        setSnackMsg("Laptop Deleted Succesfully")
        setSnackType("success")
        setOpenModal(false);
        setLaptopId(null);
      },
      onError: (error) => {
        setOpenSnackBar(true)
        setSnackMsg(error.response.data.message)
        setSnackType("error")
      },
    });
  };
  const laptopData = laptops?.data;

  return (
    <main>
      <Snack open={openSnack} severity={snackType} message={snackMsg} onClose={()=>{setOpenSnackBar(false)}}/>
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
          <p>Are you sure you want to delete this product?</p>
          <div className="flex gap-3 mt-3">
            <button onClick={() => deleteLaptop(laptopId)} className="btn-filled">
              Yes
            </button>
            <button
              onClick={() => {
                setLaptopId(null);
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
          <p>Total Products ({laptopData?.length})</p>
          <Link className="btn-filled" to={`/${user?.slug}/add-laptop`}>
            Add Products
          </Link>
        </div>
        <TableContainer
          component={Paper}
          sx={{ height: "100vh", overflow: "scroll" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laptopData?.map((laptop) => (
                <TableRow
                  key={laptop.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{laptop.id}</TableCell>
                  <TableCell align="right">{laptop.name}</TableCell>
                  <TableCell align="right">{laptop.price}</TableCell>
                  <TableCell align="right">{laptop.status}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="custom-flex gap-2">
                      <Link to={`/${laptop.name}/${laptop.id}`}>
                        <RemoveRedEyeIcon />
                      </Link>
                      <Link to={`/${laptop.name}/${laptop.id}/update`}>
                        <UpdateIcon />
                      </Link>
                      <Link onClick={() => openDeleteModal(laptop?.id)}>
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

export default Laptops;
