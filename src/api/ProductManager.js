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

  getTabRelatedRecord: async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/productmanager/getTabRelatedRecord`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {          
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  getRentedOrder: async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/productmanager/getRentedOrder`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {          
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  changeProductState: async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/productmanager/changeProductState`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {          
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  getCommonProductForOrder: async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/productmanager/getCommonProductForOrder`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {          
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

};
