import React from 'react';
import { Card, Nav } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { SideBarData } from './SideBarData';
import { useLocation } from 'react-router-dom'; // React Router'ı içe aktarın
import '../css/SideBar.css';

const SideBar = () => {
  const location = useLocation(); // Konumu al

  return (
    <div className='Sidebar my-5'>
      <ul className='Sidebarlist'>
        {SideBarData.map((val, key) => {
          // Konumu kontrol ederek etkin sayfayı belirle
          const isActive = val.link === location.pathname;

          return (
            <li
              className={`row my-2 mx-3 ${isActive ? 'active' : ''}`} // Eğer etkinse "active" sınıfını ekle
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id='icon'>{val.icon}</div>
              <div id='title'>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;