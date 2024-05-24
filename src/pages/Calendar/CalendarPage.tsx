/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAds } from '../../services/api/ads';
import Sidebar from '../../components/Calendar/Sidebar';
import FullCalendar from '../../components/Calendar/FullCalendar';
import { EventInput } from '@fullcalendar/core';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput } from 'flowbite-react';
import { FaMapMarkedAlt } from "react-icons/fa";
import fakerCategories from '../Ads/fakerCategories';
import { HiSearch } from "react-icons/hi";

type Category = typeof fakerCategories[number]['name'];

export default function CalendarPage(props:any) {
    const [ ads, setAds ] = useState<any>([]);
    console.log('ads', ads);

    useEffect(() => {
        const loadAds = async() => {
            const listAd = await getAds();
            setAds(listAd);
        }

        loadAds();

    }, [])

    const searchQueryFromNavbar = props.searchQuery;
    const [localSearchQuery, setLocalSearchQuery] = useState<string>('');

    const [showWeekNumbers, setShowWeekNumbers] = useState(true);
    const [mobileView, setMobileView] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);



    useEffect(() => {
        const handleResize = () => {
            setShowWeekNumbers(window.innerWidth >= 640);
            setMobileView(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const filteredEvents = ads.filter((ad:any) => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
        const matchesSearchQueryFromNavbar = !searchQueryFromNavbar || ad.title.toLowerCase().includes(searchQueryFromNavbar.toLowerCase()) || ad.city.toLowerCase().includes(searchQueryFromNavbar.toLowerCase());
        const matchesLocalSearchQuery = !localSearchQuery || ad.title.toLowerCase().includes(localSearchQuery.toLowerCase()) || ad.city.toLowerCase().includes(localSearchQuery.toLowerCase());
        return matchesCategory && matchesSearchQueryFromNavbar && matchesLocalSearchQuery;
    });

    const eventInputs: EventInput[] = filteredEvents.map((event:any) => ({
        id: String(event.id),
        title: event.title,
        start: event.start,
        end: event.end,
    }));

    const navigate = useNavigate();

    const handleEventClick = (eventClickInfo: any) => {
        const eventId = eventClickInfo.event.id;
        navigate(`/annonce/${eventId}`);
    };

    return (
        <>
            <div className='flex flex-row justify-around items-center gap-4 my-6 border-b-2 py-4 font-bodyTest'>
                {fakerCategories?.map((category) => (
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
                                        className={`flex ${selectedCategories.includes(category.name as Category) ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg'} ${isAllSelected ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg'}`}
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
                    </div>
                ))}
            </div>

            {
                !filteredEvents || filteredEvents.length === 0 ? (
                    <p className='font-bodyTest text-2xl my-32 italic text-orange-500'>
                        Nous n'avons pas trouvé d'évènement.
                    </p>
                ) : (
                        <h1 className="font-titleTest text-3xl my-14">
                            Calendrier des annonces
                        </h1>
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

            <div className="flex flex-wrap gap-8 overflow-hidden">
                    <div className={`w-full  ${mobileView ? 'p-0' : ''}`}>
                        <FullCalendar
                            mobileView={mobileView}
                            showWeekNumbers={showWeekNumbers}
                            eventInputs={eventInputs}
                            handleEventClick={handleEventClick}
                        />
                    </div>
                    <div className="w-full mt-10 sm:mt-0">
                        <Sidebar
                            events={filteredEvents}
                        />
                    </div>
                    <div className="fixed bottom-1 left-1/2 z-50 px-2 content-center bg-orange-400 rounded max-sm:hidden py-2">
                        <Link className='text-md flex gap-2 content-center items-center text-white' to="/carte">Voir sur la carte
                            <FaMapMarkedAlt className='h-6 w-6' />
                        </Link>
                    </div>
                </div>
        </>
    )
}