// CareerPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const OPENAI_API_KEY0 = 'key0';
const OPENAI_API_KEY1 = 'key1'; 
const OPENAI_API_KEY2 = 'key2';
const OPENAI_API_KEY3 = 'key3';
const OPENAI_API_KEY4 = 'key4'; 
const OPENAI_API_KEY5 = 'key5';

const url = "https://api.openai.com/v1/completions";
const url1 = 'https://api.openai.com/v1/images/generations';

const CareerPage = () => {
  const location = useLocation();
  const { state } = location;

  const userInput = state?.userMessage; 

  // console.log(state?.name);
  const [botResponse, setBotResponse] = useState('');
  
  const [careerResponse, setCareerResponse] = useState(''); 
  
  const [path, setPath] = useState('');  

  const [places, setPlaces] = useState('');  

  const [AIimage, setAIimage] = useState('');  

  const [eduImg, setEduImg] = useState(''); 

  function fetchCareer(userInput){ 
    fetch(url, {
      method: 'POST',
    headers:{
      'Content-Type': "application/json", 
      'Authorization': `Bearer ${OPENAI_API_KEY1}`
    }, 
    body: JSON.stringify({
      'model': 'text-davinci-003',
        'prompt': `Generate the top 5 best career choices to pursue with the given interests and strengths.
        ###
        interests: Art and Creativity
        career: Art Director:- Art directors are responsible for overseeing the visual style and creative elements of projects, leading teams of artists and designers to bring concepts to life.

        Graphic Designer:- Graphic designers use visual elements to communicate ideas and messages through various media, such as logos, websites, advertisements, and publications.
        
        Creative Writer:- Creative writers craft compelling narratives, poems, or scripts, using their imagination and linguistic skills to captivate audiences and evoke emotions.
        
        Animator:- Animators create animated sequences, characters, and special effects for films, video games, and other multimedia projects, adding movement and life to visual content.
        
        Art Therapist:- Art therapists utilize the therapeutic power of art to help individuals explore emotions, reduce stress, and improve mental well-being through guided creative processes.
        ###
        interests: ${userInput}
        career: 
        `, 
        max_tokens: 600 
    })
  }).then(response => response.json())
  .then(data => {
    setCareerResponse(data.choices[0].text);
    fetchEducation(careerResponse);  
  })
  .catch(error => {
    console.log(error); 
  }); 
}

  function fetchEducation(careerResponse){
    fetch(url,{
      method: 'POST', 
      headers:{
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${OPENAI_API_KEY2}` 
      }, 
      body: JSON.stringify({
        'model': 'text-davinci-003', 
        'prompt': `Generate the best education paths to follow for the following career choices:\n\n${careerResponse}`,
        'max_tokens': 600,
        'temperature': 0.7
      })
    }).then(response => response.json())
    .then(data => {
      setPath(data.choices[0].text.trim()); 
      fetchPlaces(path); 
      // fetchImagePrompt(places, careerResponse)
      // fetchImage(userInput);
    })
  }

  function fetchPlaces(path){
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY3}`
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': `
          List the best countries to study in for these education paths: 
          ###
          education: Bachelor's Degree in Fine Arts, Master's in Graphic Design, Creative Writing Courses
          places: Rome, England, USA
          ###
          education: ${path}
          places:   
        `,
        'max_tokens': 200
      })
    })
    .then(response => response.json())
    .then(data => { 
      setPlaces(data.choices[0].text.trim());  
      fetchImagePrompt(userInput);
    }).catch(error => {
      console.log(error); 
    }); 
  } 

  function fetchImagePrompt(userInput){
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${OPENAI_API_KEY4}`
      }, 
      body: JSON.stringify({
        'model': 'text-davinci-003', 
        'prompt': `Give a short description of an image that could be used to represent a person interested in ${userInput}. The description should be rich in visual detail but contain no names.
        ###
        interests: Sports and Health
        image description:  a vibrant and energetic individual with a genuine passion for sports and health. This person embodies an active and healthy lifestyle.Dressed in comfortable and athletic attire, reflecting their readiness to engage in physical activities and sports. Their attire might include sports shoes, athletic shorts or leggings, and a moisture-wicking sports top, signifying their readiness to jump into any sporting activity.
        ###
        interests: ${userInput}
        image description: `
      })
    })
    .then(response => response.json())
    .then(data => { 
      setAIimage(data.choices[0].text.trim());  

      // calling fetchcareer 
      fetchImgURL(AIimage);
    }).catch(error => {
      console.log(error); 
    });
  } 

  function fetchImgURL(AIimage){
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY5}`
      },
      body: JSON.stringify({
        prompt:`${AIimage}. There should be no text in this image.`,
        n: 1,
        size: '512x512',
        response_format: 'b64_json'
      })
    };
    fetch(url1, requestOptions)
    .then(response => response.json()) 
    .then(data => {
      if(data.data && data.data.length > 0){
        setEduImg(`<img src="data:image/jpeg;base64,${data.data[0].b64_json}">`);
      }
    })
  }

  function fetchBotReply(){
    
    // console.log(userInput); 
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${OPENAI_API_KEY0}`
      }, 
      body: JSON.stringify({
        'model': 'text-davinci-003',
          'prompt': `Generate a 2 line motivating message using their name and about how their interests sound interesting and that you need some minutes to think about it.
          
      ###
      interests: Art and Creativity
      message: I'm truly excited about your interests in art and creativity! Embracing your artistic side can lead to a world of self-expression and endless possibilities.
      ###
      interests: Entrepreneurship and Social Impact
      message: Your interests in entrepreneurship and social impact are both inspiring and impactful! The combination of business acumen and a desire to create positive change is a potent force for transforming lives. 
      ###
      interests: Health and Fitness
      message: Your commitment to health and fitness is truly motivating! Taking care of your well-being not only benefits you but also radiates positive energy to those around you.
      ###
      interests: ${userInput}
      message: `, 
        temperature : 0.8, 
        max_tokens: 100
      })
    }).then(response => response.json())
    .then(data => { 
      setBotResponse(data.choices[0].text);  

      // calling fetchcareer 
      fetchCareer(userInput);
    }).catch(error => {
      console.log(error); 
    }); 
  } 

  useEffect(()=>{
    if(state?.userMessage){
      fetchBotReply(); 
    }
  }, [state?.userMessage]); 

  console.log({botResponse})
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className="flex justify-center items-center font-extrabold text-[#222328] text-[32px]">Career Page</h1>
      </div>

      <div className='mr-[20%] ml-[20%] mt-[2%]'>
        <div className='py-8'>
            <p className='text-blue-600'> 
              fetchBotReply <br />
              {botResponse}
            </p> 
            <p className='text-orange-400'>
              fetchCareer <br />
              {careerResponse}
            </p>  
            <p className='text-black-500'>
              fetchEducation <br />
              {path}
            </p> 
            <p className='text-purple-600'>
              fetchplaces <br />
              {places}
            </p> 
            <p className="h-auto max-w-lg mx-auto">
              img <br />
              {eduImg}
            </p>
        </div>
      </div>
    </section>
  );
};

export default CareerPage;