import React from 'react';
import "./css/header.css"

import ReactDOM from 'react-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import App from './App';


const Header = (props) => {
  return (
    <header>
      <div className="logoNtitle">
        <img style={{ maxWidth: 25, maxHeight: 25 }} src='https://mediaconnect.appypie.com/media/icons/128x128/1530516045226_aircall_logo.png' alt="aircall" />
        <h1 style={{ fontFamily: 'Cabin', fontSize: 18, fontWeight: '700', marginLeft:8 }}>
          {props.heading}
        </h1>
        <div style={{marginLeft:'10%', marginTop:'8px',  fontFamily: 'Cabin', fontSize: 15, position:'fixed',fontWeight: '700',display:'inline-flex'}}>
          <h2><b>Inbox</b></h2>
          <MoreVertIcon style={{ color: 'grey', fontFamily: 'Cabin', fontSize: 15, fontWeight: '700', marginLeft:'15px'}} />
          <h2 style={{marginLeft:'15px'}}><b><nobr>All calls</nobr></b></h2>

          <MoreVertIcon style={{ color: 'grey', fontFamily: 'Cabin', fontSize: 15, fontWeight: '700',  marginLeft:'15px'}} />
          <FilterListIcon style={{width:'25px', height:'25px', fontSize: 15, fontWeight: '700', marginLeft:'15px', marginTop:'-5px'}}></FilterListIcon>
        </div>
      </div>
    </header>
  );
};


export default Header;
