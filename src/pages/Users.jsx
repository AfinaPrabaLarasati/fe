import axios from "axios";
import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function DashboardUser() {
const [data, setData] = useState()
const { enqueueSnackbar } = useSnackbar();

const dataPayload = async () => {
const requestPayload = await axios.get("http://localhost:1010/auth/users")

const responsePayload = requestPayload.data
console.log(responsePayload);
if (responsePayload.status) {
    setData(responsePayload.data)
}
}
useEffect(() => {

    dataPayload()
    const intervalId = setInterval(() => {
        dataPayload()
    
      }, 3000); 
  
      return () => clearInterval(intervalId);
}, [])

const handleDelete = async (id) => {
    const request = await axios.delete(`http://localhost:1010/auth/users/delete/${id}`)

    const response = request.data

    if (response.status) {
        enqueueSnackbar(`${response.message} `, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            autoHideDuration: 2000,
          });
    } else {
        enqueueSnackbar(`${response.message} `, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            autoHideDuration: 2000,
          });
    }
}

  return (
    <>
      <div >
        <div
          className="dashboard-box"
          style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}
        >
        <Link to={"/register"} style={{position: "absolute", top: "5px", left: "7px", background: "transparent", border: "none", color: "white", textDecoration: "none"}}>
        ↩
        </Link>
            {Array.isArray(data) && data.map(item => (

          <div key={item.id}
            
            style={{
              padding: "30px",
              background: "darkgreen",
              borderRadius: "12px",
              textDecoration: "none",
              color: "white",
              fontWeight: 600,
              position: "relative"
            }}
          >
            {item.name}
            <button onClick={() => handleDelete(item.id)} style={{ position: "absolute", top: "5px", right: "0", color: "white", background: "transparent", width: "25px", height: "25px", border: "none" }}>
  <p>X</p>
</button>

          </div>
            ))}
        </div>
      </div>
    </>
  );
}
