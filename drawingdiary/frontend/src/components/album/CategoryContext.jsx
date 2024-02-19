import React, { createContext, useState, useContext } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categoryList, setCategoryList] = useState([]); // 빈 배열로 초기화

    // Context에서 제공할 값
    const value = {
        categoryList,
        setCategoryList,
        // 필요한 경우 여기에 추가 기능 구현
    };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

// 다른 컴포넌트에서 Context를 사용하기 위한 Custom Hook
export const useCategory = () => useContext(CategoryContext);
