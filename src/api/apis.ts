import {axiosClient} from '.';

export const apiRoutes = {
  REGISTER_USER: `api/auth/register`,
  LOGIN_USER: `api/auth/login`,
  LOGOUT: `api/auth/logout`,
  HOME_STORE_LISTING: `api/home/store/get`,
  GET_STORE_COUNT: `api/store/count`,
  STRORE_NOT_AVAILABLE: `api/store/not/available`,
  STORE_ACCEPT: `api/store/accept`,
  STORE_DETAILS: `api/store/info`,
  STORE_REGION: `api/qac/select/list`,
  GET_EXISTING_STORE: `api/existing/store`,
  GET_SUCCESS_STORE: `api/success/store`,
  GET_NC_STORE: `api/nc/store`,
  GET_REJECTED_STORE: `api/rejected/store`,
  GET_OUT_OF_STOCK_STORE: `api/out/stock/store`,
  GET_NEW_STORE: `api/new/store`,
  UPDATE_STORE: `api/store/form/fill`,
};

export const apiRequest = async (
  url: string,
  method: 'post' | 'get' | 'put',
  data?: any,
  params?: any,
) => {
  try {

    console.log('API Request:', {
      url,
      method,
      data,
      params,
    });
    const response = await axiosClient({
      url,
      method,
      data,
      params,
    });
    console.log('API Response:', response.data);
    console.log(response.request);
    console.log(response.headers);

    return response.data;
  } catch (error:any) {
    console.log('API Error:', error.request);
    console.log('API Error:', error.request.data);
    console.log('API Error:', error.response.data);
    console.error('API Error:', {
      url,
      method,
      data,
      params,
      response: error.response?.data || error.message,
    });
    console.log(error);
    throw error;
  }
};
