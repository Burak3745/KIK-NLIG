
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
        if (item.email !== user.user.email) { return item }
    }).filter((item) => {
        return search.toLowerCase() === '' ? item : item.fullname.toLowerCase().includes(search.toLowerCase())
    }).slice(firstIndex, lastIndex);

    const npage = Math.ceil(user1.filter((item) => {
        if (item.email !== user.user.email) { return item }
    }).filter((item) => {
        return search.toLowerCase() === '' ? item : item.fullname.toLowerCase().includes(search.toLowerCase())
    }).length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const navigate = useNavigate();

    let sliceCurrent = 0
    if (currentPage == 2 || currentPage == 1) {
        sliceCurrent = 0
    }
    else {
        sliceCurrent = currentPage - 3
    }
    if (npage > 0 && currentPage > npage) {
        setCurrentPage(npage)
    }
    const [timerCount, setTimer] = useState(300)
    useEffect(() => {
        const interval = setInterval(() => {
            if (timerCount > 0) {
                setTimer(prevCount => prevCount - 1);
            }
        }, 1); // her milisaniyede bir azalt

        // Temizleme işlemi
        return () => clearInterval(interval);
    }, [timerCount]); // yalnızca bir kez çağırılacak


    const [user2, setUser2] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser2(userData)
    }, [userState])
    const userType = user2 && user2.user.userType
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    }
    else if (userType != "ADMIN") {
        navigate("/");
    } else {

        return (

            <div>

                <div><div class="float-child">

                    <div class="green"><SideBar /></div>
                </div>

                    <div class="float-child">
                        <div class="box">
                            <form name="search">
                                <input type="text" class="input1" name="txt" placeholder='Kullanıcı Ara...'
                                    onmouseout="this.value = ''; this.blur();" onChange={(e) => setSearch(e.target.value)} />
                            </form>
                            <i class="fas fa-search"></i>

                        </div>
                        <div class="blue" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                            {timerCount == 0 ?
                                <div>
                                    <Table >
                                        <thead className='text-light'>
                                            <th className='px-3'>FULLNAME</th>
                                            <th className='mx-2'>E-MAIL</th>
                                            <th className='px-2' >USERTYPE</th>
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
                                    <div className='pagination-container' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <ul class="pagination1">
                                            <li >
                                                <a className='prev' style={{ cursor: "pointer", position: "relative" }} onClick={prePage}>Geri</a>

                                            </li>
                                            {
                                                numbers.map((n, i) => (
                                                    <li key={i} className={`page-item ${parseInt(currentPage, 10) === n ? 'active' : ''}`}>
                                                        <a style={{ cursor: "pointer", position: "relative" }} onClick={() => changeCPage(n)}>{n}</a>
                                                    </li>
                                                )).slice(sliceCurrent, parseInt(currentPage, 10) + 2)
                                            }
                                            <li>
                                                <a className='next' style={{ cursor: "pointer", position: "relative" }} onClick={nextPage}>İleri</a>

                                            </li>
                                        </ul>
                                    </div>
                                </div> : <span class="loader"></span>}
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