import { Grid } from '@mui/material'
import React, { useState } from 'react'
import Navbar from './Navbar'
import Leftpanel from './Leftpanel'
import Middle from './Middle'
import Rightpanel from './Rightpanel'
import Footer from './Footer'

function Main() {

  const [subCollect,setSubCollect] = useState("")
  const [search,setSearch] = useState("")


  return (
    <div >
      <Grid container>
        <Grid item xs={12}>
           <Navbar setSearch={setSearch}/>
        </Grid>
        <Grid item xs={2}>
           <Leftpanel setSubCollect={setSubCollect}/>
        </Grid>
        <Grid item xs={9}>
          <Middle search={search} subCollect={subCollect}/>
        </Grid>
        <Grid item xs={1}>
            <Rightpanel/>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Main
