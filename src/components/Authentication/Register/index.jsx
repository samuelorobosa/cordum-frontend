import {useForm} from "react-hook-form";
import './Register.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAt, faEye, faEyeSlash, faSpinner, faUserCheck} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/images/logo.png';
import {useContext, useState} from "react";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from "yup";
import {Link} from "react-router-dom";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import {Helmet} from "react-helmet";

function Register(){
    const {dispatch} = useContext(AuthenticationContext)
    const toastOptions = {
        hideProgressBar: true,
        autoClose: 1500,
        pauseOnHover: false,
    };

    const navigate = useNavigate();
    const registrationEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/auth/register`;
    const {isLoading, mutateAsync} = useMutation((data) => {
        return axios.post(registrationEndpoint, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
    },{
        onError: ({response})=>{
            toast.error(response?.data?.message,toastOptions)
        },
        onSuccess: ({data})=>{
            delete data.message;
            //set Local Storage
            window.localStorage.setItem(`gkc__auth`, JSON.stringify(data));

            //dispatch an action to set Authentication State
            dispatch({
                type: 'ASSIGN_USER',
                payload: data
            })

            navigate('/', {replace:true});
        },
    });

    let strongRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const schema =  Yup.object({
        name: Yup.string().required('Name field is required'),
        password: Yup.string().required('Password field is required').matches(strongRegex, "Must contain at least 6 Characters, 1 Number and 1 letter"),
        email: Yup.string().email('Oops! This email format is not quite correct').required('Email field is required'),
    });
    const {register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(schema)});
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Helmet>
                <title>Cordum|Register</title>
            </Helmet>
            <div className="gkc__registerContainer">
                <form onSubmit={handleSubmit(mutateAsync)} autoComplete={'off'}>
                    <div className="gkc__registerLogo">
                        <img src={logo} alt=""/>
                    </div>
                    <p> Register </p>

                    <div className="gkc__registerNameInputContainer">
                        <input
                            type="text"
                            {...register('name')}
                            className="gkc__registerInput"
                            placeholder=" "
                        />
                        <label className="gkc__registerInputLabel" htmlFor="email">Name</label>
                        <div className='gkc__registerInputIcon'>
                            <FontAwesomeIcon icon={faUserCheck}/>
                        </div>
                    </div>
                    <div className="gkc__registerInputError">
                        {errors?.name?.message}
                    </div>


                    <div className="gkc__registerEmailInputContainer">
                        <input
                            type="email"
                            {...register('email')}
                            className="gkc__registerInput"
                            placeholder=" "
                        />
                        <label className="gkc__registerInputLabel" htmlFor="email">Email</label>
                        <div className='gkc__registerInputIcon'>
                            <FontAwesomeIcon icon={faAt}/>
                        </div>
                    </div>
                    <div className="gkc__registerInputError">
                        {errors?.email?.message}
                    </div>

                    <div className="gkc__registerPasswordInputContainer">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            className="gkc__registerInput"
                            placeholder=" "
                        />
                        <label className="gkc__registerInputLabel" htmlFor="password">Password</label>
                        <div className='gkc__registerInputIcon'>
                            <FontAwesomeIcon className="cursor-pointer" icon={showPassword ? faEye : faEyeSlash} onClick={()=>setShowPassword(prevState => !prevState)} />
                        </div>
                    </div>
                    <div className="gkc__registerInputError">
                        {errors?.password?.message}
                    </div>

                    <div className="gkc__registerSubmitButtonContainer">
                        <button disabled={isLoading} className={'gkc__registerSignUpButton'}>
                            Sign Up  <FontAwesomeIcon icon={faSpinner} size={'1x'} className={`spinner ${!isLoading ? 'hidden': ''}`} />
                        </button>

                    </div>

                    <div className="gkc__registerAddendum">
                        <p> Already have an account with us? <Link to={'/login'} className={'gkc__registerLogInButton'}> Log in</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export  default Register;