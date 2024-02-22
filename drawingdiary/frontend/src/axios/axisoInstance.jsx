import axios from 'axios';

// 메모리에 토큰 저장
let accessToken = null;
let refreshToken = null;

export const setAuthToken = (newAuthToken, newRefreshToken) => {
  accessToken = newAuthToken;
  refreshToken = newRefreshToken; // Refresh Token 업데이트
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 기본 서버 URL
  withCredentials: true, // CORS 쿠키 허용
  // 추가적인 전역 설정들
});

export default axiosInstance;