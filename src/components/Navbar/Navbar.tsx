"use client";
import { Button, ListGroup, MegaMenu,Navbar, TextInput } from "flowbite-react";
import { Link, Navigate} from 'react-router-dom';
import { MdAddToPhotos } from "react-icons/md";
import Logo from '../../assets/logo.png';
import { HiSearch } from "react-icons/hi";

export default function NavbarComponent(){

    const auth = { token: true};

    return(
        <>
            {/* Conditionner l'affichage des trois liens si l'on n'est pas connecté */}
            {auth.token
            ?
            
            <div className="scale-110 mb-60 flex justify-center items-center">
                <Navbar fluid rounded>
                    
                    <Navbar.Brand>
                        <Link to="">
                            <img src={Logo} alt="logo ParLink" className="mr-3 h-6 sm:h-9 scale-150" />
                        </Link>
                    </Navbar.Brand>

                    <div className="max-w-md ml-16 mr-16">
                        <TextInput className="w-96" id="search" type="search" icon={HiSearch} placeholder="Rechercher..." />
                    </div>

                    <div className="flex md:order-2">
                        
                        <Navbar.Toggle />
                    </div>

                    <Navbar.Collapse>
                        <Link to="/calendrier">
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                            </svg>
                        </Link>
                        <Link to="/fichiers">
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3"
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
                            <Button>
                                ajout annonce <MdAddToPhotos className="mt-1 ml-1" />
                            </Button>
                        </Link>
                        <Link to="/chat">
                            <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3"
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
                                        className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3"
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
            </div>
            : <Navigate to="/" />
            }
        </>
    )
}