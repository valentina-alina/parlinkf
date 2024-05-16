/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Carousel, Label, TextInput } from "flowbite-react";
import fakerAdsList from './fakerAdsList';
import { HiViewList } from "react-icons/hi";
import { MdOutlineApps } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";

const list = fakerAdsList;

export default function AdsListPage(props: any) {
    const searchQueryFromNavbar = props.searchQuery;
    const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchQuery(event.target.value);
    };

    const filteredAds = list.filter((ad) => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(ad.category);
        const matchesSearchQueryFromNavbar = !searchQueryFromNavbar || ad.title.toLowerCase().includes(searchQueryFromNavbar.toLowerCase()) || ad.city.toLowerCase().includes(searchQueryFromNavbar.toLowerCase());
        const matchesLocalSearchQuery = !localSearchQuery || ad.title.toLowerCase().includes(localSearchQuery.toLowerCase()) || ad.city.toLowerCase().includes(localSearchQuery.toLowerCase());
        return matchesCategory && matchesSearchQueryFromNavbar && matchesLocalSearchQuery;
    });

    return (
        <>
            <h2 className="font-titleTest text-3xl my-8">Fil des annonces : {filteredAds.length}</h2>

            <div className="sm:hidden w-50">
                <TextInput
                    className="w-80"
                    id="search"
                    type="text"
                    icon={HiSearch}
                    placeholder="Rechercher..."
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className='flex flex-row justify-around items-center gap-4 my-6'>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('poolcar')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="poolcar"
                                className={`flex ${selectedCategories.includes('poolcar') ? 'font-bold  active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Covoiturage
                            </Label>
                        </span>
                    </Link>
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
                                className={`flex ${selectedCategories.includes('tutoring') ? 'font-bold active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Soutien
                            </Label>
                        </span>
                    </Link>
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
                                className={`flex ${selectedCategories.includes('childcare') ? 'font-bold active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Garde enfants
                            </Label>
                        </span>
                    </Link>
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
                                className={`flex ${selectedCategories.includes('events') ? 'font-bold active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Sortie
                            </Label>
                        </span>
                    </Link>
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
                {filteredAds.map((event) => (
                    <Card key={event.id} className='my-4 shadow-lg'>
                        <Link to={`/annonce/${event.id}`} className="link text-blue-800 text-bodyTest">
                            <div className='flex flex-col'>
                                <b>
                                    {event.title}
                                </b>
                                <i className='tracking-wider'>{event.start}</i>
                                <i className='flex justify-between items-center'>
                                    {event.city} <span className='text-blue-700 font-bold'> Nbp {event.attendees}</span>
                                </i>
                                <img src={"/src/assets/" + event.imageUrl} alt="Ad Image" className="w-96 h-40 md:w-80 mt-2" />
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