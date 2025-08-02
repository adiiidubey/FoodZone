import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="mt-8 px-4 md:px-12 lg:px-20" id="food-display">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
        Top Dishes Near You
      </h2>

      {/* Food List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {food_list.map((item,index) => {
          if(category==='All'||category===item.category)
          return <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        })}
        
      </div>
    </div>
  );
};

export default FoodDisplay;
