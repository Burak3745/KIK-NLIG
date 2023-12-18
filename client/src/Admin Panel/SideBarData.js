import React from 'react'
import {FaListAlt} from "react-icons/fa"
import {RiVideoAddFill} from "react-icons/ri"
import {RiUserSettingsFill} from "react-icons/ri"
import {FaUsersGear} from "react-icons/fa6"
import { TiUserAdd } from "react-icons/ti";
export const SideBarData = [
    {
       title:"Film Listesi",
       icon: <FaListAlt/>,
       link: "/movielist"
    },
    {
        title:"Dizi Listesi",
        icon: <FaListAlt/>,
        link: "/serieslist"
     },
     {
        title: "Film/Dizi Ekle",
        icon: <RiVideoAddFill/>,
        link: "/addmovie"
     },
     {
      title: "Oyuncu Ekle",
      icon: <TiUserAdd />,
      link: "/addactors"
     },
     {
        title:"Update Profile",
        icon: <RiUserSettingsFill/>,
        link: "/updateprofile"
     },
     {
        title:"User List",
        icon: <FaUsersGear/>,
        link: "/userlist"
     }

]

