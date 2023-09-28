import { List, ListItem, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import star from "../images/star.png"
import refresh from "../images/refresh.png"
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import { auth, database } from '../firebase/setup'
import { useState } from 'react'
import remove from "../images/bin.png"
import yellow from "../images/yellow.png"
import snooze from "../images/snooze.png"

function Middle(props) {

    const [mailData,setMailData] = useState([])
    const [show,setShow] = useState(false)
    
    const deleteMail = async(data)=>{
      const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
      const messageDoc = doc(userDoc,"Inbox",`${data.id}`)
      const starredDoc = doc(userDoc,"Starred",`${data.id}`)
      const snoozedDoc = doc(userDoc,"Snoozed",`${data.id}`)
      try{
        await deleteDoc(starredDoc)
        await deleteDoc(snoozedDoc)
        await deleteDoc(messageDoc)
      }catch(err){
        console.error(err)
      }
    }


    const getMail = async()=>{
        const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
        const messageDoc = collection(userDoc,`${props.subCollect ? props.subCollect : "Inbox"}`)
        try{
          const data = await getDocs(messageDoc)
          const filteredData = data.docs.map((doc)=>({
             ...doc.data(),
             id:doc.id
          }))
          setMailData(filteredData)
        }catch(err){
            console.error(err)
        }
    }

    const starred = async(data) =>{
      const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
      const messageDoc = doc(userDoc,"Starred",`${data.id}`)
      try{
        await setDoc(messageDoc,{
           email:data.email,
           sender:data.sender,
           starred:"true"
        })
      }catch(err){
        console.error(err)
      }
    }

    const snoozed = async(data) =>{
      const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
      const messageDoc = doc(userDoc,"Snoozed",`${data.id}`)
      const snoozeDoc = doc(userDoc,"Inbox",`${data.id}`)
      try{
        await deleteDoc(snoozeDoc)
        await setDoc(messageDoc,{
           email:data.email,
           sender:data.sender,
        })
      }catch(err){
        console.error(err)
      }
    }

    useEffect(()=>{
      getMail()
    },[props.subCollect])




  return (
    <div style={{marginLeft:"2.9vw",width:'75vw'}}>
        <img src={refresh} style={{width:"1.5vw",height:"1.5vw",marginLeft:"1.5vw",marginTop:"2vw"}}/>
        {props.search ?  mailData.filter((data)=> data.sender == props.search).map((data)=>{
            return <>
            <Paper onMouseEnter={()=> setShow(true)} onMouseLeave={()=>setShow(false)} elevation={0} style={{backgroundColor:"#F8FCFF",borderBottom:"1px solid #EFEFEF",borderTop:"1px solid #EFEFEF"}}>
            <ListItem>
                {data.starred ? <img src={yellow} style={{cursor:"pointer",width:"1.4vw",height:"1.4vw"}}/> 
                : <img onClick={()=>starred(data)} src={star} style={{cursor:"pointer",width:"1.4vw",height:"1.4vw"}}/>}
                <span  style={{fontSize:"1.3vw",marginLeft:"1.2vw",fontWeight:"500"}}>{data.sender}<span style={{marginLeft:"12vw",fontWeight:"200",marginLeft:"1vw",cursor:"pointer"}}>{data.email}</span></span>
                {show && <img onClick={()=>snoozed(data)} src={snooze} style={{marginLeft:"1vw",width:"1.3vw",height:"1.3vw",cursor:"pointer"}}/>}
                {show && <img onClick={()=>deleteMail(data)} src={remove} style={{width:"1.1vw",height:"1.1vw"}}/>}
            </ListItem>
           </Paper>
            </>
        })
       :  mailData.map((data)=>{
            return <>
            <Paper onMouseEnter={()=> setShow(true)} onMouseLeave={()=>setShow(false)} elevation={0} style={{backgroundColor:"#F8FCFF",borderBottom:"1px solid #EFEFEF",borderTop:"1px solid #EFEFEF"}}>
            <ListItem>
            {data.starred ? <img src={yellow} style={{cursor:"pointer",width:"1.4vw",height:"1.4vw"}}/> 
                : <img onClick={()=>starred(data)} src={star} style={{cursor:"pointer",width:"1.4vw",height:"1.4vw"}}/>}             
                   <span  style={{fontSize:"1.3vw",marginLeft:"1.2vw",fontWeight:"500"}}>{data.sender}<span style={{marginLeft:"12vw",fontWeight:"200"}}>{data.email}</span></span>
                  {show && <img onClick={()=>snoozed(data)} src={snooze} style={{marginLeft:"1vw",width:"1.3vw",height:"1.3vw",cursor:"pointer"}}/>}
                {show && <img  onClick={()=>deleteMail(data)} src={remove} style={{width:"1.1vw",height:"1.1vw",marginLeft:"1vw",cursor:"pointer"}}/>}
            </ListItem>
           </Paper>
            </>
        })}
      
      <h6 style={{fontWeight:"400",marginLeft:"28vw",fontSize:"1vw"}}>Terms · Privacy · Program Policies</h6>
     
    </div>
  )
}

export default Middle
