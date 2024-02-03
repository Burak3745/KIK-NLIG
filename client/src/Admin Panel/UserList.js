
import SideBar from './SideBar'
import '../css/AddMovie.css'
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getUserAction, updateUserAction } from '../action/userAction';

import { RiUser3Fill } from 'react-icons/ri'
import { RiAdminFill } from 'react-icons/ri'
const MovieList = ({ user, setUser }) => {
    const user1 = useSelector(state => state.users)
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const [adminData, setAdminData] = useState({
        userType: 'ADMIN'
    })
    const [userData, setuserData] = useState({
        userType: 'USER'
    })
    useEffect(() => {
        if (!user1[0]) {
            dispatch(getUserAction());
        }
        if (localStorage.getItem("user") && !user) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [dispatch, user, setUser]);

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = user1.filter((item) => {
        if (item.email !== user.email) { return item }
    }).filter((item) => {
        return search.toLowerCase() === '' ? item : item.fullname.toLowerCase().includes(search.toLowerCase())
    }).slice(firstIndex, lastIndex);
    const npage = Math.ceil(user1.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const navigate = useNavigate();



    const [user2, setUser2] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser2(userData)
    }, [userState])
    const userType = user2 && user2.userType
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    }
    else if (userType != "ADMIN") {
        navigate("/browse");
    } else {

        return (

            <div>

                <div><div class="float-child">

                    <div class="green"><SideBar /></div>
                </div>

                    <div class="float-child">
                        <div class="box">
                            <form name="search">
                                <input type="text" class="input1" name="txt" placeholder='Search'
                                    onmouseout="this.value = ''; this.blur();" onChange={(e) => setSearch(e.target.value)} />
                            </form>
                            <i class="fas fa-search"></i>

                        </div>
                        <div class="blue">
                            <Table >
                                <thead className='text-light'>
                                    <th className='mx-2'>FULLNAME</th>
                                    <th className='mx-2'>E-MAIL</th>
                                    <th className='mx-2' >USERTYPE</th>
                                    <th className='mx-2'>ACTIONS</th>
                                </thead>
                                <tbody className='text-muted'>
                                    {records
                                        .map((d, i) => (
                                            <tr key={i}>
                                                <td >{d.fullname}</td>
                                                <td>{d.email}</td>
                                                <td>{d.userType}</td>
                                                <td>
                                                    <div style={{ position: "relative", color: "#2dffb9", cursor: "pointer" }} onClick={(e) => {
                                                        e.preventDefault()
                                                        dispatch(updateUserAction(d._id, adminData))
                                                    }}>

                                                        <RiAdminFill /> ADMIN

                                                    </div>
                                                    <div style={{ position: "relative", color: "#2dffb9", cursor: "pointer" }} onClick={(e) => {
                                                        e.preventDefault()
                                                        dispatch(updateUserAction(d._id, userData))
                                                    }}>

                                                        <RiUser3Fill /> USER

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <ul className='pagination'>
                                    <li className='page-item '>
                                        <a style={{ cursor: "pointer" }} className='page-link' onClick={prePage}>Prev</a>

                                    </li>
                                    {
                                        numbers.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a style={{ cursor: "pointer" }} className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className='page-item'>
                                        <a style={{ cursor: "pointer" }} className='page-link' onClick={nextPage}>Next</a>

                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
};

export default MovieList