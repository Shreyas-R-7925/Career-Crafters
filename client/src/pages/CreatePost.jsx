import React, {useState} from 'react'
import { FormField, Loader, Footer } from '../components'
import suggestions from '../constants/index' 
import { useNavigate } from 'react-router-dom' 

const CreatePost = () => {  

  const [selectedSuggestion, setSelectedSuggestion] = useState('');  

  const [userInterest, setUserInterest] = useState(''); 
  
  const [userName, setUserName] = useState('');  

  const [message, setMessage] = useState('');  

  const navigate = useNavigate();


  const getRandomSuggestion = (e) => { 
    e.preventDefault();   //prevents the page from getting refreshed as soon as the random suggestion is shown
    const rndIdx = Math.floor(Math.random() * suggestions.length); 
    const rndSug = suggestions[rndIdx];  
    setSelectedSuggestion(rndSug); 
  };   
  const userMessage = `Hi ${userName}! Your interests are ${selectedSuggestion || userInterest}. Wait till my digital brain process this information.`;
    
  const handleSend = (e) => {
    e.preventDefault();
    // console.log('userMessage:', userMessage); 
    setMessage(userMessage);

    navigate('/career-page', {
    state: { 
      userMessage,  
    },
  });
  };

  
  return (
    <section className='max-w-7xl mx-auto'> 
      <div>
        <h1 className="flex justify-center items-center font-extrabold text-[#222328] text-[32px]">Your dreams, our expertise. Input your interests, let's sculpt your future.</h1>
      </div>

      <form className='mr-[20%] ml-[20%] mt-[2%]'>
        <div className="inputContainer content-center"> 

          {/* Input container */}
          <div className='py-8'>
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Shreyas R"
              onChange={(e) => setUserName(e.target.value)}
            />     
        
            <FormField
              labelName="Interests"
              type="text"
              name="prompt"
              placeholder="Enter your interests and let's get started on this exciting journey together! " 
              value = {userInterest || selectedSuggestion} 
              onChange = {(e) => {setUserInterest(e.target.value) || setSelectedSuggestion(e.target.value)}}
            /> 

            <div className='float-right'> 
              <button className='bg-[#ff8900] px-2 py-2 rounded-md mt-2.5 mr-1.5' onClick={getRandomSuggestion}>Suggest</button> 
              <button className='bg-[#ffbf00] px-2 py-2 rounded-md' onClick={handleSend}>Send</button>
            </div>
          </div>  
        </div>
      </form> 

      <div className='fixed bottom-0 w-full right-0'>
        <Footer />
      </div> 
    </section>
  )
}

export default CreatePost