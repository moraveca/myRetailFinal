import axios from "axios";

export default {
  // Gets the product with the given id
  getProduct: id => {
    return axios.get("https://stark-bastion-48445.herokuapp.com/api/products/" + id)
  },

  updatePrice: (id, newPrice) => {
    return axios.put("https://stark-bastion-48445.herokuapp.com/api/products/" + id + "/" + newPrice)
  }
};
