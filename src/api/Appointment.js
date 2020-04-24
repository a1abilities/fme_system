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
  // add: async ({ cancelToken, ...payload }) => {
  //   const URL = `${c.API_CONSUMER}/api/user/register`;
  //   try {
  //     const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
  //         cancelToken,
  //         data: payload,
  //       }),
  //     );
  //     return data;
  //   } catch (error) {
  //     checkError(error);
  //     throw error;
  //   }
  // },

  // verifyEmail:async ({ cancelToken, ...payload }) => {
  //   const URL = `${c.API_CONSUMER}/api/user/verifyemail`;
  //   try {
  //     const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
  //         cancelToken,
  //         data: payload,
  //       }),
  //     );
  //     return data;
  //   } catch (error) {
  //     checkError(error);
  //     throw error;
  //   }
  // },

  membersList: async () => {
    const URL = `${c.API_CONSUMER}/api/appointment/membersList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  getCurrentTimeslot:async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/appointment/getCurrentTimeslot`;
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


  handleLeave:async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/appointment/handleLeave`;
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

  addOrUpdateTimeslot: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/appointment/addOrUpdateTimeslot`;
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

  removeTimeSlot: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/appointment/removeTimeSlot`;
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

  bookAppointment: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/appointment/bookAppointment`;
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

  fetchBookedAppointmentList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/appointment/fetchBookedAppointmentList`;
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

  getAppointedClientList: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/appointment/getAppointedClientList`;
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