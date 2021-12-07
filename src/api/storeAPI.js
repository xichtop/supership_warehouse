import axiosClient from "./axiosClient";

const storeAPI = {

    // lấy danh sách cửa hàng
    getAll: (token) => {
        const url = '/stores/';
        return axiosClient.get(url, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },
    
    updateStatus: (item, token) => {
        const url = '/stores/updatestatus';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    }
}

export default storeAPI;