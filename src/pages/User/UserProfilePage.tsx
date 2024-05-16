import { Button, Modal, Card, ListGroup } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function UserProfilePage() {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button.Group className="flex justify-center items-center ml-5 sm:ml-0">
                <Button color="gray" className="sm:w-96">
                    <HiUserCircle className="mr-3 h-4 w-4" />
                    <Link to="/editer-mon-profil">
                        À propos de vous
                    </Link>
                </Button>
                <Button color="gray" className="sm:w-96 bg-blue-700 text-white -z-10" disabled>
                    <HiAdjustments className="mr-3 h-4 w-4" />
                    Mon compte
                </Button>
            </Button.Group>

            <div className="flex justify-center items-center scale-90 sm:scale-100">
                <Card className="w-96 bg-gray-50 shadow-lg m-24 scale-125 justify-center items-center">
                        <ListGroup className="w-80 ml-4 sm:ml-0">
                            <ListGroup.Item onClick={() => alert('Déposer une annonce!')} >
                                Déposer une annonce <span className="ml-20"> &gt;</span>
                            </ListGroup.Item>
                            <ListGroup.Item onClick={() => alert('Mes annonces!')} >Voir mes annonces <span className="ml-24"> &gt;</span></ListGroup.Item>
                            <ListGroup.Item onClick={() => alert('Mes inscriptions!')} >Voir mes inscriptions <span className="ml-20"> &gt;</span></ListGroup.Item>
                        </ListGroup>

                    <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative mt-4 w-75 sm:w-full p-1 ml-7 sm:ml-0 flex justify-center items-center'>

                        <Button className="bg-blue-700" onClick={() => setOpenModal(true)}>
                            <span className="relative text-white">Fermer mon compte</span>
                        </Button>
                    </span>

                    <Modal className="mr-3 sm:mr-0 font-bodyTest" dismissible show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Fermeture de compte</Modal.Header>
                        <Modal.Body>
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <div className="space-y-6">
                                <h3 className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">
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
                </Card>
            </div>
        </>
    )
}