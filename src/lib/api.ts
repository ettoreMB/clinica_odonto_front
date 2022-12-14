import axios, { AxiosError } from 'axios'
import { setCookie, parseCookies } from 'nookies';
import { signOut } from '../contexts/AuthContext';
type FailedRequestQueue = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

let failedRequestQueue = Array<FailedRequestQueue>();

export function setupApiClient(context = undefined) {
  let cookies = parseCookies(context);
  console.log(cookies['odonto.token'])
  const api = axios.create({
  baseURL: 'http://clinicaodonto.ettore.page:8080/',
  headers: {
    Authorization: `Bearer ${cookies['odonto.token']}`
  }
});

api.interceptors.response.use(res => {
  return res;
}, (error: AxiosError)=> {
  if (error.response?.status === 403) {
    cookies = parseCookies();
    signOut()
    
  }
 
  return Promise.reject(error);
})
return api
}
