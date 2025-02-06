import React from 'react';
import { useSelector } from 'react-redux';
import './../css/showCategory.css';

const CategoryList = ({ showCategoryContainer }) => {
  const categories = useSelector(state => state.categories); // ✅ Redux에서 가져오기

  return (
    <div className={showCategoryContainer}>
      {categories.map(category => (
        <span key={category.id}>
          <div>{category.name}</div>
        </span>
      ))}
    </div>
  );
};

export default CategoryList;