import { Button, Modal, Card } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function UserProfilePage() {

    const [openModal, setOpenModal] = useState(true);

    return (
        <>
            <h1 className="text-2xl mb-8 font-h1">Compte</h1>

            <div className="flex justify-center items-center">
                <Card className="w-96 bg-gray-50 shadow-lg m-8">
                    <div>
                        <ul>
                            <li><a href="">Déposer une annonce <span>&gt;</span></a></li>
                            <li><a href="">Voir mes annonces <span>&gt;</span></a></li>
                            <li><a href="">Voir mes inscriptions <span>&gt;</span></a></li>
                        </ul>
                    </div>

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
                </Card>
            </div>
        </>
    )
}