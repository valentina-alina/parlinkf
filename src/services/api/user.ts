/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApi } from "../../hooks/useApi.ts";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

export async function register(body:any) {
  try {
    const {data} = await api.post(`/user/register`, body);
    return data 
  } catch (error) {
    return {
      error: error
    };
  }
}

export async function updateUserPswd( body: any) {
  try {
    const { data } = await api.put(`/auth/mdp`, body);
    return data;
  } catch (error) {
    return {
      error: error
    };
  }
}

export async function registerClient(body:any) {
  try {
    const {data} = await api.post(`/auth/register`, body);

    return data 
  } catch (error) {
    return {
      error: error
    };
  }
}

export async function refreshToken(id: number, body:any) {
  const refreshToken = localStorage.getItem('refreshToken')
  const headers = { Authorization : "Bearer " + refreshToken }
  console.log('headers', headers)

  try {
    const response = await api.get(`posts/${id}`, body);
    console.log('response', response)
    // simulation of success api response
    return {
      datas: body,
      status: 200
    };
  } catch (error) {
    return error;
  }
}

export async function getUserById(id:string){
  try {
    const {data} = await api.get(`/user/${id}`);
  console.log(data)
    return data 
  } catch (error) {
    return {
      error: error
    };
  }
}