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
  register: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/user/staff/register`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      // console.log("user api data : ",data);
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  search: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/user/staff/search`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      // console.log("user api data : ",data);
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  list: async () => {
    const URL = `${c.API_CONSUMER}/api/user/staff/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  positionList: async () => {
    const URL = `${c.API_CONSUMER}/api/user/position/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
};
