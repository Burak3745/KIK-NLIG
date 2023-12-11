import React from 'react'
import { Card, Nav } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import { SideBarData } from './SideBarData';
import '../css/SideBar.css'
const SideBar = () => {
  return (
    <div className='Sidebar my-5'>
        <ul className='Sidebarlist'>
       {SideBarData.map((val,key) => {
        return(
            <li className='row my-2 mx-3' key={key} onClick={()=> {window.location.pathname = val.link}}>
                <div id='icon'>
                    {val.icon}
                </div>
                <div id='title'>
                    {val.title}
                </div>
            </li>
        )
       })}
       </ul>
    </div>
  )
}

export default SideBar