import {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const Oauth = () => {
    const dispatch = useDispatch();    
    const {token} = useParams();
    const navigate = useNavigate();
    const authentication = useSelector((state) => state.token);
    

    useEffect(()=> {
        console.log("token:"+token);
        dispatch({type:"token", payload:token})

        axios.get(`http://localhost:8090/user?authentication=${token}`)
        .then((res)=>{
            console.log(res);
            console.log(res.data);
        })
        navigate("/main");
    }, [])
    
}

export default Oauth;