import React from 'react'
import { useAppSelector } from '../../redux/hooks';
import Header from './Header'
import MySider from './MySider'

const Layout:React.FC<{children:React.ReactNode}> = ({children}) => {
  
  const userState = useAppSelector((state) => state.user);

  return (
    <>
        <div className='w-full h-[100vh] max-h-[100vh]'>
            <Header />
            <div className='w-full flex flex-row'>
              <MySider />
              <div className='m-3'>
                Content
                {children}
              </div>
            </div>
        </div>
    </>
  )
}

export default Layout