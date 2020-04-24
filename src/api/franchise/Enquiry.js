import axios from 'axios';
import * as c from '../Constants';
import { authHeader } from '../AuthHeader';
import checkError from '../HttpClient';

const PARAMS = ({ methodType = 'GET' }) => ({
  method: methodType,
  headers: {
    'Content-Type': 'application/json',
  },
  headers: authHeader(), 
});

export default {
  
  getnewid: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/enquiry/getnewid`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },
  
  
  getAll: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/enquiry/getall`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  nonConvertList: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/enquiry/nonconvertlist`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  convertedList: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/enquiry/convertedList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

   convert: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/enquiry/convert`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()}
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  postEnquiry: async (data1) => {
    const URL = `${c.API_CONSUMER}/api/franchise/enquiry/postenquiry`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: data1,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()}
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  deleteEnquiry: async (data1) => {
    const URL = `${c.API_CONSUMER}/api/franchise/enquiry/deleteEnquiry`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: data1,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()}
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  search: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/franchise/enquiry/search`;
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
};
