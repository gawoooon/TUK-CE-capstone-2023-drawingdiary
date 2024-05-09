import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // 다음 렌더링에서 폴백 UI를 보여주도록 상태를 업데이트합니다.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // 오류 로깅 서비스에 오류를 기록할 수 있습니다.
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            // 폴백 UI를 렌더링합니다.
            return <h1>Something went wrong.</h1>;
        }
    
        return this.props.children;
    }
}

export default ErrorBoundary;