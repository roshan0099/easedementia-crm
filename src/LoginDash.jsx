
import {useNavigate, useParams } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from 'react';
import supabase from './authLogin';
import "./style/loginDash_style.css"

export default function DashBoard() {

    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [formdeets, setFormdeets] = useState({
        email: '', pwd: ''
    })
    const { id } = useParams();
    // console.log("this.context : ====?", id)

    async function signIn() {



        const { data, error } = await supabase.auth.signInWithPassword({
            email: formdeets["email"],
            password: formdeets["pwd"],

            // email : "xyz@abc.com",
            // password : "000000",
        })

        //   console.log("this is : ",data, error)

    }
    useEffect(() => {

        async function fetchSession() {

            const { data, error } = await supabase.auth.getSession()
            // console.log("this is data ",data)
            setProfile(data.session?.user)
        }

        fetchSession()

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {

            if (event == "SIGNED_IN"){
                if(id === "3"){
                    // console.log("this is 3")
                    navigate("/dailylog")
                    
                }
                // console.log("yoooooo youre in")

            }
            else{
                // console.log("get out")

            }
        })


    }, [])

    function deetsUpdating(e) {

        setFormdeets((prev) => {
            // console.log("prev value : ", prev)

            return {
                ...prev, [e.target.name]: e.target.value,
            }

        })
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        setProfile(null)

    }
    // useEffect(() => {
    //     console.log("check == useeffect")
    //     async function fetchSession() {
    //         // const session = supabase.auth.session()
    //         const { data, error } = await supabase.auth.getSession();
    //         setProfile(data.session?.user)


    //     }

    //     fetchSession()

    //     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {

    //         switch (event) {
    //             case "SIGNED_IN":
    //                 setProfile(session?.user)
    //                 break;
    //             case "SIGNED_OUT":
    //                 console.log("hai")
    //                 setProfile(null)
    //                 break;

    //             default:
    //                 console.log("hai")
    //         }
    //     })

    //     return () => {
    //         authListener.subscription.unsubscribe()
    //     }
    // }, [])




    return (
        <>
            {/* {console.log("checking ...  ",profile)}

            <button type='button' onClick={signIn}>click to login</button>
            <button type='button'onClick={signOut}>SignOut</button>
            <div>this is dashboar</div> */}

            <div class="container d-flex justify-content-md-center align-items-center vh-100">
                <div class="container mt-5">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <div class="login-container">
                                <h2 class="text-center mb-4">Login</h2>
                                {/* <form > */}
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email:</label>
                                        <input type="email" class="form-control no-outline" id="email" placeholder="Enter your email" onChange={deetsUpdating} name='email' required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password:</label>
                                        <input type="password" class="form-control no-outline" id="pwd" placeholder="Enter your password"  onChange={deetsUpdating} name='pwd' required />
                                    </div>
                                    <button type="submit" class="button-background-move" onClick={signIn}>Login</button>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}