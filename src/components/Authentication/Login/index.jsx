import {useForm} from "react-hook-form";
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAt, faEye, faEyeSlash, faSpinner} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/images/logo.png';
import {useContext, useState} from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import {Helmet} from "react-helmet";

function Login(){
    const {dispatch} = useContext(AuthenticationContext);
    const toastOptions = {
        hideProgressBar: true,
        autoClose: 1500,
        pauseOnHover: false,
    };

    const navigate = useNavigate();
    const registrationEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/auth/login`;
    const {isLoading, mutateAsync} = useMutation((data) => {
         return axios.post(registrationEndpoint, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
    },{
        onError: ({response})=>toast.error(response?.data?.message,toastOptions),
        onSuccess: ({data})=>{
            delete data.message;
            // set Local Storage
            window.localStorage.setItem(`gkc__auth`, JSON.stringify(data));

            //dispatch an action to set Authentication State
            dispatch({
                type: 'ASSIGN_USER',
                payload: data
            })

            window.setTimeout(navigate('/', {replace:true}), 3000);
        },
    });
    let strongRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const schema =  Yup.object({
        password: Yup.string().required('Password field is required').matches(strongRegex, "Must contain at least 6 Characters, 1 Number and 1 letter"),
        email: Yup.string().email('Oops! This email format is not quite correct').required('Email field is required'),
    });
    const {register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(schema)});
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Helmet>
                <title>Cordum|Login</title>
            </Helmet>
            <div className="gkc__loginContainer">
                <form onSubmit={handleSubmit(mutateAsync)}  autoComplete={'off'}>
                    <div className="gkc__loginLogo">
                        <img src={logo} alt="loginLogo"/>
                    </div>
                    <p> Login </p>

                    <div className="gkc__loginEmailInputContainer">
                        <input
                            type="text"
                            {...register('email')}
                            className="gkc__loginInput"
                            placeholder=" "
                        />
                        <label className="gkc__loginInputLabel" htmlFor="email">Email</label>
                        <div className='gkc__loginInputIcon'>
                            <FontAwesomeIcon icon={faAt}/>
                        </div>
                    </div>
                    <div className="gkc__loginInputError">
                        {errors?.email?.message}
                    </div>

                    <div className="gkc__loginPasswordInputContainer">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            className="gkc__loginInput"
                            placeholder=" "
                        />
                        <label className="gkc__loginInputLabel" htmlFor="password">Password</label>
                        <div className='gkc__loginInputIcon'>
                            <FontAwesomeIcon className="cursor-pointer" icon={showPassword ? faEye : faEyeSlash} onClick={()=>setShowPassword(prevState => !prevState)} />
                        </div>
                    </div>
                    <div className="gkc__loginInputError">
                        {errors?.password?.message}
                    </div>

                    <div className="gkc__forgotPassword">
                           <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="gkc__loginSubmitButtonContainer">
                        <button disabled={isLoading} className={'gkc__loginLogInButton'}>
                            Log In <FontAwesomeIcon icon={faSpinner} size={'1x'} className={`spinner ${!isLoading ? 'hidden': ''}`} />
                        </button>
                    </div>
                    <div className="gkc__loginAddendum">
                        <p> Don't have an account with us? <Link to={'/register'} className={'gkc__loginRegisterButton'}> Register</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export  default Login;