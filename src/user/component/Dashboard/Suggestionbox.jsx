import React, { useEffect } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';

export const Suggestionbox = ({ products,showproduct ,setShowproduct, setText,text}) => {
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
      <div className={`h-[40vh] w-[50vw] fixed top-16 left-[19vw] bg-gray-300 overflow-y-scroll pt-3 z-40 ${text?'':'hidden'}`}>
          {[...items].map((product) => (
              <div className='flex justify-left gap-10 items-center text-black p-5 border-b-2 border-white z-10' onClick={()=>{setText(product), setShowproduct(
                products.filter((products) =>
                  new RegExp(product, "gi").test(products.name)
                )
              );}}>
                  <IoIosSearch />
                  <h1>{product}</h1>
              </div>
          ))}
      </div>
  )
}
