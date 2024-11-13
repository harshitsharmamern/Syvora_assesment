import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, updateItemRoute } from "../Api/getList"; 
import '../assets/editItem.css'
import { useSelector } from "react-redux";

const EditItem = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({}); 

  const validate = () => {
    const newErrors = {};
    
    if (name.length < 3) {
      newErrors.name = "Name should be at least 3 characters long";
    }
    
    if (description.length < 3) {
      newErrors.description = "Description should be at least 3 characters long";
    }
    
    if (!price || isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Price should be a positive number";
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {

    const fetchProduct = async () => {

      if (!validate()) return; // Stop if validation fails
      try {
        const data = await getItem(); // Fetch all product data
        if (data && data.AllProduct) {
          // Find the product with the matching id
          const product = data.AllProduct.find((item) => item._id === id);
          
          // Set state if the product is found
          if (product) {
            setName(product.Name);
            setDescription(product.description);
            setPrice(product.price);
          }
        }
      } catch (err) {
        console.log("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    const updatedProduct = { name, description, price };
    const response = await updateItemRoute(id, updatedProduct);

    if (response) {
      navigate("/"); // Redirect to the list after updating
    }
  };

  return (
    <div className="edit-form-container">
                <button onClick={() => navigate("/")} className="cancel-button">x</button>

      <h2>Edit Product</h2>
      
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validate}
        />
                {errors.name && <div className="error-message">{errors.name}</div>}

      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={validate}
        />
                {errors.description && <div className="error-message">{errors.description}</div>} {/* Display error */}

      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={validate}
        />
                {errors.price && <div className="error-message">{errors.price}</div>} {/* Display error */}

      </div>

      <div className="edit-actions">
        <button onClick={handleUpdate} className="save-button">Save</button>
      </div>
    </div>
  );
};

export default EditItem;
