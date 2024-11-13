import React, { useState } from 'react';
import '../assets/AddItem.css';
import { AddItemRoute } from '../Api/getList';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setItem } from '../Context/ItemSlice';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

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

  const handleAddItem = async () => {
    if (!validate()) return; // Stop if validation fails
    
    try {
      setLoading(true)
      const data = await AddItemRoute({ name, description, price });
      setLoading(false)
      if (data.status) {
        dispatch(setItem({ name, description, price })); 
        navigate('/');
        setName('');
        setDescription('');
        setPrice('');
        setErrors({}); // Clear errors after successful submission
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {loading? ( <p>...loding</p> ) : 

        (
          <>
          <div className="add-item-container">
          <h2>Add Item</h2>
          
          <button className="cancel-button" onClick={() => navigate('/')}>×</button>

          <div className="form-group">
        <label>Name</label>
        <input
        type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          onBlur={validate} // Validate on blur
          />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          onBlur={validate} // Validate on blur
          />
        {errors.description && <div className="error-message">{errors.description}</div>} {/* Display error */}
        </div>

      <div className="form-group">
        <label>Price</label>
        <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter product price"
        onBlur={validate} // Validate on blur
        />
          {errors.price && <div className="error-message">{errors.price}</div>} {/* Display error */}
          </div>
          
          <button className="add-button" onClick={handleAddItem}>Add</button>
          </div>
          </>
        )
      }
      </>
  );
};

export default AddItem;
