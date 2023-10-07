import React from 'react'

const currentYear = new Date().getFullYear(); 
const Footer = () => {
    
  return ( 
    <div>
        <footer className="flex justify-center items-center h-8 bg-gray-100">
            <div>
                <p>© {currentYear} Career Crafters. All Rights Reserved.</p>
            </div>
        </footer>
    </div>
  )
}

export default Footer