// Me connecter 
import { Link } from 'react-router-dom';
import './LoginPage.css';


export default function LoginPage() {
    return (
        <>
            <div className="md:flex " id="main-connexion">

                <div className="md:basis-4/12">
                    <img src="../../../public/images/logo.png" className="logo" alt="" />
                </div>
                <div className="md:basis-8/12">
                    <form>

                        <h1 className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"> Connectez-vous</h1><br/>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>

                        <button type="submit" className="text-white  bg-blue-400  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connexion</button> <br /> <br />
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