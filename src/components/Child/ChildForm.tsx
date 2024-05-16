
import { FloatingLabel } from "flowbite-react";

export default function ChildForm(props: Child) {

    return (
        <>
            <div>
            <h5 className="text-1xl font-bold tracking-tight text-blue-600 dark:text-white text-left"> Enfant </h5>
                <FloatingLabel variant="outlined" label="Nom" sizing="sm" />
                <FloatingLabel variant="outlined" label="Prenom" sizing="sm" />
                <FloatingLabel variant="outlined" label="Classe" sizing="sm" />
            </div>
        </>
    )
}


