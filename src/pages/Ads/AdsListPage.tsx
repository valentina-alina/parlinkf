/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Carousel, Label, TextInput } from "flowbite-react";
import fakerAdsList from './fakerAdsList';
import fakerCategories from './fakerCategories';
import { HiViewList } from "react-icons/hi";
import { MdOutlineApps } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";

type Category = typeof fakerCategories[number]['name'];

const list = fakerAdsList;

export default function AdsListPage(props: any) {
    const searchQueryFromNavbar = props.searchQuery;
    const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);

    const initialCategoryCounts: Record<Category, number> = {
        all: 0,
        poolcar: 0,
        tutoring: 0,
        childcare: 0,
        events: 0,
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchQuery(event.target.value);
    };

    const filteredAds = list.filter((ad) => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
        const matchesSearchQueryFromNavbar = !searchQueryFromNavbar || ad.title.toLowerCase().includes(searchQueryFromNavbar.toLowerCase()) || ad.city.toLowerCase().includes(searchQueryFromNavbar.toLowerCase());
        const matchesLocalSearchQuery = !localSearchQuery || ad.title.toLowerCase().includes(localSearchQuery.toLowerCase()) || ad.city.toLowerCase().includes(localSearchQuery.toLowerCase());
        return matchesCategory && matchesSearchQueryFromNavbar && matchesLocalSearchQuery;
    });

    const categoryCounts = list.reduce((acc, ad) => {
        const category = ad.category as Category;
        acc[category] = (acc[category] || 0) + 1;
        acc['all'] = (acc['all'] || 0) + 1;
        return acc;
    }, { ...initialCategoryCounts });

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
                                        className={`flex ${selectedCategories.includes(category.name as Category) ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg' : 'flex active:relative active:text-white hover:relative hover:text-whit text-xs sm:text-lg'} ${isAllSelected ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg'}`}
                                    >
                                        {category.label}
                                    </Label>
                                </span>
                            </Link>
                        </div>
                        {category.group && (
                            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-hidden'>
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
                !filteredAds || filteredAds.length === 0 ? (
                    <>
                        <p className='font-bodyTest text-2xl mt-28 italic text-orange-500'>Nous n'avons pas trouvé d'évènement.</p>
                    </>
                ) : (
                    <h2 className="font-titleTest text-3xl my-14">Fil des annonces : {filteredAds.length}</h2>
                )
            }
            

            <div className="sm:hidden w-50 my-16">
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

            <div className="grid h-40 grid-cols-1 gap-4 sm:h-40 md:h-56">
                <Carousel slide={false}>
                    {filteredAds.map((event) => (
                        <div key={event.id} className={"p-5 flex h-full w-full lg:items-start items-end justify-end bg-gray-400 dark:bg-gray-700 bg-center bg-cover bg-no-repeat dark:text-white bg-[url('/src/assets/" + event.imageUrl + "')]"} >
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
                            <Link to={`/edit-annonce/${event.id}`} className="link text-red-800 text-bodyTest">
                                <CiEdit />
                            </Link>
                            <div className='flex flex-col'>
                                <b>
                                    {event.title}
                                </b>
                                <i className='tracking-wider'>{event.start}</i>
                                <i className='flex justify-between items-center'>
                                    {event.city} <span className='text-blue-700 font-bold'> Nbp {event.attendees}</span>
                                </i>
                                <img src={event.imageUrl} alt="Ad Image" className="w-96 h-40 md:w-80 mt-2" />
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