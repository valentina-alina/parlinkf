/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { Card, Carousel, Label } from "flowbite-react";
import fakerAdsList from './fakerAdsList';
// import fakerCategories from './fakerCategories';
import { HiViewList } from "react-icons/hi";
import { MdOutlineApps } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useState } from 'react';
import { MdOutlineAllInclusive } from "react-icons/md";

const list = fakerAdsList;

export default function AdsListPage(props: any) {
    const searchQuery = props.searchQuery;

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);

    const handleCategoryChange = (category: string) => {
        if (category === 'all') {
            setSelectedCategories([]);
            setIsAllSelected(true);
        } else {
            setIsAllSelected(false);
            if (selectedCategories.includes(category)) {
                setSelectedCategories(selectedCategories.filter((c) => c !== category));
            } else {
                setSelectedCategories([...selectedCategories, category]);
            }
        }
    };

    const filteredAds = selectedCategories.length > 0
        ? list.filter((ad) => selectedCategories.includes(ad.category))
        : list;

    
    const categoryCounts: { [key: string]: number } = {
        all: list.length,
        poolcar: list.filter(ad => ad.category === 'poolcar').length,
        tutoring: list.filter(ad => ad.category === 'tutoring').length,
        childcare: list.filter(ad => ad.category === 'childcare').length,
        events: list.filter(ad => ad.category === 'events').length
    };

    list.forEach(ad => {
        categoryCounts[ad.category]++;
    });

    return (
        <>
        <h2 className="font-titleTest text-3xl my-8">Fil des annonces : {filteredAds.length}</h2>
        
            <div className='flex flex-row justify-around items-center gap-4 my-6'>
            <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('all')}
                        className='flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800'
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="all"
                                className={`flex ${isAllSelected ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Toutes
                            </Label>
                        </span>
                    </Link>
                    <p className='flex justify-center'>
                        <MdOutlineAllInclusive className={`${isAllSelected ? 'font-bold font-bodyTest text-xl' : 'font-light font-bodyTest text-xl'}`} />
                    </p>
                </div>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('poolcar')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="poolcar"
                                className={`flex ${selectedCategories.includes('poolcar') ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Covoiturage
                            </Label>
                        </span>
                    </Link>
                    <p className={`${selectedCategories.includes('poolcar') ? 'font-bold font-bodyTest text-sm text-center' : 'font-light font-bodyTest text-sm text-center'}`}>
                        {categoryCounts['poolcar']}
                    </p>
                </div>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('tutoring')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="tutoring"
                                className={`flex ${selectedCategories.includes('tutoring') ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Soutien
                            </Label>
                        </span>
                    </Link>
                    <p className={`${selectedCategories.includes('tutoring') ? 'font-bold font-bodyTest text-sm text-center' : 'font-light font-bodyTest text-sm text-center'}`}>
                        {categoryCounts['tutoring']}
                    </p>
                </div>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('childcare')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="childcare"
                                className={`flex ${selectedCategories.includes('childcare') ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Garde enfants
                            </Label>
                        </span>
                    </Link>
                    <p className={`${selectedCategories.includes('childcare') ? 'font-bold font-bodyTest text-sm text-center' : 'font-light font-bodyTest text-sm text-center'}`}>
                        {categoryCounts['childcare']}
                    </p>
                </div>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('events')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="events"
                                className={`flex ${selectedCategories.includes('events') ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Sortie
                            </Label>
                        </span>
                    </Link>
                    <p className={`${selectedCategories.includes('events') ? 'font-bold font-bodyTest text-sm text-center' : 'font-light font-bodyTest text-sm text-center'}`}>
                        {categoryCounts['events']}
                    </p>
                </div>
                <div className='flex justify-end items-center  max-sm:hidden'>
                    <Link className='text-blue-800' to="/ads-list">
                        <MdOutlineApps className='w-8 h-8 tex-blue-800' />
                    </Link>
                    <Link className='text-blue-800' to="/ads-list2">
                        <HiViewList className='w-8 h-8' />
                    </Link>
                </div>
            </div>

            <div className="grid h-40 grid-cols-1 gap-4 sm:h-40 md:h-56 ">
                <Carousel slide={false}>
                {filteredAds.map((event) => (
                    <div key={event.id} className={"p-5 flex h-full w-full lg:items-start items-end justify-end bg-gray-400 dark:bg-gray-700 bg-center bg-cover  bg-no-repeat dark:text-white bg-[url('/src/assets/" + event.imageUrl + "')]"}>
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
            <div className='md:flex flex-wrap justify-between item-center gap-2'>


                {filteredAds
                    .filter((event) => {
                        if (searchQuery === '') { return event; }
                        else if (event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.city.toLowerCase().includes(searchQuery.toLowerCase())) { return event }
                    })
                    .map((event) => (
                        <Card key={event.id} className='w-full my-4 shadow-lg'>
                            <Link to={`/annonce/${event.id}`} className="w-full link text-blue-800 text-bodyTest">
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
                                    <div>
                                    <img src={"/src/assets/" + event.imageUrl} alt="Ad Image" className="w-96 h-40 sm:w-80 sm:h-30 ml-3" />
                                    </div> 
                                </div>
                        
                            </Link>
                        </Card>
                ))}
            </div>
            <div className="fixed bottom-1 left-1/2 z-50 px-2 content-center bg-orange-400 rounded max-sm:hidden py-2">
                <Link className='text-md flex gap-2 content-center items-center text-white' to="/carte">Voir sur la carte
                    <FaMapMarkedAlt className='h-6 w-6' />
                </Link>
            </div>
        </>
    );
}