import React, { useEffect } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';

export const Suggestionbox = ({ showproduct ,setShowproduct}) => {
    const [items, setItems] = useState(new Set());

    useEffect(() => {
       items.clear()
    }, [showproduct,setShowproduct])
    
    
    useEffect(() => {
        showproduct?.map((product) => {
            setItems(items.add(product.name))
        })
    },[showproduct])
    
    console.log("itemssss......",[...items])

    return (
      <div className='h-[40vh] w-[40vw] fixed top-24 left-[20vw] bg-gray-800 overflow-y-scroll pt-3 hidden'>
          {[...items].map((product) => (
              <div className='flex justify-left gap-10 items-center text-white p-5 border-b-2 border-white'>
                  <IoIosSearch />
                  <h1>{product}</h1>
              </div>
          ))}
      </div>
  )
}
