import {useForm} from "react-hook-form";
import './Register.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAt, faEye, faEyeSlash, faHurricane, faUserCheck} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../logo.svg';
import {useState} from "react";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from "yup";
import {Link} from "react-router-dom";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function Register(){
    const toastOptions = {
        hideProgressBar: true,
        autoClose: 1200,
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
        onError: (response)=>toast.error(response?.data?.message,toastOptions),
        onSuccess: ({data})=>{
            toast.success(data?.message, {
                ...toastOptions,
                onClose: () => navigate('/', {replace:true})
            });
            delete data.message;
            //set Local Storage
            window.localStorage.setItem(`gkc__auth`, JSON.stringify(data));
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
                <form onSubmit={handleSubmit(mutateAsync)} action="" className=" text-center h-2/3 bg-white w-5/6 sm:w-4/6 lg:w-2/6 rounded shadow-2xl" autoComplete={'off'}>
                    <div className="gkc__register__logo my-4">
                        <img src={logo} alt="" className="h-16 mx-auto"/>
                    </div>
                    <p className="text-center text-gray-600 font-bold text-2xl"> Register </p>

                    <div className="relative">
                        <input
                            type="text"
                            {...register('name')}
                            className="gkc__registerInput block w-5/6 mx-auto border-2 border-gray-500 rounded-xl h-10 px-2 py-6 text-medium my-4"
                            placeholder=" "
                        />
                        <label className="gkc__registerInputLabel absolute pointer-events-none text-gray-400" htmlFor="email">Name</label>
                        <div className='gkc__registerInputIcon absolute text-xl text-gray-500'>
                            <FontAwesomeIcon icon={faUserCheck}/>
                        </div>
                    </div>
                    <div className="gkc__registerInputError text-sm text-red-500 mb-8">
                        {errors?.name?.message}
                    </div>


                    <div className="relative">
                        <input
                            type="email"
                            {...register('email')}
                            className="gkc__registerInput block w-5/6 mx-auto border-2 border-gray-500 rounded-xl h-10 px-2 py-6 text-medium my-4"
                            placeholder=" "
                        />
                        <label className="gkc__registerInputLabel absolute pointer-events-none text-gray-400" htmlFor="email">Email</label>
                        <div className='gkc__registerInputIcon absolute text-xl text-gray-500'>
                            <FontAwesomeIcon icon={faAt}/>
                        </div>
                    </div>
                    <div className="gkc__registerInputError text-sm text-red-500 mb-8">
                        {errors?.email?.message}
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            className="gkc__registerInput block w-5/6  mx-auto border-2 border-gray-500 rounded-xl h-10 px-2 py-6 text-medium my-4"
                            placeholder=" "
                        />
                        <label className="gkc__registerInputLabel absolute pointer-events-none text-gray-400" htmlFor="password">Password</label>
                        <div className='gkc__registerInputIcon absolute text-xl text-gray-500'>
                            <FontAwesomeIcon className="cursor-pointer" icon={showPassword ? faEye : faEyeSlash} onClick={()=>setShowPassword(prevState => !prevState)} />
                        </div>
                    </div>
                    <div className="gkc__registerInputError text-sm text-red-500 mb-8">
                        {errors?.password?.message}
                    </div>

                    <div className="relative my-10">
                        <button className={'gkc__registerSignUpButton font-bold text-medium py-2 text-white w-2/3 rounded-xl'}>
                            Sign Up  <FontAwesomeIcon icon={faHurricane} size={'1x'} className={`spinner ${!isLoading ? 'hidden': ''}`} />
                        </button>

                    </div>

                    <div className="relative my-16 px-4">
                        <p className="text-gray-500"> Already have an account with us? <Link to={'/login'} className={'gkc__registerLogInButton'}> Log in</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export  default Register;