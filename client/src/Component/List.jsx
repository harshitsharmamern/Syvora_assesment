import React, { useEffect, useState } from "react";
import { getItem } from "../Api/getList";
import ListComponent from "./ListComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Context/ItemSlice";


const List = () => {
  const [Allproduct, setAllProduct] = useState([]);
  const [alterProduct, setAlterProduct] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()
 
  useEffect(() => {
    fetchList();
  }, [alterProduct]);

  const fetchList = async () => {
    setLoading(true);
    const data = await getItem();
    dispatch(addItem(data.AllProduct))
    setAllProduct(data.AllProduct || []); // Ensure empty array if data is null
    setLoading(false);
    setAlterProduct(false); // Reset alterProduct state after list refresh
  };

  return (
    <div>
      {loading ? (
        <p>...loading</p>
      ) : (
        <>
          <div>
            <button onClick={() => navigate("/addItem")}>Add Item</button>
          </div>

          {Allproduct && Allproduct.length > 0 ? (
            <ListComponent
              Allproduct={Allproduct}
              setAlterProduct={setAlterProduct}
              setLoading={setLoading}
            />
          ) : (
            <p>No data added</p>
          )}
        </>
      )}
    </div>
  );
};

export default List;
