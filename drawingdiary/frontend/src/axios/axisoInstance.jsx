import axios from 'axios';

// 메모리에 토큰 저장
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 기본 서버 URL
  withCredentials: true, // CORS 쿠키 허용
  // 추가적인 전역 설정들
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;