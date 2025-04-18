import axios from "axios";
const API_URL = "http://localhost:3000";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

// Create an Axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

// ✅ GET: Fetch all product
export const fetchproducts = async (query) => {
  try {
    console.log(token);
    console.log("q is api...", query);
    const response = await apiClient.get(
      `/showproducts?name=${query.name}&catagory=${query.catagory}&minprice=${query.minprice}&maxprice=${query.maxprice}&minage=${query.minage}&maxage=${query.maxage}`
    );
    console.log("dataaaaa", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// product add in wishlist opration
export const wishlist = async (productid) => {
  try {
    console.log("start..wishlist");
    const response = await apiClient.get(`/wishlist/${productid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${productid}:`, error);
    throw error;
  }
};

// fetch user wishlist...
export const fetchwishlist = async () => {
  try {
    console.log("start..wishlist");
    const response = await apiClient.get(`/wishlist`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};
// fetch product info
export const fetchproductinfo = async (productid) => {
  try {
    console.log("start..wishlist");
    const response = await apiClient.get(`showproducts/${productid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};
//fetch user products
export const fetchuserproduct = async () => {
  try {
    console.log("start..fetch..product..");
    const response = await apiClient.get(`/userproduct`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};

export const fetchuseralldata = async (userid) => {
  try {
    console.log("start..fetch..userdata..");
    const response = await apiClient.get(`/profile/${userid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};
//fetch bids
export const fetchuserbids = async () => {
  try {
    console.log("start..fetch..product..");
    const response = await apiClient.get(`/userbids`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};

// add new bid
export const newbid = async (biddata, productid) => {
  try {
    console.log("biddata", biddata);
    const response = await apiClient.post(`/bids/${productid}`, biddata);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
//SHOW PRODUCT BIDS
export const fetchproductbids = async (productid) => {
  try {
    const response = await apiClient.get(`/showbids/${productid}`);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
//DELETE PRODUCT
export const deleteproduct = async (productid) => {
  try {
    const response = await apiClient.get(`/delete/${productid}`);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
//following opration
export const followfunction = async (followid) => {
  try {
    console.log("start..following");
    const response = await apiClient.get(`following/${followid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};

//fetch user following
export const followersdetails = async () => {
  try {
    console.log("start..following");
    const response = await apiClient.get(`/user/followers`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};
export const updatesproduct = async (productid, formdata) => {
  try {
    console.log("formdata", formdata);
    const response = await axios.post(`http://localhost:3000/editproduct/${productid}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization':localStorage.getItem('token')
      },
    });
    // const response = await apiClient.post(`/editproduct/${productid}`, formdata);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
// ADS
export const promote= async (productid) => {
  try {
    console.log("start..fetch..product..",productid);
    const response = await apiClient.post(`/ads/${productid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};

export const findpromote= async () => {
  try {
    // console.log("start..fetch..product..",productid);
    const response = await apiClient.get(`/ads`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};
export const findads= async () => {
  try {
    // console.log("start..fetch..product..",productid);
    const response = await apiClient.get(`/showads`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};
//admin find ads
export const findadminpromote= async () => {
  try {
    // console.log("start..fetch..product..",productid);
    const response = await apiClient.get(`/admin/ads`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};

//set notification token
export const notificationtoken = async (notificationtoken) => {
  try {
    console.log("start..set token", notificationtoken);
    const response = await apiClient.get(`/notificationtoken/${notificationtoken}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};
//delete notifications 
export const deletenotification = async (id) => {
  try {
    const response = await apiClient.delete(`/notification/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};

export const fetchnotification = async () => {
  try {
    console.log("start..set token");
    const response = await apiClient.get(`/notification`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID  :`, error);
    throw error;
  }
};

// ✅ PUT: Update an existing user
// export const updateUser = async (id, updatedData) => {
//   try {
//     const response = await apiClient.put(`/${id}`, updatedData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating user with ID ${id}:`, error);
//     throw error;
//   }
// };

// // ✅ DELETE: Remove a user
// export const deleteUser = async (id) => {
//   try {
//     const response = await apiClient.delete(`/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting user with ID ${id}:`, error);
//     throw error;
//   }
// };
