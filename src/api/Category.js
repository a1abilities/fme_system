import axios from 'axios';
import * as c from './Constants';
import { authHeader } from './AuthHeader';
import checkError from './HttpClient';

const PARAMS = ({ methodType = 'GET' }) => ({
  method: methodType,
  headers: {
    'Content-Type': 'application/json',
  },
  headers: authHeader(),
});

export default {
  add: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/add`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  addcategory: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/addCategory`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  addsubcategory: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/addSubCategory`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  addproduct: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/addProduct`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  productlist: async () => {
    const URL = `${c.API_CONSUMER}/api/category/productList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  edit: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/edit`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  list: async () => {
    const URL = `${c.API_CONSUMER}/api/category/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  
  mainCategoryList: async () => {
    const URL = `${c.API_CONSUMER}/api/category/maincategorylist`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  getAllFromMainCategoryList: async () => {
    const URL = `${c.API_CONSUMER}/api/category/getallmaincategorylist`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  

  categoryList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/categorylist`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  getAllFromCategoryList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/getallfromcategorylist`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  subCategoryList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/subcategorylist`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  getAllFromSubCategoryList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/getallfromsubcategorylist`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  RelatedproductList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/relatedproductlist`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  
  getOrderedProductList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/getOrderedProductList`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },


  search: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/search`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  archivedList: async () => {
    const URL = `${c.API_CONSUMER}/api/category/archivedList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
};
