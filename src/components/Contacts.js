import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import user from "../images/user.png"
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { auth, database } from '../firebase/setup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '92%',
  transform: 'translate(-50%, -50%)',
  width: "14vw",
  minHeight:"650px",
  bgcolor: 'background.paper',
  padding: "1vw",
};

export default function Contacts() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name,setName] = React.useState("")
  const [mobile,setMobile] = React.useState("")
  const [contactsData,setContactsData] = React.useState([])

  const addContacts = async()=>{
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`)
    const messageRef = collection(userDoc, "Contacts")
    try{
        await addDoc(messageRef,{
           name:name,
           mobile:mobile
        })
    }catch(err){
        console.error(err)
    }
  }


  const showContacts = async()=>{
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`)
    const messageRef = collection(userDoc, "Contacts")
    try{
       const data = await getDocs(messageRef)
       const filteredData = data.docs.map((doc)=>({
             ...doc.data(),
             id:doc.id
       }))
       setContactsData(filteredData)
    }catch(err){
        console.error(err)
    }
  }


  return (
    <div>
      <img onClick={handleOpen} src={user} style={{cursor:"pointer",width:"1.4vw",paddingTop:"2vw"}}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{paddingTop:"3vw",fontSize:"1vw",color:"grey"}}>
            Add Contacts
          </Typography>
          <input onChange={(e)=> setName(e.target.value)} placeholder='Name' style={{outline:"none",fontSize:"1vw",width:"11vw",height:"1.5vw"}}/>
          <input onChange={(e)=> setMobile(e.target.value)} placeholder='Mobile' style={{marginTop:"1vw",outline:"none",fontSize:"1vw",width:"11vw",height:"1.5vw"}}/>
          <Button onClick={addContacts} variant='contained' sx={{fontSize:"1vw",width:"4vw",height:"2vw",marginTop:"1vw"}} >Add</Button>
          <Button onClick={showContacts} variant='contained' sx={{fontSize:"1vw",width:"4vw",height:"2vw",marginTop:"1vw"}} >Show</Button>
          <br/>
          {contactsData.map((data)=>{
            return <>
            <li style={{marginTop:"0.5vw",fontSize:"1vw"}}> - {data.name}<span>-{data.mobile}</span></li>
            </>
          })}
        </Box>
      </Modal>
    </div>
  );
}
