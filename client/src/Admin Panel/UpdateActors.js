import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import '../css/AddMovie.css'
import { Navigate, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import ReactFileBase64 from 'react-file-base64'
import { updateActorsAction } from '../action/actorsAction';
import { getIdActors, updateActorMovie } from '../axios';
const AddActors = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    const [actorsData, setActorsData] = useState({
        name: '', image: ''
    })
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {

        if (
            actorsData.name.length >= 2
        ) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [actorsData]);

    useEffect(() => {
        const getActors = async () => {
            const { data } = await getIdActors(id)
            setActorsData(data)
        }

        getActors()
    }, [id])


    const actorsUpdate = async (e) => {
        e.preventDefault()
        dispatch(updateActorsAction(id, actorsData))
        await updateActorMovie(id, actorsData);
        navigate(`/actorlist`)
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                document.getElementById('myButton').click();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const [user, setUser] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
    }, [userState])
    const userType = user && user.user.userType
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    }
    else if (userType != "ADMIN") {
        navigate("/");
    }
    else {

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
                                    name="name" id='name' value={actorsData.name} required onChange={(e) => setActorsData({ ...actorsData, name: e.target.value })} />
                                <label for="Film Adı" class="form__label">Adı</label>
                            </div>

                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Name"
                                    name="name" id='name' value={actorsData.image} required onChange={(e) => setActorsData({ ...actorsData, image: e.target.value })} />
                                <label for="Film Adı" class="form__label">Resmi</label>
                            </div>

                        </div>

                        <div className='flex-container mx-2'>
                            <div class="form__group field py-5 px-2">
                                <ReactFileBase64
                                    type='file'
                                    multiple={false}
                                    onDone={({ base64 }) => {
                                        setActorsData({ ...actorsData, image: base64 })
                                    }}

                                />
                            </div>
                        </div>


                        <button id="myButton" disabled={disabled} onClick={actorsUpdate} className='button-66 ' role="button-66">Güncelle</button>
                    </div>

                </div>

            </div>
        )
    }
};

export default AddActors