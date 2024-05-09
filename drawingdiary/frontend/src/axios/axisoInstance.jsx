
// 메모리에 토큰 저장
let accessToken = null;
let refreshToken = null;

export const setAuthToken = (newAuthToken, newRefreshToken) => {
  accessToken = newAuthToken;
  refreshToken = newRefreshToken; // Refresh Token 업데이트
};

