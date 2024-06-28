import { useApi } from "../../hooks/useApi.ts";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

interface AuthSignin {
  email: string,
  password: string
}

export async function signin(body:AuthSignin) {
  try {
    const {data} = await api.post(`/user/login`, body);
    return data 
  } catch (error) {
    return {
      error: error
    };
  }
}



export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  const headers = { Authorization : "Bearer " + refreshToken }


  try {
    const response = await api.get(`posts/${id}`, body);
    // simulation of success api response
    return {
      datas: body,
      status: 200
    };
  } catch (error) {
    return error;
  }
}
