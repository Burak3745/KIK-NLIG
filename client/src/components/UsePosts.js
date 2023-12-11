import {useState, useEffect} from 'react';
//import {getPostsPage} from '../axios/index'
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { getPostAction } from '../action/postAction';

const usePosts = (pageNum) => {
    const [ results, setResults ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)
    const [ error, setError ] = useState({})
    const [ hasNextPage, setHasNextPage ] = useState(false)

    const [user, setUser] = useState()
    if (!localStorage.getItem("user")) {
        <Navigate to="/login" />;
    }else{
        if (!user) {
            const userData = JSON.parse(localStorage.getItem('user'))
            setUser(userData)
        }
    }

    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(false);
        setIsError(false);
        setError({})
    
        const controller = new AbortController()
        const { signal } = controller 

        dispatch(getPostAction(user.email))
            .then(res => {
                /*setResults(prev => [...prev, ...res.data])
                setHasNextPage(Boolean(res.data.length))*/
                setResults(res.data)
                setIsLoading(false)
            } )
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.message })
            })

        return () => controller.abort()
    }, [user, pageNum])

    return {isLoading, isError, error, results, hasNextPage}
}

export default usePosts;