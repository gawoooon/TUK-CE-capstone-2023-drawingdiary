import axios from 'axios';

// 메모리에 토큰 저장
let authToken = null;
let refreshToken = null;

export const setAuthToken = (newAuthToken, newRefreshToken) => {
  authToken = newAuthToken;
  refreshToken = newRefreshToken; // Refresh Token 업데이트
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 기본 서버 URL
  withCredentials: true, // CORS 쿠키 허용
  // 추가적인 전역 설정들
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }
  return config;
}, 
(error) => {
  return Promise.reject(error);
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true; // 요청에 표시하여 무한 루프를 방지

      // 여기에서 리프레시 토큰 엔드포인트 호출
      try {
        const { data } = await axios.post('http://localhost:8080/auth/refresh', {
          refreshToken: refreshToken, // 리프레시 토큰 전송
        });
        const newAccessToken = data.accessToken;
        setAuthToken(newAccessToken, refreshToken); // 액세스 토큰 업데이트
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // 새 액세스 토큰으로 원래 요청 재시도
      } catch (refreshError) {
        // 실패 처리: 사용자 로그아웃, 로그인으로 리다이렉트 등
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;