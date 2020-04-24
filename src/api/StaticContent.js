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
  getWeekDayList: async () => {
    const URL = `${c.API_CONSUMER}/api/staticcontent/getWeekDayList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);

      throw error;
    }
  },
  getPaymentModeList: async () => {
    const URL = `${c.API_CONSUMER}/api/staticcontent/getPaymentModeList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);

      throw error;
    }
  },
  getDiscountRateList: async () => {
    const URL = `${c.API_CONSUMER}/api/staticcontent/getDiscountRateList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  updateDiscountRateList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/staticcontent/updateDiscountRateList`;
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

  getEzidebitPaymentsParamsList: async () => {
    const URL = `${c.API_CONSUMER}/api/staticcontent/getEzidebitPaymentsParamsList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  
  getProductState: async ({}) => {
    const URL = `${c.API_CONSUMER}/api/staticcontent/getProductState`;
    try {
      const { data } = await axios(URL, Object.assign(PARAMS('GET')));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
};
