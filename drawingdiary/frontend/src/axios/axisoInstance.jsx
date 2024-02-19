import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 기본 서버 URL
  withCredentials: true, // CORS 쿠키 허용
  // 추가적인 전역 설정들
});

export default axiosInstance;