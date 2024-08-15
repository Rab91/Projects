import React, { useContext } from 'react'
import { HMSContext } from '../../../HMSContext'

const Leftbar = ({name,imgUrl,_id}) => {
  const {setReceiver,receiver} = useContext(HMSContext)
  return (
    <div 
    onClick={()=>setReceiver(_id)}
    className={receiver == _id ? 'card bg-info-subtle border border-0 rounded m-3' : 'card bg-light border border-0 rounded m-3'}
    style={{width:'10rem'}}>
        <div className='card-body d-flex'>
            <img
            width={50}
            height={50}
            className='rounded-circle'
            src={imgUrl} 
            />
            <p className='m-1'>{name}</p>
        </div>
    </div>
  )
}

export default Leftbar