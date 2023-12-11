import { useState, useRef, useCallback, useEffect } from 'react'
import usePosts from '../components/UsePosts'
import toast from "react-hot-toast";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import Post from '../components/Post';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { getMovieAction } from "../action/movieAction.js";
import { deletePostAction, getPostAction } from '../action/postAction.js';

const Posts = () => {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
    const [pageNum, setPageNum] = useState(0)
    const {
        isLoading,
        isError,
        error,
        results,
        hasNextPage
    } = usePosts(pageNum)
    const isADMIN = JSON.parse(localStorage.getItem('user'))?.userType === "ADMIN";

    const movies = useSelector((state) => state.movie);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!movies[0]) {
            dispatch(getMovieAction());
        }
    }, [dispatch, movies]);

    useEffect(() => {
        if (!posts[0]) {
            dispatch(getPostAction(user.email));
        }
    }, [dispatch, posts, user]);

    const getMovie = (movieId) => {
        const films = movies.filter((item) => movieId === item._id);
        if (films && films.length > 0) {
            return films[0];
        }
        return null;
    }
    const navigate = useNavigate();

    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
        if (isLoading) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('Son bildirimin yakınlarındayız!')
                setPageNum(prev => prev + 1)
            }
        })

        if (post) intObserver.current.observe(post)

    }, [isLoading, hasNextPage])

    if (isError) toast.error(`Error: ${error.message}`)

    const deletePost = useCallback((post) => {
        dispatch(deletePostAction(user.email,post._id)).then((res)=>{
            if(res.status === 201){
                navigate("/posts");
            }
        }).catch((error) => toast(error));
        post.deleted = 1;
    },[dispatch,user,navigate])

    const content = results.filter((post)=> post.deleted !== 1).map((post, i) => {
        if (results.length === i + 1) {
            return <Post isADMIN={isADMIN} deletePost={deletePost} ref={lastPostRef} key={post._id} post={post} movie={getMovie(post.movieId)} />
        }
        return <Post isADMIN={isADMIN} deletePost={deletePost} key={post.id} post={post} movie={getMovie(post.movieId)} />
    })

    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    } else {
        return (
            <Container>
                <Table>
                    <Row>
                        <Col>
                            <Button className='mx-1' color='success' rounded enabled
                                onClick={() => navigate("/postEntry")}
                                hidden={!isADMIN}
                            >
                                Yeni posta ekle
                            </Button>
                        </Col>
                    </Row>
                    {content}
                </Table>
            </Container>
        )
    }
}

export default Posts