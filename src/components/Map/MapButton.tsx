import { Link } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function MapButton() {
    return (
        <>
            <div className="fixed bottom-1 left-1/2 z-50 px-2 content-center rounded bg-orange-400 max-sm:hidden py-2">
                <Link data-cy="map" className='text-md flex gap-2 content-center items-center text-white' to="/map">Voir sur la carte
                    <FaMapMarkedAlt className='h-6 w-6' />
                </Link>
            </div>
        </>
    )
}