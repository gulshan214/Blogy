
import React , {useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

 export default function Protected({children , authentication = true}) {

    const navigate = useNavigate();
    const[loader , setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/") // navigate to home
        }
        setLoader(false)
    } , [authStatus , navigate , authentication])
    
  return loader ? <h1> Load ho rha ruko thoda ...</h1> : <> {children}</>
}

// This Protected (or authLayout.jsx) component is acting as a route guard 
// — it decides whether the user is allowed to see certain pages based on 
// their authentication status.

//authentication = true means: by default, the wrapped page requires the user to be logged in.