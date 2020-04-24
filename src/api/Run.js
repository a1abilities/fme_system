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

export async function Run (url,data) {
    try {
      data.userid=sessionStorage.uid;
      // const { result } = await axios(`${c.API_CONSUMER}/api/run/${url}`,Object.assign({}, PARAMS({ methodType: 'POST' }),data));
      let result = await axios(`${c.API_CONSUMER}/api/run/${url}`, {
        method: 'POST',
        data: data,
        headers: {
          "Content-Type": 'application/json'
        }
      });
      return result.data;
    } catch (error) {
      // checkError(error);
      throw error;
    }
  }
