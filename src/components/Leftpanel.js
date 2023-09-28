import React from 'react'
import inbox from "../images/inbox.png"
import send from "../images/send.png"
import snooze from "../images/snooze.png"
import star from "../images/star.png"
import pen from "../images/pen.png"
import Message from './Message'

function Leftpanel(props) {
  return (
    <div style={{position:"fixed",backgroundColor:"#F9F9F9",minHeight:"100vh",
       width:"19.6vw"}}>
   
      <Message/>
         <div style={{marginTop:"1vw",marginLeft:"0.8vw",width:"12vw",display:"flex",alignItems:"center"}}>
        <img src={inbox} style={{width:"1.2vw",marginLeft:"2vw"}}/>
        <span onClick={()=> props.setSubCollect("Inbox")} style={{cursor:"pointer",marginLeft:"1.6vw",fontWeight:"400",fontSize:'1.3vw'}}>Inbox</span>
      </div>
      <div style={{marginTop:"1vw",marginLeft:"0.8vw",width:"12vw",display:"flex",alignItems:"center"}}>
        <img src={star} style={{width:"1.2vw",marginLeft:"2vw"}}/>
        <span onClick={()=> props.setSubCollect("Starred")} style={{cursor:"pointer",marginLeft:"1.6vw",fontWeight:"400",fontSize:'1.3vw'}}>Starred</span>
      </div>
      <div style={{marginTop:"1vw",marginLeft:"0.8vw",width:"12vw",display:"flex",alignItems:"center"}}>
        <img src={snooze} style={{width:"1.2vw",marginLeft:"2vw"}}/>
        <span onClick={()=> props.setSubCollect("Snoozed")} style={{cursor:"pointer",marginLeft:"1.6vw",fontWeight:"400",fontSize:'1.3vw'}}>Snoozed</span>
      </div>
      <div style={{marginTop:"1vw",marginLeft:"0.8vw",width:"12vw",display:"flex",alignItems:"center"}}>
        <img src={send} style={{width:"1.2vw",marginLeft:"2vw"}}/>
        <span onClick={()=> props.setSubCollect("Send")} style={{cursor:"pointer",marginLeft:"1.6vw",fontWeight:"400",fontSize:'1.3vw'}}>Send</span>
      </div>
    </div>
  )
}

export default Leftpanel
