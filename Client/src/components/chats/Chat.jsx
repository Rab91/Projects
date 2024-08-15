import React, { useContext } from 'react'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import { HMSContext } from '../../../HMSContext'

function Chat() {
  const {chatUsers} = useContext(HMSContext)
 // console.log(chatUsers)
  return (
    <div>
        <h5>Chats</h5>
        <div className='d-flex'>
            <div className='border border-1 vh-100 m-1 rounded'>
            {chatUsers?.map((item, index) => {
            return (
              <Leftbar
                name={item.name}
                imgUrl={item.profilePic}
                _id={item._id}
                key={item._id}
              />
            );
          }
          )}
            </div>
            <div className='vh-100 border border-0 m-1 rounded w-50'>
              <Rightbar/>
            </div>
            
        </div>

    </div>
  )
}

export default Chat