import React from 'react'
import { career } from '../assets'; 

import {Footer} from '../components'; 
 
const Home = () => { 

  return (
    <section className='max-w-7xl mx-auto'> 
      <div className="grid grid-cols-2 gap-4 px-12">
          <div> 
            <p className='mt-2 text-[#666e75] text-[18px] max-w-[500px]'>
              <span className='text-[48px] text-orange-400'>Career Crafters </span>
              empowers students by providing comprehensive guidance on academic pathways, study destinations, and future job prospects. Our platform offers students a clear roadmap, suggesting tailored courses, preferred study locations, and illuminating potential career opportunities post-graduation. 
              We pave the way for informed decisions, helping students build a successful and fulfilling educational journey.
              </p>
          </div> 
          <div className='px-12'>
            <img src={career} alt="" width= "450px" />
          </div>
      </div>  
      <div className='fixed bottom-0 w-full right-0'>
        <Footer />
      </div>
    </section>
  )
}

export default Home