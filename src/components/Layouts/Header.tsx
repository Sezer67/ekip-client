import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout } from '../../service/user.sevice'
import * as userSlice from '../../redux/userSlice/userSlice'
import { useNavigate } from 'react-router-dom'
const Header = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userState = useAppSelector((state) => state.user);

  const handleLogout = async() =>{
    await logout();
    dispatch(userSlice.logout(""));
    navigate('/login');
  }

  const dropdownMenu = (
    <Menu 
      items={[
        {
          label:"menu 1",
          key:0,
          onClick:()=>alert('key 0')
        },
        {
          label:"menu 2",
          key:0,
          onClick:()=>alert('key 1')
        },
        {
          label:"Hesap Değiştir",
          key:2,
          onClick:handleLogout
        }
      ]}
    />
  );
  return (
    <>
      <div className='w-full h-[7vh] bg-primary shadow-lg'>
        <div className='w-full h-full flex justify-between items-center px-5'>
          <h1 className='text-light m-0'>EKIP</h1>
          <Dropdown overlay={dropdownMenu} trigger={['click']}>
            <button style={{padding:0,border:'none'}} className='flex flex-row items-center'>
              <div className='w-8 h-8 rounded-full bg-pink mr-4 flex justify-center items-center'>
                <img />
                <span>{userState.user.firstName.charAt(0).toUpperCase()}</span>
              </div>
              <span className='text-pink'>{userState.user.firstName.concat(" ",userState.user.lastName)}</span>
            </button>
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default Header