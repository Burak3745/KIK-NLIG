import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import '../css/AddMovie.css'
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import ReactFileBase64 from 'react-file-base64'
import { updateUserAction } from '../action/movieAction';
import { getIdUser } from '../axios/index.js'
const UpdateUsers = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullname: '', email: '', phoneNumber: '',
    })


    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await getIdUser(id)
            setUserData(data)
        }

        getUser()
    }, [id])

    const userUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUserAction(id, userData))
        navigate('/updateprofile')
    }
    const [user, setUser] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
    }, [userState])
    const userType = user && user.userType
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    }
    else if (userType != "ADMIN") {
        navigate("/browse");
    } else {

        return (

            <div class="AddMovie">

                <div class="float-child">
                    <div class="green"><SideBar /></div>
                </div>

                <div class="float-child">
                    <div class="blue ">

                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Name"
                                    name="name" id='name' value={userData.fullname} required onChange={(e) => setUserData({ ...userData, fullname: e.target.value })} />
                                <label for="Film Adı" class="form__label">Ad</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yapımcı Şirketi"
                                    name="name" id='name' value={userData.email} required onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                <label for="Yapımcı Şirketi" class="form__label">E-Mail</label>
                            </div>


                        </div>
                        <div className='flex-container mx-2'>

                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yönetmeni"
                                    name="name" id='name' value={userData.phoneNumber} required onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })} />
                                <label for="Yönetmeni" class="form__label">Telefon Numarası</label>
                            </div>
                        </div>

                        <button onClick={userUpdate} className='button-66' role="button-66">Güncelle</button>
                    </div>
                </div>
            </div>

        )
    }
};

export default UpdateUsers