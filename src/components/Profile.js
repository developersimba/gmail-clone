import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { auth, googleProvider } from '../firebase/setup';
import logout from "../images/logout.png"
import {signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '34%',
  left: '79%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  height:"20vw",
  bgcolor: '#D8E4F0',
  borderRadius:"4vw",
  padding:"2vw",
};

export default function Profile() {

    const navigate = useNavigate()


    const logoutAccount =  async()=>{
        try{
            await signOut(auth,googleProvider)
            auth.currentUser === null && navigate("/")
        }catch(err){
            console.error(err)
        }
    }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <Avatar onClick={handleOpen} sx={{position:"fixed",left:"96%",top:"2.5%",width:"2.7vw",height:"2.7vw",cursor:"pointer"}} src={auth.currentUser?.photoURL}/>
               <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{textAlign:"center",fontSize:"1.2vw"}}>
           {auth.currentUser?.email}
          </Typography>
          <Avatar src={auth.currentUser?.photoURL} style={{marginLeft:"11.6vw",width:"6vw",height:"6vw"}}/>
          <Typography  sx={{ textAlign:"center",fontSize:"1.7vw" }}>
            Hi, {auth.currentUser?.displayName}
          </Typography>
          <button onClick={logoutAccount} style={{cursor:"pointer",fontSize:"1vw",border:"1px solid white",borderRadius:"2vw",marginTop:"2vw",width:"14vw",height:"4vw",marginLeft:"7.5vw"}}><img src={logout} style={{width:"0.8vw"}}/>Signout</button>
          <Typography style={{fontSize:"0.8vw",fontWeight:"100",textAlign:"center",marginTop:"1vw"}}>Privacy Policy
          Terms of Service</Typography>
        </Box>
      </Modal>
    </div>
  );
}
