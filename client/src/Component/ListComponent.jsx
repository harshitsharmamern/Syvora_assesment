import React from "react";
import "../assets/Product.css"; // Correct import without trailing slash
import { deleteItemRoute } from "../Api/getList";
import { useNavigate } from "react-router-dom";

const ListComponent = ({ Allproduct, setAlterProduct, setLoading }) => {

  const Navigate = useNavigate()
  const handleDeleteItem = async (id) => {
    setLoading(true);
    await deleteItemRoute(id);
    setLoading(false);
    setAlterProduct((prev) => !prev); // Trigger re-render
  };
  const handleEditClick = (productId) => {
    Navigate(`/editItem/${productId}`);
  };
  return (
    <div className="grid-container">
      {Allproduct.map((product) => (
        <div key={product._id} className="product-item">
          <h2 className="product-name">{product.Name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: {product.price}</p>

          <div className="product-actions">
            {/* <div onClick={()=>Navigate('editItem')} className="edit-button">Edit</div> */}
            <div className="edit-button" onClick={() => handleEditClick(product._id)}>Edit</div>

            <div
              onClick={() => handleDeleteItem(product._id)}
              className="remove-button"
            >
              Remove
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
