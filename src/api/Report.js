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

  FinanceOrderReport: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/report/financeOrderReport`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
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

  getOrderReport: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/report/getOrderReport`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
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

  getDeliveryReport: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/report/getDeliveryReport`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
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

  
  getTaskReport: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/report/getTaskReport`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
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
  getDueTaskReport: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/report/getDueTaskReport`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
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
};
