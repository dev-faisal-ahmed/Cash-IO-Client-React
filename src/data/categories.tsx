import { BsHouseDoor } from 'react-icons/bs';
import { IoCar } from 'react-icons/io5';
import { PiBowlFoodLight } from 'react-icons/pi';
import { IconOptionType } from '../utils/types';

type CategoriesDataType = {
  expense: IconOptionType[];
};

export const categoriesData: CategoriesDataType = {
  expense: [
    { title: 'Housing', icon: <BsHouseDoor size={20} /> },
    { title: 'Transport', icon: <IoCar size={20} /> },
    { title: 'Food', icon: <PiBowlFoodLight size={20} /> },
  ],
};
