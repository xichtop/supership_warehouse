import axiosClient from "./axiosClient";

const deliveryAPI = {

    //lấy danh sách mới
    getAll: (token) => {
        const url = '/ware/getall';
        return axiosClient.get(url, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },

    // lấy danh sách nhập, xuất kho
    getAllMain: (item, token) => {
        const url = '/ware/getallmain';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },

    //lấy danh sách trả hàng
    getAllReturn: (token) => {
        const url = '/ware/getallreturn';
        return axiosClient.get(url, {headers: {
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

    // cập nhật nhập xuất kho
    updateReturn: (item, token) => {
        const url = '/ware/updatereturn';
        return axiosClient.post(url, item, {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
          }   
      });
    },
}

export default deliveryAPI;