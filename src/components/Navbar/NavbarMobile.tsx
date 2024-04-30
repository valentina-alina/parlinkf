/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Navbar } from "flowbite-react";
import { Link, Navigate} from 'react-router-dom';
import Logo from '../../assets/logo.png'
import { useEffect, useState } from "react";
import { NavPageInterface } from "../../services/interfaces/NavPageInterface";
import { getPageByTitle } from "../../services/api/navPage";

export default function NavbarMobile() {
    
    const auth = { token: true};
    
    const [ navPages, setNavPages ] = useState<any>();
    useEffect(() => {

        const loadNavPages = async() => {
            const listNavpage = await getPageByTitle();
            setNavPages(listNavpage);
        }

        loadNavPages();

    }, [])

    return(
        <>
            {/* Conditionner l'affichage des trois liens si l'on n'est pas connecté */}
            {auth.token
            ?
            
            <div>
                <Navbar fluid rounded>
                    <Navbar.Brand href="https://flowbite-react.com">
                        <Link to="">
                            <img src={Logo} alt="logo ParLink" className="mr-3 h-6 sm:h-9" />
                        </Link>
                    </Navbar.Brand>
                    <div className="flex md:order-2">
                        <Button>Get started</Button>
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <Link to="">
                        Home
                        </Link>
                        <Link to="">{navPages.title}</Link>
                        <ul>
                            { navPages?.map((navPage:NavPageInterface) => (
                                <li key={navPage.id}>
                                    <div>{navPage.title} </div>
                                </li>
                            ))}
                        </ul>
                        <Link to="">Services</Link>
                        <Link to="">Pricing</Link>
                        <Link to="">Contact</Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            : <Navigate to="/" />
            }
        </>
    )
}