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
  uploadDocument: async (inputObj) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/uploaddoc`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: inputObj,
        headers: {
          'Content-Type': 'application/json'
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  uploadDeliveryDoc: async (data1) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/uploadDeliveryDoc`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: data1.formData,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  
  getRequeredOrderList: async ({...payload}) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getRequeredOrderList`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: payload,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getnewid: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getnewid`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));

      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getAll: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getall`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  convertedList: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/convertedList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  convert: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/convert`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  postOrder: async (data1) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/postorder`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: data1,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getCurrespondingBudget: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getbudget`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getBudgetHistory: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getBudgetHistory`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },



  getExistingBudget: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getExistingBudget`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  submitCancel: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/submitCancel`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  updateBudget: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/updateBudget`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getCurrespondingFixedOrder: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getfixedorder`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getCurrespondingFlexOrder: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getflexorder`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getRequiredDataToCancel: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getRequiredDataToCancel`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getPaymentHistory: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getpaymenthistory`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getPaymentSchedule: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getPaymentSchedule`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  // getFullPaymentHistory: async (req) => {
  //   const URL = `${c.API_CONSUMER}/api/franchise/order/getFullPaymentHistory`;
  //   try {
  //     const { data } = await axios(URL, {
  //       method: 'POST',
  //       data: req,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       headers: authHeader()}
  //     );
  //     return data;
  //   } catch (error) {
  //     checkError();
  //     throw error;
  //   }
  // },

  paymentSubmit: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/paymentsubmit`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  assignToFinance: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/assigntofinance`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  assignToDelivery: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/assigntodelivery`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  delivered: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/delivered`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  editPost: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/editorder`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getDeliveredProductData: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getDeliveredProductData`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getProductAndCategoryName: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getProductAndCategoryName`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },



  submitDeliveredProduct: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/submitDeliveredProduct`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  getFlexOrderDataForPDF: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/get-flex-order-data-for-PDF`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getFixedOrderDataForPDF: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/get-fixed-order-data-for-PDF`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  postComment: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/postComment`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getComment: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getcomment`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  getBudgetComments: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getBudgetComments`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getSalesTypeList: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getSalesTypeList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getRentingForList: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getRentingForList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getSalesPersonList: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getSalesPersonList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },


  getReceivedPaymentsList: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getReceivedPaymentsList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));

      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  fetchMissedPaymentData: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/fetchMissedPaymentData`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));

      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  getSingleOrderData: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getSingleOrderData`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  archiveOrder: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/archiveOrder`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  paymentReschedule: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/paymentReschedule`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  dishonourToPayment:  async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/dishonourToPayment`;
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
  
  searchOrder: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/searchOrder`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  filterMissedPaymentData: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/filterMissedPaymentData`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  completeNCloseContract: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/completeNCloseContract`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()
      }
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

  // getOrderDataByID: async (req) => {
  //   const URL = `${c.API_CONSUMER}/api/franchise/order/getOrderDataByID`;
  //   try {
  //     const { data } = await axios(URL, {
  //       method: 'POST',
  //       data: req,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       headers: authHeader()
  //     }
  //     );
  //     return data;
  //   } catch (error) {
  //     checkError();
  //     throw error;
  //   }
  // },

};
