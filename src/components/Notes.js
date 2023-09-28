import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import tasks from "../images/tasks.png"
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

export default function Notes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [notes,setNotes] = React.useState("")
  const [notesData,setNotesData] = React.useState([])

  const addNote = async()=>{
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`)
    const messageRef = collection(userDoc, "Notes")
    try{
        await addDoc(messageRef,{
           notes:notes
        })
    }catch(err){
        console.error(err)
    }
  }


  const showNotes = async()=>{
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`)
    const messageRef = collection(userDoc, "Notes")
    try{
       const data = await getDocs(messageRef)
       const filteredData = data.docs.map((doc)=>({
             ...doc.data(),
             id:doc.id
       }))
       setNotesData(filteredData)
    }catch(err){
        console.error(err)
    }
  }


  return (
    <div>
      <img onClick={handleOpen} src={tasks} style={{cursor:"pointer",width:"1.4vw",paddingTop:"2vw"}}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{paddingTop:"3vw",fontSize:"1vw",color:"grey"}}>
            Add Notes
          </Typography>
          <input onChange={(e)=>setNotes(e.target.value)} placeholder='Notes' style={{outline:"none",fontSize:"1vw",width:"11vw",height:"1.5vw"}}/>
          <Button onClick={addNote} variant='contained' sx={{fontSize:"1vw",width:"4vw",height:"2vw",marginTop:"1vw"}} >Add</Button>
          <Button onClick={showNotes} variant='contained' sx={{fontSize:"1vw",width:"4vw",height:"2vw",marginTop:"1vw"}} >Show</Button>
          <br/>
          {notesData.map((data)=>{
            return <>
             <li style={{marginTop:"0.5vw",fontSize:"1vw"}}>{data.notes}</li>
            </>
          })}
        </Box>
      </Modal>
    </div>
  );
}
