import { Button, Modal, Accordion } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';

export default function UserProfilePage() {

    const [openModal, setOpenModal] = useState(true);

    return (
        <>
            <h1 className="text-2xl mb-8 font-h1">Compte</h1>

            <Accordion className="flex justify-center items-center">
                    <Accordion.Panel>
                        <Accordion.Title className="w-44 sm:w-96">
                            <HiUserCircle className="mr-3 h-4 w-4" />
                            À propos de vous
                        </Accordion.Title>
                    </Accordion.Panel>

                    <Accordion.Panel>
                        <Accordion.Title className="w-44 sm:96">
                            <HiAdjustments className="mr-3 h-4 w-4" />
                            Compte
                        </Accordion.Title>
                        <Accordion.Content>
                            {/* <ListGroup className="w-80">
                                <ListGroup.Item onClick={() => alert('Déposer une annonce!')} >
                                    Déposer une annonce <span className="ml-20"> &gt;</span>
                                </ListGroup.Item>
                                <ListGroup.Item onClick={() => alert('Mes annonces!')} >Voir mes annonces <span className="ml-24"> &gt;</span></ListGroup.Item>
                                <ListGroup.Item onClick={() => alert('Mes inscriptions!')} >Voir mes inscriptions <span className="ml-20"> &gt;</span></ListGroup.Item>
                            </ListGroup> */}
                            <p className="mb-2">
                                <Link to="/ajouter-annonce" className="text-lg sm:text-xl mb-2 sm:mb-0 active">Déposer une annonce</Link>
                            </p>
                            <p className="mb-2">
                                <Link to="/mes-annonces" className="text-lg sm:text-xl mb-2 sm:mb-0">Voir mes annonces</Link>
                            </p>
                            <p className="mb-2">
                                <Link to="/mes-inscriptions" className="text-lg sm:text-xl mb-2 sm:mb-0">Voir mes inscriptions</Link>
                            </p>
                            
                            <Button
                                className="flex justify-center items-center"
                                onClick={() => setOpenModal(true)}
                            >
                                Fermer mon compte
                            </Button>
                            
                            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                                <Modal.Header>Fermeture de compte</Modal.Header>
                                <Modal.Body>
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <div className="space-y-6">
                                        <h3 className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center font-h3">
                                        Êtes-vous sûr de vouloir fermer votre compte ?
                                        </h3>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-4">
                                        <Button
                                            color="success"
                                            onClick={() => setOpenModal(false)}
                                        >
                                            Oui
                                        </Button>
                                        <Button
                                            color="failure"
                                            onClick={() => setOpenModal(false)}
                                        >
                                            Non
                                        </Button>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </Accordion.Content>
                    </Accordion.Panel>
            </Accordion>
        </>
    )
}