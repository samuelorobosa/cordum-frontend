import {useForm} from "react-hook-form";
import './ForgotPassword.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAt, faHurricane} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../logo.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";

function ForgotPassword(){
    const toastOptions = {
        hideProgressBar: true,
        autoClose: 1500,
        pauseOnHover: false,
    };

    const forgotPasswordEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/auth/forgot-password`;
    const {isLoading, mutateAsync} = useMutation((data) => {
        return axios.post(forgotPasswordEndpoint, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
    },{
        onError: ({response})=>toast.error(response?.data?.message,toastOptions),
        onSuccess: ({data})=>{
            toast.success(data.status,toastOptions);
        },
    });
    const schema =  Yup.object({
        email: Yup.string().email('Oops! This email format is not quite correct').required('Email field is required'),
    });
    const {register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(schema)});

    return (
        <>
            <div className="gkc__forgotPasswordContainer">
                <form onSubmit={handleSubmit(mutateAsync)}  autoComplete={'off'}>
                    <div className="gkc__forgotPasswordLogo">
                        <img src={logo} alt="forgotPasswordLogo"/>
                    </div>
                    <p> Forgot Password </p>

                    <div className="gkc__forgotPasswordEmailInputContainer">
                        <input
                            type="text"
                            {...register('email')}
                            className="gkc__forgotPasswordInput"
                            placeholder=" "
                        />
                        <label className="gkc__forgotPasswordInputLabel" htmlFor="email">Email</label>
                        <div className='gkc__forgotPasswordInputIcon'>
                            <FontAwesomeIcon icon={faAt}/>
                        </div>
                    </div>
                    <div className="gkc__forgotPasswordInputError">
                        {errors?.email?.message}
                    </div>

                    <div className="gkc__forgotPasswordSubmitButtonContainer">
                        <button disabled={isLoading} className={'gkc__forgotPasswordButton'}>
                            Reset Password <FontAwesomeIcon icon={faHurricane} size={'1x'} className={`spinner ${!isLoading ? 'hidden': ''}`} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export  default ForgotPassword;