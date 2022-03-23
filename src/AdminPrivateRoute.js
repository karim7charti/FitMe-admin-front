
import {Component} from "react";
import {Route,withRouter,Redirect,useHistory} from "react-router-dom"
import axios from "axios";
import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";




function AdminPrivateRoute({component:Component,...rest}){
    const [isAuth, setisAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const history=useHistory();
    useEffect(() => {
        fetchData()

    },[]);
    const fetchData=()=>{
        axios.get('/greeting').then(response=>{

                if(response.status===200)
                {
                    setisAuth(true);
                    setLoading(false);

                }


            }
        ).catch(err=>{

           if(err.response!==undefined && err.response.status===401)
           {
                var payload={refreshToken:localStorage.getItem('refresh_token')}

                axios.post('/refreshtoken',payload).then(res=>{
                    if(res.status===200)
                    {
                        localStorage.setItem('token',res.data.accessToken);

                        setisAuth(true);
                         setLoading(false);
                    }

                }).catch(err=>{
                    setLoading(false);
                    history.push('/')

                })
           }
           else
               history.push('/')

        })

        return ()=>{
            setisAuth(false);
        }
    }

if(isLoading)
    return  <ClipLoader size={150} color={"#edd209"} css={{position:"relative",left:"45%"}} />

    return(
        <Route
            {...rest}

          render={(props)=>{
              if(isAuth)
              {
                  return <Component/>
              }

          }}


        />
    )

}



export default withRouter(AdminPrivateRoute)
