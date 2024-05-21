/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ListGroup, MegaMenu,Navbar, TextInput } from "flowbite-react";
import { Link, Navigate} from 'react-router-dom';
import { MdAddToPhotos } from "react-icons/md";
import Logo from '../../assets/logo.png';
import { HiSearch } from "react-icons/hi";
import { useState } from "react";

interface NavbarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function NavbarComponent({ searchQuery, setSearchQuery }: NavbarProps){
    const [showCalendrierLink, setShowCalendrierLink] = useState(true);
    const auth = { token: true};

    return(
        <>
            {/* Conditionner l'affichage des trois liens si l'on n'est pas connecté */}
            {auth.token 
            ? 
            
            <div className="sticky top-0 scale-110 mb-8 flex justify-center items-center z-50">
                <Navbar fluid rounded className="hidden sm:block w-full">
                    
                    <Navbar.Brand>
                        <Link to="/login">
                            <img src={Logo} alt="logo ParLink" className="ml-8 h-6 sm:h-9 scale-150" />
                        </Link>
                    </Navbar.Brand>

                    <div className="max-w-md ml-10 sm:ml-16 mr-10 sm:mr-16">
                        <TextInput
                            className="w-80"
                            id="search"
                            type="text"
                            icon={HiSearch}
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(event) => { setSearchQuery(event.target.value) }} />
                    </div>

                    <div className="flex md:order-2">
                        
                        <Navbar.Toggle />
                    </div>

                    <Navbar.Collapse>
                        {showCalendrierLink ? (
                            <Link
                                to="/calendrier"
                                onClick={() => setShowCalendrierLink(false)}
                            >
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3 hover:text-blue-800 dark:hover:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        ) : (
                            <Link
                                to="/ads-list"
                                onClick={() => setShowCalendrierLink(true)}
                            >
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        )}
                        <Link to="/fichiers">
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3 hover:text-blue-800 dark:hover:text-blue-800"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd"/>
                            </svg>
                        </Link>
                        <Link to="/ajouter-annonce">
                            <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative flex gap-2 p-1 mt-2'>
                                <span className="relative text-white m-1">ajout annonce</span> <span>
                                    <MdAddToPhotos className="relative text-white h-5 w-5" />
                                </span>
                            </span>
                        </Link>
                        <Link to="/chat">
                            <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3 hover:text-blue-800 dark:hover:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.616l-2.88 2.592C8.537 20.461 7 19.776 7 18.477V17H5a2 2 0 0 1-2-2V6Zm4 2a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2H7Zm8 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm5 0a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z" clip-rule="evenodd"/>
                            </svg>
                        </Link>
                        <div>
                            <MegaMenu.Dropdown
                                toggle={<>
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3 hover:text-blue-800 dark:hover:text-blue-800"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                </>}
                            >
                                <div className="flex justify-center">
                                    <ListGroup className="w-48">
                                        <ListGroup.Item>
                                            <Link to="/mes-annonces">
                                                Mes annonces
                                            </Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                        <Link to="/mes-inscriptions">
                                                Mes inscriptions
                                            </Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Link to="/gestion-utilisateurs">
                                                Gestion utilisateurs
                                            </Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                        <Link to="/mon-compte">
                                                Fermeture de compte
                                            </Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <p>
                                                Déconnexion
                                            </p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </MegaMenu.Dropdown>
                        </div>
                    </Navbar.Collapse>
                </Navbar>

                    <Navbar fluid rounded className="w-screen sm:hidden">
                        <Navbar.Brand className="bg-white p-5">
                            
                            <div className="mt-2 flex gap-4 w-full justify-center">
                                <Link to="/ads-list">
                                    <img src={Logo} alt="logo ParLink" className="flex mr-32 h-7 sm:h-9 scale-150" />
                                </Link>
                                <Link to="/annonces">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white scale-150 hover:text-blue-800 dark:hover:text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Z" clip-rule="evenodd"/>
                                    </svg>
                                </Link>  
                                {showCalendrierLink ? (
                                    <Link
                                        to="/calendrier"
                                        onClick={() => setShowCalendrierLink(false)}
                                    >
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white scale-150 hover:text-blue-800 dark:hover:text-blue-800"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link
                                        to="/ads-list"
                                        onClick={() => setShowCalendrierLink(true)}
                                    >
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white scale-150 hover:text-blue-800 dark:hover:text-blue-800"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                )}
                                <Link to="/fichiers">
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white scale-150 hover:text-blue-800 dark:hover:text-blue-800"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd"/>
                                    </svg>
                                </Link>
                                <Link to="/carte">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white scale-150 hover:text-blue-800 dark:hover:text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
                                    </svg>
                                </Link>
                            </div>
                        </Navbar.Brand>
                    </Navbar>
            </div>
            : <Navigate to="/" />
            }
        </>
    )
}