import React, { useContext, useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../axios/axisoInstance';
import { useAuth } from '../../auth/context/AuthContext';
import axios from 'axios';

export const CategoryContext = React.createContext();

const useCategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);
    const { memberID } = useAuth(); // 로그인한 상태에서 사용자의 memberID를 불러옴

    const fetchCategoryList = useCallback(async () => {
        if(memberID) {// 로그인 상태 확인
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`http://localhost:8080/api/album/list/${memberID}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const fetchedCategoryList = response.data;
                setCategoryList(fetchedCategoryList);
            } catch (error) {
                console.error("카테고리 리스트를 불러오는 중 에러 발생: ", error);
            }
        }
    }, [memberID]);
    
    useEffect(() => {
        // 카테고리 리스트를 불러오기
        fetchCategoryList();
    }, [memberID, fetchCategoryList]);

    const addCategory = async (newCategory) => {
 
        if (newCategory && !categoryList.some(category => category.albumName === newCategory)) {
            try {
                await axiosInstance.post('api/album/add', {
                    memberID,
                    albumName: newCategory,
                });
                // 성공적으로 카테고리가 추가되면 리스트를 다시 불러옴
                fetchCategoryList();

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

const useCategory = () => useContext(CategoryContext);

export { CategoryProvider, useCategory };

