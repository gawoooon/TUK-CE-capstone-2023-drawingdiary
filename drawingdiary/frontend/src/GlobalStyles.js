// 미디어 쿼리 적용할 부분

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    // 예시: 태블릿과 모바일 화면 크기에 따른 스타일 조정
    @media (max-width: 768px) {
        body {
        background-color: #f4f4f4; // 배경색 변경
        }
    }

    @media (max-width: 480px) {
        body {
        background-color: #e2e2e2; // 모바일에서의 배경색 변경
        }

        .DayColumn {
        font-size: 12px; // 모바일에서 날짜 글꼴 크기 조정
        }
    }
`;

export default GlobalStyles;
