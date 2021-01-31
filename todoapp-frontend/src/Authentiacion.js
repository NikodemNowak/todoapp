import {Redirect, Route} from "react-router";
import {useEffect, useState} from "react";
import {instance} from "./ApiRepository";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        async function checkAuthentication() {
            if (localStorage.getItem("accessToken") == null || localStorage.getItem("refreshToken") == null) {
                setAuthenticated(false)
                setLoading(false)
            }
            instance.post('/token/verify', {accessToken: localStorage.getItem("accessToken")}).then(r=>{
                console.log(r)
                setAuthenticated(true)
                setLoading(false)
            }).catch(reason => {
                console.log(reason.toString())

                instance.post('/token/refresh', {refreshToken: localStorage.getItem("refreshToken")}).then(r => {
                    console.log(r)
                    localStorage.setItem("accessToken", r.data.accessToken)
                    setAuthenticated(true)
                    setLoading(false)
                }).catch(reason1 => {
                    setAuthenticated(false)
                    setLoading(false)
                })
            })
        }

        checkAuthentication()
    }, [authenticated, loading])

    if (loading) {
        return <div></div>
    } else {
        return (
            <Route {...rest} render={(props) => (
                authenticated ?
                    <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
            )} />
        );
    }

}

export const PublicRoute = ({ component: Component, ...rest }) => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        async function checkAuthentication() {
            if (localStorage.getItem("accessToken") != null && localStorage.getItem("refreshToken") != null) {
                setAuthenticated(true)
                setLoading(false)
            }
        }

        checkAuthentication()
    }, [authenticated, loading])

    if (loading) {
        return <div></div>
    } else {
        return (
            <Route {...rest} render={(props) => (
                !authenticated ?
                    <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location }}} />
            )} />
        );
    }

}

export default ProtectedRoute