// import axios from 'axios';
// import * as c from './Constants';
// import { authHeader } from './AuthHeader';

// const PARAMS = ({ methodType = 'GET' }) => ({
//   method: methodType,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   headers: authHeader(), 
// });

// export default {

//   generatePDF:  async (data1) => {
//     const URL = `${c.API_CONSUMER}/api/pdf/create-pdf`;
//     try {
//       const { data } = await axios(URL, {
//         method: 'POST',
//         data: data1,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         headers: authHeader()}
//       );
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // getnewid: async () => {
//   //   const URL = `${c.API_CONSUMER}/api/franchise/order/getnewid`;
//   //   try {
//   //     const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      
//   //     return data;
//   //   } catch (error) {
//   //     throw error;
//   //   }
//   // },

// };
