import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import axios from 'axios';

export const CategoryContext = React.createContext();

function useCategoryList (){
    const [categoryList, setCategoryList] = useState([]);
    const [error, setError] = useState(null); // 에러 상태 추가
    const { memberID } = useAuth(); // 로그인한 상태에서 사용자의 memberID를 불러옴
    const accessToken = localStorage.getItem('accessToken');

    const fetchCategoryList = useCallback(async () => {
        if(memberID) {// 로그인 상태 확인
            try {
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
                await axios.post('http://localhost:8080/api/album', {
                    albumName: newCategory,
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                // 성공적으로 카테고리가 추가되면 리스트를 다시 불러옴
                fetchCategoryList();

            } catch (error) {
                console.log("카테고리 추가 중 에러 발생: ", error);
            }
        };
    };

    //카테고리 삭제 함수
    const removeCategory = async (categoryToRemove, onError) => {

        if(categoryToRemove) {
            console.log("categoryToRemove: ", categoryToRemove);
            try {
                await axios.delete(`http://localhost:8080/api/album/${categoryToRemove}`, {
                    headers : {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                // 성공적으로 카테고리 삭제 후 리스트를 다시 불러옴
                fetchCategoryList();
            } catch (error) {
                if (error.response.data.errorCode === 600) {
                    console.log("에러코드: ", error.response.data.errorCode);
                    onError("기본 카테고리는 삭제할 수 없습니다."); // 에러 상태 업데이트
                } else {
                    onError("카테고리 삭제 중 에러 발생"); // 일반 에러 처리
                }
            }
        }

    };

    return { categoryList, addCategory,  removeCategory };
};

const CategoryProvider = ({ children }) => {
    const { categoryList, addCategory, removeCategory } = useCategoryList();
    return(
        <CategoryContext.Provider value={ {categoryList, addCategory, removeCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

const useCategory = () => useContext(CategoryContext);

export { CategoryProvider, useCategory, useCategoryList };

