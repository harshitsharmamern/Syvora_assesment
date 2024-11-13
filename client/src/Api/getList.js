
import config from "../../config"
import axios from 'axios'

const fetch_Item = `${config.API_BASE_URL}/getItem`
const Add_Item_route = `${config.API_BASE_URL}/addItem`
const Delete_Item_route = `${config.API_BASE_URL}/deleteItem`;
const Update_Item_route = `${config.API_BASE_URL}/updateItem`;

export const getItem = async()=>{
try{

    const validate = await axios.get(fetch_Item)
    
    return validate.data
}catch(err){
    return null
}
}

export const AddItemRoute = async({name,description,price})=>{
    const configCred = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const dataPayload = {
        Name : name,description,price
      };
    try{
    
        const { data } = await axios.post(`${Add_Item_route}`, dataPayload, configCred);
        
        return data
    }catch(err){
        console.error("Error sending message:", error);

        return null
    }
    }

    export const deleteItemRoute = async (id) => {
      try {
        const { data } = await axios.delete(`${Delete_Item_route}/${id}`);
        return data;
      } catch (error) {
        console.error("Error deleting item:", error);
        return null;
      }
    };
    
    export const updateItemRoute = async (id, { name, description, price }) => {
      const configCred = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const dataPayload = {
        Name: name,
        description,
        price,
      };
      try {
        const { data } = await axios.put(`${Update_Item_route}/${id}`, dataPayload, configCred);
        return data;
      } catch (error) {
        console.error("Error updating item:", error);
        return null;
      }
    };