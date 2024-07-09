import { Link } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";
// import Earth from '../../components/Map/earth'

export default function MapButton() {
    return (
        <>
            <div className="fixed bottom-1 left-1/2 z-50 px-2 content-center rounded bg-orange-400 max-sm:hidden py-2">
                <Link data-cy="map" className='text-md flex gap-2 content-center items-center text-white' to="/carte">Voir sur la carte
                    {/* <div className='flex justify-center items-center ml-28'>
                        <Earth />
                    </div> */}
                    <FaMapMarkedAlt className='h-6 w-6' />
                </Link>
            </div>
        </>
    )
}