/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Carousel, Label } from "flowbite-react";
import { HiViewList } from "react-icons/hi";
import { MdOutlineApps } from "react-icons/md";
import MapButton from '../../components/Map/MapButton';
import { CiEdit } from "react-icons/ci";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAds, getAdsByParams, getCategories, getSubCategories } from '../../services/api/ads';
import { MapProvider } from '../../providers/MapProvider';
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import MapConfig from '../../services/utils/MapConfig';
import { ThreeDots } from 'react-loader-spinner';

type Category = string;

const initialCategoryCounts: Record<Category, number> = {
    all: 0,
};

export default function AdsListPage({ searchQuery }: { searchQuery: string }) {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [adsList, setAdsList] = useState<any[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryCounts, setCategoryCounts] = useState(initialCategoryCounts);
    const [subCategories, setSubCategories] = useState<Record<Category, string[]>>({});

    useEffect(() => {
        fetchAds();
        fetchCategories();
    }, []);

    useEffect(() => {        
        fetchFilteredAds();
    }, [selectedCategories, searchQuery]);


    const fetchAds = async () => {
        const ads = await getAds();
        setAdsList(ads);
        updateCategoryCounts(ads);
        fetchInitialItems(ads);
    };

    const fetchFilteredAds = async () => {
        try {
            const query = searchQuery || '';
            const response = await getAdsByParams(query);

            const ads = response.data.ads;

            if (!Array.isArray(ads)) {
                console.error('Attendait une liste d\'annonces mais a reçu:', ads);
                return;
            }

            fetchInitialItems(ads);
        } catch (error) {
            console.error('Erreur lors de la récupération des annonces:', error);
        }
    };

    const fetchInitialItems = (ads: any[]) => {        
        const filteredAds = ads.filter((ad) => {
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
            const matchesSearchQueryFromNavbar =
                !searchQuery ||
                ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ad.city.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearchQueryFromNavbar;
        });

        setItems(filteredAds.slice(0, 6));
        setHasMore(filteredAds.length > 6);
    };

    const handleCategoryChange = (category: Category) => {
        if (category === 'all') {
            setSelectedCategories([]);
            setIsAllSelected(true);
        } else {
            setIsAllSelected(false);
            setSelectedCategories((prevCategories) =>
                prevCategories.includes(category)
                ? prevCategories.filter((c) => c !== category)
                : [...prevCategories, category]
            );
        }
    };

    const handleCategoryHover = async (category: Category) => {
        try {
            const response = await getSubCategories(category);
            if (response && response.data && Array.isArray(response.data.subCategories)) {
                setSubCategories((prevSubCategories) => ({
                ...prevSubCategories,
                [category]: response.data.subCategories,
                }));
            } else {
                console.warn(`Réponse inattendue pour les sous-catégories de la catégorie ${category}:`, response);
                // Handle the case where the response is an empty array or not as expected
                setSubCategories((prevSubCategories) => ({
                    ...prevSubCategories,
                    [category]: [],
                }));
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération des sous-catégories de la catégorie ${category}:`, error);
            // Handle the error case by setting the subcategories to an empty array
            setSubCategories((prevSubCategories) => ({
            ...prevSubCategories,
            [category]: [],
            }));
        }
    };

    const fetchMoreData = () => {        
        const currentLength = items.length;
        const filteredAds = adsList.filter((ad) => {
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
            const matchesSearchQueryFromNavbar =
                !searchQuery ||
                ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ad.city.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearchQueryFromNavbar;
        });

        const nextBatch = filteredAds.slice(currentLength, currentLength + 10);
        if (nextBatch.length === 0) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setItems([...items, ...nextBatch]);
        }, 1500);
    };
    
    const updateCategoryCounts = (ads: any[]) => {
        const counts = ads.reduce((acc, ad) => {
            const category = ad.category as Category;
            acc[category] = (acc[category] || 0) + 1;
            acc['all'] = (acc['all'] || 0) + 1;
            return acc;
        }, { ...initialCategoryCounts });

        setCategoryCounts(counts);
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            const fetchedCategories = response.data.categories;

            setCategories(fetchedCategories);
            console.log('Catégories récupérées:', fetchedCategories);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
        }
    };

    const mapConfig = new MapConfig();

    return (
        <>
            <MapProvider>
                <div className='flex flex-row justify-around items-center gap-4 my-6 border-b-2 py-4 font-bodyTest'>
                    {categories.map((category) => (
                        <div className="event_filter_wrapper relative group" key={category}>
                            <div className='relative'>
                                <Link
                                    to=""
                                    onClick={() => handleCategoryChange(category)}
                                    onMouseEnter={() => handleCategoryHover(category)}
                                    className='flex active:ring focus:outline-none focus:border-b-2 focus:border-b-blue-800'
                                >
                                    <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                                        <Label
                                            htmlFor={category}
                                            className={`flex ${selectedCategories.includes(category) ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-lg'} ${isAllSelected ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-lg'}`}
                                        >
                                            {category}
                                        </Label>
                                    </span>
                                </Link>
                            </div>
                            {subCategories[category] && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg p-2 rounded-md w-60 z-10 hidden group-hover:block">
                                    {subCategories[category].map((subcategory, index) => (
                                        <Link
                                            to=""
                                            key={index}
                                            className="block px-3 py-1 text-sm text-gray-800 hover:bg-blue-700 hover:text-white"
                                        >
                                            {subcategory}
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <p className={`${selectedCategories.includes(category) || isAllSelected ? 'font-bold text-sm text-center' : 'font-light text-sm text-center'}`}>
                                {categoryCounts[category]}
                            </p>
                        </div>
                    ))}
                    <div className='flex justify-end items-center max-sm:hidden'>
                        <Link className='text-blue-800' to="/ads-list">
                            <MdOutlineApps className='w-8 h-8 tex-blue-800' />
                        </Link>
                        <Link className='text-blue-800' to="/ads-list2">
                            <HiViewList className='w-8 h-8' />
                        </Link>
                    </div>
                </div>
                
                {
                    items.length === 0 ? (
                        <>
                            <h2 className="font-titleTest text-3xl my-14">Fil des annonces : {items.length}</h2>
                            <p className='font-bodyTest text-2xl mt-28 italic text-orange-500'>Nous n'avons pas trouvé d'évènement.</p>
                        </>
                    ) : (
                        <h2 className="font-titleTest text-3xl my-14">Fil des annonces : {items.length}</h2>
                    )
                }
                
                <div className="grid h-40 grid-cols-1 gap-4 sm:h-40 md:h-56 ">
                    <Carousel slide={false}>
                    {items.map((event) => (
                        <div key={event.id} className={"p-5 flex h-full w-full lg:items-start items-end justify-end bg-gray-400 dark:bg-gray-700 bg-center bg-cover  bg-no-repeat dark:text-white bg-[url('/src/assets/" + event.adPicture + "')]"}>
                        <Link to={`/annonce/${event.id}`} className="link">
                            <div className="p-3 bg-gray-500 bg-opacity-50 text-white">
                            <b>{event.start}</b><br />
                            <i>{event.title}</i>
                            </div>
                        </Link>
                        </div>
                    ))}
                    </Carousel>
                </div>
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center items-center w-full">
                            <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#1A56DB"
                            radius="8"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            />
                        </div>
                    }
                    endMessage={
                        <p className='text-center mt-6 text-blue-800'>
                            <b>Fin de la liste!</b>
                        </p>
                    }
                >            
                    <div className='md:flex flex-wrap justify-between item-center gap-2 mt-8'>
                        {items
                            .filter((event) => {
                                if (searchQuery === '') { return event; }
                                else if (event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.city.toLowerCase().includes(searchQuery.toLowerCase())) { return event }
                            })
                            .map((event) => (
                                <Card key={event.id} className='w-full my-4 shadow-lg'>
                                    <Link to={`/annonce/${event.id}`} className="w-full link text-blue-800 text-bodyTest">
                                        <Link to={`/edit-annonce/${event.id}`} className="link text-red-800 text-bodyTest">
                                            <CiEdit />
                                        </Link>
                                        <div className=" grid grid-cols-1 md:grid-cols-3" color="violet-900">
                                            <div className='col-span-2 flex flex-col '>
                                            <p className="text-start text-blue-600 p-1">{event.start}</p>
                                            <p className="text-center p-1"><b >{event.title}</b> </p>
                                            <p className="text-justify visible max-sm:hidden mb-1">{event.description}</p>
                                            <span className="grid grid-cols-2 ">
                                                <i className="text-start">{event.city}</i>
                                                <span className=" text-blue-700 flex gap-1 justify-end items-center font-bold">Nbp: {event.attendees} </span>
                                            </span>
                                            </div>
                                            {/* <div>
                                                <img src={event.adPicture} alt="Ad Image" className="w-96 h-40 sm:w-80 sm:h-30 ml-3" />
                                            </div> */}
                                            <div className="w-96 sm:w-full flex justify-center items-center">
                                                {event.lat && event.lng ? (
                                                    <GoogleMap
                                                        mapContainerStyle={mapConfig.defaultMapContainerStyle('250px','18vh')}
                                                        center={{ lat: Number(event.lat), lng: Number(event.lng) }}
                                                        zoom={mapConfig.defaultMapZoom(18)}
                                                        options={mapConfig.defaultMapOptions(true, 0, 'auto', 'satellite')}
                                                    >
                                                        <MarkerF key={event.id} position={{ lat: Number(event.lat), lng: Number(event.lng) }} />
                                                    </GoogleMap>
                                                ) : (
                                                    <p>Coordinates not available</p>
                                                )}
                                            </div>
                                        </div>
                                
                                    </Link>
                                </Card>
                        ))}
                    </div>
                </InfiniteScroll>
                <MapButton />
            </MapProvider>
        </>
    );
}