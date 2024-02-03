import React, { useEffect, useState } from 'react'
import { getIdUser } from '../axios'
import "../css/FetchMovie.css"


const CommentCard = ({ comment, index, editedComment, setEditedComment, editingCommentId, setEditingCommentId }) => {
    const [userData, setUserData] = useState({
        fullname: '', email: '', phoneNumber: '', image: ''
    })

    useEffect(() => {
        const getUser = async () => {
            const { data } = await getIdUser(comment && comment.userid)
            setUserData(data)
        }

        getUser()
    }, [comment.userid])

    function formatGeçenSüre(milisaniye) {
        const saniye = Math.floor(milisaniye / 1000);
        const dakika = Math.floor(saniye / 60);
        const saat = Math.floor(dakika / 60);
        const gün = Math.floor(saat / 24);
        const ay = Math.floor(gün / 30);
        const yıl = Math.floor(ay / 12);

        if (yıl > 0) {
            return `${yıl} yıl önce`;
        } else if (ay > 0) {
            return `${ay} ay önce`;
        } else if (gün > 0) {
            return `${gün} gün önce`;
        } else if (saat > 0) {
            return `${saat} saat önce`;
        } else if (dakika > 0) {
            return `${dakika} dakika önce`;
        } else {
            return `${saniye} saniye önce`;
        }
    }
    const mongoDBTarih = new Date(comment && comment.date);
    const suAn = new Date();
    const gecenSureMilisaniye = suAn - mongoDBTarih;
    const formatliSure = formatGeçenSüre(gecenSureMilisaniye);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "start" }}>
                <div className='card-comment-img'>
                    <img
                        hidden={!userData}
                        src={userData && userData.image}
                        alt=""
                        className=""
                        fluid
                    />
                </div>
                <div className='mx-3 my-3' >
                    <h5 >
                        <span style={{ color: "white" }}>{userData && userData.fullname}</span>
                        {'       '}
                        <span style={{ color: "gray" }}>{formatliSure}</span>
                    </h5>
                    {editingCommentId === index ? (
                        <div style={{ width: "600px" }}>
                            <div class="form__group field" >
                                <input
                                    value={editedComment}
                                    type="input" class="form__field" placeholder="Yorum düzenle..." name="Yorum Ekleyin..." id='Yorum düzenle...' required
                                    onChange={(e) => setEditedComment(e.target.value)} style={{}}
                                />
                                <label for="Yorum düzenle..." style={{ width: "100px" }} class="form__label">Düzenle</label>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="description-comment my-3"
                            style={{ position: "relative" }}
                        >
                            <h5
                                style={{
                                    position: "relative",
                                    wordWrap: "break-word",
                                }}
                                className="text-white"
                            >
                                {comment && comment.description}
                            </h5>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default CommentCard