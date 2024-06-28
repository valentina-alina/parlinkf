/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Carousel, Label } from "flowbite-react";
// import fakerAdsList from './fakerAdsList';
import fakerCategories from './fakerCategories';
import { HiViewList } from "react-icons/hi";
import { MdOutlineApps } from "react-icons/md";
import MapButton from '../../components/Map/MapButton';
import { CiEdit } from "react-icons/ci";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAds } from '../../services/api/ads';
import { MapProvider } from '../../providers/MapProvider';
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { HiPencilAlt } from "react-icons/hi";
import MapConfig from '../../services/utils/MapConfig';

type Category = typeof fakerCategories[number]['name'];

const initialCategoryCounts: Record<Category, number> = {
    all: 0,
    poolcar: 0,
    tutoring: 0,
    childcare: 0,
    events: 0,
};

export default function AdsListPage(props: any) {
    const searchQueryFromNavbar = props.searchQuery;

    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [adsList, setAdsList] = useState<any[]>([]);
    const [categoryCounts, setCategoryCounts] = useState(initialCategoryCounts);

    useEffect(() => {
        fetchAds();
    }, []);

    useEffect(() => {
        
        fetchInitialItems();
    }, [selectedCategories, adsList]);


    const fetchAds = async () => {
        const ads = await getAds();
        setAdsList(ads);
        updateCategoryCounts(ads);
        fetchInitialItems();
    };

    const fetchInitialItems = () => {
        
        const filteredAds = adsList.filter((ad) => {
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
            const matchesSearchQueryFromNavbar =
                !searchQueryFromNavbar ||
                ad.title.toLowerCase().includes(searchQueryFromNavbar.toLowerCase()) ||
                ad.city.toLowerCase().includes(searchQueryFromNavbar.toLowerCase());
            return matchesCategory && matchesSearchQueryFromNavbar;
        });

        setItems(filteredAds.slice(0, 10));
        setHasMore(filteredAds.length > 10);
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

    const fetchMoreData = () => {
        
        const currentLength = items.length;
        const filteredAds = adsList.filter((ad) => {
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
            const matchesSearchQueryFromNavbar =
                !searchQueryFromNavbar ||
                ad.title.toLowerCase().includes(searchQueryFromNavbar.toLowerCase()) ||
                ad.city.toLowerCase().includes(searchQueryFromNavbar.toLowerCase());
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
    const mapConfig = new MapConfig();
    return (
        <>
            <div className='flex flex-row justify-around items-center gap-4 my-6 border-b-2 py-4 font-bodyTest'>
                {fakerCategories.map((category) => (
                    <div className="event_filter_wrapper relative group" key={category.id}>
                        <div className='relative'>
                            <Link
                                to=""
                                onClick={() => handleCategoryChange(category.name as Category)}
                                className='flex active:ring focus:outline-none focus:border-b-2 focus:border-b-blue-800'
                            >
                                <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                                    <Label
                                        htmlFor={category.name}
                                        className={`flex ${selectedCategories.includes(category.name as Category) ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-lg'} ${isAllSelected ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-lg'}`}
                                    >
                                        {category.label}
                                    </Label>
                                </span>
                            </Link>
                        </div>
                        {category.group && (
                            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                {category.group.map((item) => (
                                    <Link
                                        key={item.id}
                                        to=""
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 hover:text-white'
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <p className={`${selectedCategories.includes(category.name as Category) || isAllSelected ? 'font-bold text-sm text-center' : 'font-light text-sm text-center'}`}>
                            {categoryCounts[category.name as Category]}
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

<div className="grid grid-cols-1 mb-2
            ">
                <Carousel>
                    {items.map((event) => (
                        <div key={event.id} className="relative h-64 md:h-96">
                            <div 
                                className="absolute inset-0 flex items-end justify-end p-5 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${event.adPicture})` }}
                            >
                                <Link to={`/annonce/${event.id}`} className="link">
                                    <div className="p-3 bg-gray-500 bg-opacity-50 text-white">
                                        <b>{event.start}</b><br />
                                        <i>{event.title}</i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Chargement...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>La liste est complète!</b>
                    </p>
                }
            >            
                <div className='md:flex flex-wrap justify-between item-center gap-2'>
                    {items
                        .filter((event) => {
                            if (searchQueryFromNavbar === '') { return event; }
                            else if (event.title.toLowerCase().includes(searchQueryFromNavbar.toLowerCase()) || event.city.toLowerCase().includes(searchQueryFromNavbar.toLowerCase())) { return event }
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
                                        <div >
                                        {/* <img src={event.adPicture} alt="Ad Image" className="w-96 h-40 sm:w-80 sm:h-30 ml-3" />
                                         */}
                                <MapProvider>
                                    <div className="w-96 sm:w-full flex justify-center items-center">
                                        <GoogleMap
                                            mapContainerStyle={mapConfig.defaultMapContainerStyle('20vh','20vh')}
                                            center={mapConfig.defaultMapCenterAdDetail({lat :46.66666554540158 , lng :0.3675645320510029})}
                                            zoom={mapConfig.defaultMapZoom(18)}
                                            options={mapConfig.defaultMapOptions(true,0,'auto','satellite')}
                                        >
                                            <MarkerF position={mapConfig.defaultMapCenterAdDetail({lat :46.66666554540158 , lng :0.3675645320510029})}>
                                            </MarkerF>
                                        </GoogleMap>
                                    </div>
                                </MapProvider>
                                        </div> 
                                    </div>
                            
                                </Link>
                            </Card>
                    ))}
                </div>
            </InfiniteScroll>
            <MapButton />
        </>
    );
}