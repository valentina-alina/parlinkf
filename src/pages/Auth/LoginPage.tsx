// Me connecter 
import { Link } from 'react-router-dom';
import './LoginPage.css';
import Logo from '../../assets/logo.png';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

import { signin } from '../../services/api/auth';


interface AuthSignin {
    email: string,
    password: string
  }
  
  export default function LoginPage() {
    const navigate = useNavigate();
 
    const [form, setForm] = useState<AuthSignin>({
      email: '',
      password: '',
    });
  
    const dataSchema = Yup.object({
      email: Yup.string().email().required("Champs obligatoire"),
      password: Yup.string().required("Champs obligatoire")
    });
  
    const {handleSubmit, handleChange, values, errors } = useFormik({
      initialValues: form,
      validationSchema : dataSchema,
      onSubmit:async values => {
        console.log("🚀 ~ ContactPage ~ values:", values)
       
        const response = await signin(values)
     
 
        if(response) {
          // set token and refresh token in local storage
          localStorage.setItem("accessToken", response.token)
          localStorage.setItem("refreshToken", response.refresh_token)
          localStorage.setItem("role", response.data.user.role)
          console.log("🚀 ~ response", response.data.user.role)
      
          navigate("/ads-list")

        }
      },
  
    });
   

   
    return (
        <>
      
            <div className="flex justify-center items-center">

                <div className="md:basis-4/12">
                    <img src={Logo} className="scale-75 m-x-10" alt="logo" />
                </div>
                <div className="md:basis-8/12">
                    <form  onSubmit={handleSubmit}>

                        <h1 className="font-titleTest text-3xl my-8"> Connectez-vous</h1><br/>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input    onChange={handleChange}
            value={values.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input   onChange={handleChange}
            value={values.password}
             type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>

                        <button   type="submit" className="text-white  bg-blue-400  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connexion</button> <br /> <br />
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="flex items-start mb-5 ">
                                <label htmlFor="remember" className="ms-2 text-sm font-mediumbg-blue-400  dark:text-gray-300">Se souvenir de moi </label>
                                <div className="flex items-center h-5 ">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required /> <br /> <br /> <br />

                                </div>
                            </div>
                            <div className="text-left">
                                {/* <a href="" className="ms-2 text-sm  text-blue-400 dark:text-blue-300 hover:underline">Mot de passe oublié ?</a> */}
                                <Link to="/forgot-password-page" className="ms-2 text-sm  text-blue-400 dark:text-blue-300 hover:underline">Mot de passe oublié ?</Link>
                            </div>
                        </div>


                    </form>
                </div>
            </div>

        </>
    )
}