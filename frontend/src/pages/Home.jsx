import React from 'react'
import { TabsDemo } from '../components/TabsDemo'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

   useEffect(() => {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"))

          if(userInfo){
              navigate('/chat')
          }
      }, [navigate])

  return (
    <div className='flex justify-center items-center min-h-screen'>
        <TabsDemo/>
    </div>
  )
}

export default Home