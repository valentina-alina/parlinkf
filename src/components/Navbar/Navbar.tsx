/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ListGroup, MegaMenu, Navbar, TextInput } from "flowbite-react";
import { Link, Navigate } from 'react-router-dom';
import { MdAddToPhotos } from "react-icons/md";
import Logo from '../../assets/logo.png';
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../services/api/user";


interface CustomPayLoad {
  role?: string;
  userId?: string;
}

interface UserName {
  firstName: string;
  lastName: string
}

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function NavbarComponent({ searchQuery, setSearchQuery }: NavbarProps) {

  const [showCalendrierLink, setShowCalendrierLink] = useState(true);

  const auth = { token: true };
  const [isAdmin, setIsAdmin] = useState(false);
  console.log('isAdmin', isAdmin)
  const [role, setRole] = useState<string>("");
  console.log('role', role)
  const userIdentity = {
    firstName: "",
    lastName: ""
  };

  const [userName, setUsername] = useState<UserName>(userIdentity);
  console.log('userName', userName)

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    localStorage.removeItem('access_token');
    location.href = "/";
  };

  useEffect(() => {
    const load = async () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        const tokenDecode = jwtDecode<CustomPayLoad>(access_token);
        const decodedRole = tokenDecode.role ?? "";
        setRole(decodedRole);

        if (decodedRole === 'admin') {
          setIsAdmin(true);
        }

        if (tokenDecode.userId) {
          try {
            const user = await getUserById(tokenDecode.userId);
            if (user) {
              const userIdentity = {
                firstName: user.data.data.firstName,
                lastName: user.data.data.lastName,
              };
              setUsername(userIdentity);
            } else {
              setUsername({ firstName: "", lastName: "" });
            }
          } catch (error) {
            console.error('Erreur lors du chargement des donnes utilisateur:', error);
          }
        }
      }
    };
    load();

  }, []);

  return (
    <>

      {/* Conditionner l'affichage des trois liens si l'on n'est pas connecté */}
      {auth.token
        ?

        <div className="fixed top-0 start-0 z-50 flex justify-between w-full p-4  bg-white dark:bg-gray-700 dark:border-gray-600">
          <Navbar fluid rounded className="z-100 hidden sm:block w-full">
            <div className="flex z-100 w-full gap-2">
              <div className="basis-1/8 flex justify-start ">
                <Link to="/ads-grid" className="w-full content-center" >
                  <img src={Logo} alt="logo ParLink" className="h-10 w-full "  />
                </Link>
              </div>
              <div className="basis-1/4">

                <div className="m-2 ">
                  <TextInput
                    className="w-full"
                    id="search"
                    type="text"
                    icon={HiSearch}
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />

                </div>
              </div>
              <div className="basis-2/4 grow flex justify-end ">

                <Navbar.Collapse>
                  {showCalendrierLink ? (
                    <Link
                      to="/calendar"
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
                      to="/ads-grid"
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
                  <Link to="/files">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white scale-125 mt-3 hover:text-blue-800 dark:hover:text-blue-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path fillRule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <Link data-cy="create-ad" to="/new-ad">
                    <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative flex gap-2 p-1 mt-2'>
                      <span className="relative text-white m-1">ajout annonce </span> <span>
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
                      <path fillRule="evenodd" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.616l-2.88 2.592C8.537 20.461 7 19.776 7 18.477V17H5a2 2 0 0 1-2-2V6Zm4 2a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2H7Zm8 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm5 0a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <div className="z-100">
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
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </>}
                    >
                      <div className="z-100 flex justify-center">
                        <ListGroup className="w-48">
                          <ListGroup.Item>
                            {userName.firstName + ' ' + userName.lastName + '-' + role}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Link to="/edit-password-page">
                              Changer mot de passe
                            </Link>
                          </ListGroup.Item>

                          {/* FIXME: gerer le role admin: visible si role = admin dans token */}
                          {/* {isAdmin && ( */}
                          <ListGroup.Item>
                            <Link to="/users-handling">
                              Gestion utilisateurs
                            </Link>
                          </ListGroup.Item>
                          {/* // ) } */}
                          <ListGroup.Item>
                            <Link to="/my-account">
                              Mon compte
                            </Link>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Link to="#" onClick={handleLogout} >
                              Déconnexion
                            </Link>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </MegaMenu.Dropdown>
                  </div>
                </Navbar.Collapse>
              </div>
            </div>

          </Navbar>
          <Navbar fluid rounded className=" z-100 w-full sm:hidden">
            <Navbar.Brand className="bg-white w-full flex justify-center items-center">
              <div className="my-2 flex w-full justify-center">
                <div className="w-2/3">
                  <Link to="/ads-grid ">
                    <img src={Logo} alt="logo ParLink" className="h-7 sm:h-9" />
                  </Link>
                </div>
                <div className="flex flex-1">
                  {showCalendrierLink ? (
                    <Link className=" flex-1"
                      to="/calendar"
                      onClick={() => setShowCalendrierLink(false)}
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-800 dark:hover:text-blue-800"
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
                    <Link className=" flex-1"
                      to="/ads-grid"
                      onClick={() => setShowCalendrierLink(true)}
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-800 dark:hover:text-blue-800"
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
                  <Link className=" flex-1" to="/files">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-800 dark:hover:text-blue-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path fillRule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <Link className=" flex-1" to="/map">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-800 dark:hover:text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Navbar.Brand>
            <div className="w-full ">
              <TextInput
                className="w-full"
                id="search"
                type="text"
                icon={HiSearch}
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </Navbar>


        </div>
        : <Navigate to="/" />
      }
    </>
  )
}