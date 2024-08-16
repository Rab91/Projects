import React, { useContext, useState,useEffect, useRef } from 'react'
import "../../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { HMSContext } from '../../../HMSContext'
import { useSelector } from 'react-redux'
const Rightbar = () => {
    const [message,setMessage]= useState("")

    const {sendMessage,messages,sendFile} = useContext(HMSContext)
    const {user}= useSelector((state)=>state.authReducers)
    
    const fileRef = useRef(null)

    const FileNameFromUrl = (url)=>{
        url = url.split("/")
        return url[url.length - 1]
    }
  return (
    <div className="p-2">
        {
            messages.map((message,index)=>{
                if(message.sender._id == user._id){
                    return (

                        <div key={index}>
                            <div className='d-flex'>
                                {
                                    message.file == true ?(
                                        <div 
                                        className='d-flex justify-content-end' 
                                        style={{marginLeft: 'auto', marginRight: '0',width: '45%', wordWrap: 'break-all'}}>
                                        <div className='bg-secondary-subtle p-1 rounded'>
                                        <a style={{textDecoration:'none'}}
                                        href={message.message}>
                                            <FontAwesomeIcon icon={faDownload}/>
                                            {FileNameFromUrl(message.message)}
                                        </a>
                                        </div>
                                        </div>
                                    ):(
                                        <div className='d-flex justify-content-end' style={{marginLeft: 'auto', marginRight: '0'}}>
                                        <div className='m-3 rounded bg-light p-1'>
                                            <p className="mb-0">{message.message}</p>
                                            <p className='text-muted small mb-0'>{message.createdAt}</p>
                                        </div>
                                        </div>
                                    )
                                }
                            
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div key={index}>
                        <div>
                        {
                                    message.file == true ?(
                                        <div 
                                        className='bg-secondary-subtle rounded p-1' 
                                        style={{width: '50%', wordWrap: 'break-all'}}>
                                        <a style={{textDecoration:'none'}}
                                        href={message.message}>
                                            <FontAwesomeIcon icon={faDownload}/>
                                            {FileNameFromUrl(message.message)}
                                        </a>
                                        </div>
                                    ):(
                                       <div className='d-flex'>
                                        <img 
                                        width={40}
                                        height={40}
                                        className='rounded-circle mt-3'
                                        src={message.sender.profilePic}
                                        />
                                        <div className='m-3 rounded bg-light p-1'>
                                            <p className="mb-0">{message.message}</p>
                                            <p className='text-muted small mb-0'>{message.createdAt}</p>
                                        </div>
                                        </div>
                                    )
                                }
                        
                        </div>
                    </div>
                    
                    )
                   
                }
            })
        }
       
        <div>
            <form 
            className="bg-light border-top p-3 input-group" 
            style={{ 
                position: 'fixed',
                bottom: 0,
                width:"53vw",
               
            }}
            onSubmit={(e)=>{
                e.preventDefault();
                sendMessage(message)
                setMessage("")
            }}
            >
            <div style={{position: 'relative'}}>
            <input
            style={{width:"50vw"}}
            type="text"
            className="form-control border-0 border-bottom"
            placeholder="Send Message"
            onChange={(e)=>setMessage(e.currentTarget.value)}
            value={message}
            aria-label="message"
            aria-describedby="basic-addon2"
            /> 
            <FontAwesomeIcon   
            onClick={()=>fileRef.current.click()} 
            className='text-color mx-2'
            style={{position: 'absolute',bottom:10, right: 50, top: 10}}
            icon={faPaperclip} /> 
             <input 
             onChange={(e)=>sendFile(e.currentTarget.files[0])}
            style={{display:'none'}}
            ref={fileRef}
            type='file'/>
            </div>
            <button     
                type='submit'            
                className='btn text-color'
                style={{

                    position: 'absolute',
                    bottom:10, 
                    right: 50, 
                    top: 15, 
                    width: '30px', 
                    height: '30px'
                }}
            >
                <FontAwesomeIcon 
                icon={faPaperPlane}
                />
            </button>
           
            </form>
        </div>
    </div>
  )
}

export default Rightbar 