import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  
const VideoCall = () => {
    const roomID = "28677jjs"

    let myVideoCall = async(element)=>{
        const appId = 928692391
        const serverSecret = "88a5670d9f989d7086efe366d9e63523";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId, 
            serverSecret, 
            roomID,  
            randomID(5),  
            randomID(5)
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        //start the video calling
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
        })
    }
  return (
    <div
      className="myCallContainer"
      ref={myVideoCall}
      style={{ width: '100vw', height: '100vh' }}
    >

    </div>
  )
}

export default VideoCall