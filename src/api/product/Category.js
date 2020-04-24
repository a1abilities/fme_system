import axios from 'axios';
import * as c from './Constants';
import { authHeader } from './AuthHeader';
import checkError from '../HttpClient';

const PARAMS = ({ methodType = 'GET' }) => ({
  method: methodType,
  headers: {
    'Content-Type': 'application/json',
  },
  headers: authHeader(),
});

export default {
  mainlist: async () => {
      const URL = `${c.API_CONSUMER}/api/category/maincat`;
      try {
        const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
        return data;
      } catch (error) {
        checkError();
        throw error;
      }
    },
  // add: async ({ cancelToken, ...payload }) => {
  //   const URL = `${c.API_CONSUMER}/api/category/add`;
  //   try {
  //     const { data } = await axios(
  //       URL,
  //       Object.assign({}, PARAMS({ methodType: 'POST' }), {
  //         cancelToken,
  //         data: payload,
  //       }),
  //     );
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // edit: async ({ cancelToken, ...payload }) => {
  //   const URL = `${c.API_CONSUMER}/api/category/edit`;
  //   try {
  //     const { data } = await axios(
  //       URL,
  //       Object.assign({}, PARAMS({ methodType: 'POST' }), {
  //         cancelToken,
  //         data: payload,
  //       }),
  //     );
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // list: async () => {
  //   const URL = `${c.API_CONSUMER}/api/category/list`;
  //   try {
  //     const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};
