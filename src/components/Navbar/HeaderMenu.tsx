import { Link } from 'react-router-dom';

const DropdownMenu = () => {
    return (
        <div className='flex flex-row justify-around items-center gap-2 my-6 border-b-2 py-4 font-bodyTest'>
            <div className="event_filter_wrapper">
                <div className="relative group">
                    <button className="flex active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800">
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <span className='flex active:relative active:text-white hover:relative hover:text-white'>
                                Toutes
                            </span>
                        </span>
                    </button>
                </div>
            </div>            
            <div className="event_filter_wrapper">
                <div className="relative group">
                    <button className="flex active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800">
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <span className='flex active:relative active:text-white hover:relative hover:text-white'>
                                Covoiturage
                            </span>
                        </span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Musées et centres d'exposition</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Zoos et aquariums</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Parcs et jardins</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Camps de vacances</Link>
                    </div>
                </div>
            </div>
            <div className="event_filter_wrapper">
                <div className="relative group">
                    <button className="flex active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800">
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <span className='flex active:relative active:text-white hover:relative hover:text-white'>
                                Soutien
                            </span>
                        </span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Mathématiques</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Enseignement moral et civique</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Histoire-géographie</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Technologie</Link>
                    </div>
                </div>
            </div>
            <div className="event_filter_wrapper">
                <div className="relative group">
                    <button className="flex active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800">
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <span className='flex active:relative active:text-white hover:relative hover:text-white'>
                                Garderie
                            </span>
                        </span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">La garde à domicile partagée</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">La crèche familiale</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">L'assistante maternelle</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">La garde à domicile</Link>
                    </div>
                </div>
            </div>
            <div className="event_filter_wrapper">
                <div className="relative group">
                    <button className="flex active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800">
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <span className='flex active:relative active:text-white hover:relative hover:text-white'>
                                Sorties
                            </span>
                        </span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Piscine</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Promenade</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Ressources</Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Parc</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownMenu;