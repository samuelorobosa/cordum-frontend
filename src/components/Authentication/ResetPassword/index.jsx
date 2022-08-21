import {useForm} from "react-hook-form";
import './ResetPassword.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAt, faEye, faEyeSlash, faSpinner} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../logo.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function ResetPassword(){
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get('token');
    const toastOptions = {
        hideProgressBar: true,
        autoClose: 1500,
        pauseOnHover: false,
    };

    const resetPasswordEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/auth/reset-password`;
    const {isLoading, mutateAsync} = useMutation((data) => {
        data = {...data, 'token':resetToken}
        return axios.post(resetPasswordEndpoint, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
    },{
        onError: ({response})=>toast.error(response?.data?.message,toastOptions),
        onSuccess: ({data})=>{
            toast.success(data.message,{...toastOptions, onClose: ()=> navigate('/', {replace:true})});
        },
    });
    let strongRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const schema =  Yup.object({
        email: Yup.string().email('Oops! This email format is not quite correct').required('Email field is required'),
        password: Yup.string().required('Enter your new password').matches(strongRegex, "Must contain at least 6 Characters, 1 Number and 1 letter"),
        password_confirmation: Yup.string().required('Confirm your new password').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
    const {register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(schema)});
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="gkc__resetPasswordContainer">
                <form onSubmit={handleSubmit(mutateAsync)}  autoComplete={'off'}>
                    <div className="gkc__resetPasswordLogo">
                        <img src={logo} alt="resetPasswordLogo"/>
                    </div>
                    <p> Update Password </p>

                    <div className="gkc__resetPasswordEmailInputContainer">
                        <input
                            type="email"
                            {...register('email')}
                            className="gkc__resetPasswordInput"
                            placeholder=" "
                        />
                        <label className="gkc__resetPasswordInputLabel" htmlFor="email">Email</label>
                        <div className='gkc__resetPasswordInputIcon'>
                            <FontAwesomeIcon icon={faAt}/>
                        </div>
                    </div>
                    <div className="gkc__registerInputError">
                        {errors?.email?.message}
                    </div>

                    <div className="gkc__resetPasswordPasswordInputContainer">
                        <input
                            type="password"
                            {...register('password')}
                            className="gkc__resetPasswordInput"
                            placeholder=" "
                        />
                        <label className="gkc__resetPasswordInputLabel" htmlFor="password">New Password</label>
                    </div>
                    <div className="gkc__resetPasswordInputError">
                        {errors?.password?.message}
                    </div>

                    <div className="gkc__resetPasswordPasswordInputContainer">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password_confirmation')}
                            className="gkc__resetPasswordInput"
                            placeholder=" "
                        />
                        <label className="gkc__resetPasswordInputLabel" htmlFor="password_confirmation">Confirm New Password</label>
                        <div className='gkc__resetPasswordInputIcon'>
                            <FontAwesomeIcon className="cursor-pointer" icon={showPassword ? faEye : faEyeSlash} onClick={()=>setShowPassword(prevState => !prevState)} />
                        </div>
                    </div>
                    <div className="gkc__resetPasswordInputError">
                        {errors?.password_confirmation?.message}
                    </div>

                    <div className="gkc__resetPasswordSubmitButtonContainer">
                        <button disabled={isLoading} className={'gkc__resetPasswordButton'}>
                            Update Password <FontAwesomeIcon icon={faSpinner} size={'1x'} className={`spinner ${!isLoading ? 'hidden': ''}`} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export  default ResetPassword;