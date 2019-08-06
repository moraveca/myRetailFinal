import axios from "axios";

export default {
  // Gets the product with the given id
  getProduct: id => {
    return axios.get("/api/products/" + id)
  },

  updatePrice: (id, newPrice) => {
    return axios.put("/api/products/" + id + "/" + newPrice)
  }
};
