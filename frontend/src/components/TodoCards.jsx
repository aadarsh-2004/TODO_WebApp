import React from 'react';
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const TodoCards = ({ title, body, id, delid,cardid, onUpdate }) => {
  return (
    <div className='flex flex-col justify-evenly max-h-fit p-4 m-4 bg-white rounded-md shadow-lg shadow-gray-500 hover:scale-105'>
      <h1 className='text-orange-500 font-medium text-2xl mb-3'>{title}</h1>
      <p className='text-gray-800 mb-3'>{body}</p>
      <div className='flex justify-end gap-4'> 
        <div className="text-orange-500 text-2xl cursor-pointer" onClick={() => delid(id)}>
          <MdDelete />
        </div>
        <div className="text-orange-500 text-2xl cursor-pointer" onClick={onUpdate}>
          <RxUpdate />
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
