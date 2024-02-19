import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../axios/axisoInstance';

export const CategoryContext = React.createContext();

const useCategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);
    
    useEffect(() => {
        // 카테고리 리스트를 불러오기
        const fetchCategoryList = async () => {
            try {
                const response = await axiosInstance.get('/api/album/list');
                const fetchedCategoryList = response.data;
                setCategoryList(fetchedCategoryList);
            } catch (error) {
                console.error("카테고리 리스트를 불러오는 중 에러 발생: ", error);
            }
        }

        fetchCategoryList();
    }, []);

    const addCategory = async (newCategory, memberId) => {
        if (newCategory && !categoryList.includes(newCategory)) {
            try {
                const response = await axiosInstance.post('api/album/add', {
                    memberId,
                    albumName: newCategory,
                });
                // 성공적으로 카테고리가 추가되면 리스트 업데이트
                setCategoryList((prevList) => {
                    const updateList = [...prevList, response.data];
                    return updateList;
                });
            } catch (error) {
                console.log("카테고리 추가 중 에러 발생: ", error);
            }
        };
    };

    //카테고리 삭제 함수
    const removeCategory = (categoryToRemove) => {
        setCategoryList((prevList) => prevList.filter(category => category !== categoryToRemove));
    };

    return { categoryList, addCategory,  removeCategory };
};

const CategoryProvider = ({ children }) => {
    const value = useCategoryList();
    return(
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

const useCategory = () => {
    const context = useContext(CategoryContext);
    if(!context) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};

export { CategoryProvider, useCategory };
