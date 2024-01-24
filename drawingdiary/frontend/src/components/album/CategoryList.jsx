import { useContext, useState } from 'react';
import CategoryContext from './CategoryContext';

const initialCategoryList = ["약속", "과제", "생일"];

const useCategoryList = () => {
    const [categoryList, setCategoryList] = useState(initialCategoryList);

    const addCategory = (newCategory) => {
        if (newCategory && !categoryList.includes(newCategory)) {
            setCategoryList((prevList) => {
                const updateList = [...prevList, newCategory];
                return updateList;
            });
        }
    };

    return { categoryList, addCategory };
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
