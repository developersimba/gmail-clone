import React from 'react'
import Notes from './Notes'
import Contacts from './Contacts'
import Event from './Event'

function Rightpanel() {
  return (
    <div style={{backgroundColor:"#F9F9F9",minHeight:"100vh",textAlign:"center",
       position:"fixed",right:"0",width:"5vw"}}>
      <Event/>
      <br/>
      <Contacts/>
      <br/>
      <Notes/>
    </div>
  )
}

export default Rightpanel
