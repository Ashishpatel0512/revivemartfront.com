// VoiceSearch.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone } from 'react-icons/fa';

const bars = [...Array(12)].map((_, index) => (
  <motion.div
    key={index}
    className="bg-blue-600 rounded-full mx-0.5"
    animate={{
      height: [10, 35, 15, 30, 20, 40, 25],
      opacity: [0.6, 1, 0.6],
    }}
    transition={{
      duration: 1.4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: index * 0.1,
    }}
    style={{ width: 6 }}
  />
));

const VoiceSearch = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-10">
      <div className="flex flex-col items-center space-y-10">
        <motion.div
          className="relative flex items-center justify-center w-40 h-40 rounded-full shadow-lg"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ backgroundColor: '#ef4444' }}
        >
          <FaMicrophone size={48} className="text-white z-10" />
          <div className="absolute bottom-[-70px] flex items-end h-16">
            {bars}
          </div>
        </motion.div>
       
      </div>
    </div>
  );
};

export default VoiceSearch;
