import React from 'react'; 
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {logo} from './assets'; 
import {Home, CreatePost, CareerPage} from './pages'; 

const App = () => {
  return (
    <BrowserRouter> 
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 ">
        <Link to="/">  
          <div className='header-logo'>
            <img src={logo} alt="logo" className="w-16 object-contain" />  
            &nbsp; 
            <p class="text-[24px] text-blue-900">Career<span class="text-[24px] text-orange-500">Crafters</span></p>
          </div>
        </Link>
        <Link to="/create-post" className="font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md">Craft</Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} /> 
          <Route path="/career-page" element={<CareerPage />} />
        </Routes>
      </main> 
      
    </BrowserRouter>
  )
}

export default App