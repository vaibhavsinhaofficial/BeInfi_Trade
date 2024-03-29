import React, { useState } from "react";
import Header from "../../../commonAdminComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonBanner from "./CommonBanner";

function NewBanner() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createBanner`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/Banner");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Add New Banner" path="/Banner" />
      <CommonBanner
        title={title}
        setTitle={setTitle}
        image={image}
        setImage={setImage}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewBanner;
