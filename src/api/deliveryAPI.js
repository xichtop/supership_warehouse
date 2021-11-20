import axiosClient from "./axiosClient";

const deliveryAPI = {

    //lấy danh sách nhập kho
    getAll: (token) => {
        const url = '/ware/getall';
        return axiosClient.get(url, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },

    // lấy danh sách xuất kho
    getAllMain: (item, token) => {
        const url = '/ware/getallmain';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },

    // cập nhật nhập xuất kho
    update: (item, token) => {
        const url = '/ware/update';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },
}

export default deliveryAPI;