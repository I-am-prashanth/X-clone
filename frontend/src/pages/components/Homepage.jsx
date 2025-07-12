import React, { useState, useEffect } from 'react'
import Post from './Post';

function Homepage() {
  // Initialize state with the lastUrl from sessionStorage or default to 'suggested'
  const [activeTab, setActiveTab] = useState(() => {
    const lastUrl = sessionStorage.getItem('lastUrl');
    return lastUrl || 'suggested';
  });

  // Update sessionStorage when tab changes
  useEffect(() => {
    sessionStorage.setItem('lastUrl', activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="relative max-w-4xl mx-60 px-4 bg-gray-900 min-h-screen h-auto" style={{margin: "2px 255px"}}>
        <div className="flex justify-between items-center h-14">
          <div className="flex space-x-30">
            <button
              onClick={() => setActiveTab('suggested')}
              className={`relative py-4 font-medium text-sm ${activeTab === 'suggested' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Suggested
              {activeTab === 'suggested' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('following')}
              className={`relative py-4 font-medium text-sm ${activeTab === 'following' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Following posts
              {activeTab === 'following' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
        <Post feedtype={activeTab}/>

      </div>
     
    </>
  )
}

export default Homepage