/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAds, getAdsByParams, getCategories, getSubCategories } from '../../services/api/ads';
import MapButton from '../../components/Map/MapButton';
import Sidebar from '../../components/Calendar/Sidebar';
import FullCalendar from '../../components/Calendar/FullCalendar';
import { EventInput } from '@fullcalendar/core';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput } from 'flowbite-react';
// import fakerCategories from '../Ads/fakerCategories';
import { HiSearch } from "react-icons/hi";
import { debounce } from '../../services/utils/debounce';

type Category = string;

export default function CalendarPage({ searchQuery }: { searchQuery: string }) {
    const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [adsList, setAdsList] = useState<any[]>([]);
    const [showWeekNumbers, setShowWeekNumbers] = useState(true);
    const [mobileView, setMobileView] = useState(false);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Record<Category, string[]>>({});

    useEffect(() => {
        fetchAds();
        fetchCategories();
    }, []);

    useEffect(() => {        
        fetchFilteredAds();
    }, [selectedCategories, localSearchQuery, searchQuery]);

    useEffect(() => {
        const handleResize = () => {
            setShowWeekNumbers(window.innerWidth >= 640);
            setMobileView(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchAds = async () => {
        const ads = await getAds();
        setAdsList(ads);
    };

    const fetchFilteredAds = async () => {
        try {
            const query = localSearchQuery || searchQuery || '';
            const response = await getAdsByParams(query);

            const ads = response.data.ads;

            if (!Array.isArray(ads)) {
                console.error('Attendait une liste d\'annonces mais a reçu:', ads);
                return;
            }

            const adsWithParsedDates = ads.map((ad: any) => ({
                ...ad,
                startTime: new Date(ad.startTime),
                endTime: new Date(ad.endTime),
            }));

            setAdsList(adsWithParsedDates);
        } catch (error) {
            console.error('Erreur lors de la récupération des annonces:', error);
        }
    };

    const filteredEvents = adsList.filter((ad: any) => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
        const matchesSearchQueryFromNavbar = !searchQuery || ad.title.toLowerCase().includes(searchQuery.toLowerCase()) || ad.city.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocalSearchQuery = !localSearchQuery || ad.title.toLowerCase().includes(localSearchQuery.toLowerCase()) || ad.city.toLowerCase().includes(localSearchQuery.toLowerCase());
        return matchesCategory && matchesSearchQueryFromNavbar && matchesLocalSearchQuery;
    });

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
                console.warn(`Unexpected subcategories response for ${category}:`, response);
                // Handle the case where the response is an empty array or not as expected
                setSubCategories((prevSubCategories) => ({
                    ...prevSubCategories,
                    [category]: [],
                }));
            }
        } catch (error) {
            console.error(`Error fetching subcategories for ${category}:`, error);
            // Handle the error case by setting the subcategories to an empty array
            setSubCategories((prevSubCategories) => ({
            ...prevSubCategories,
            [category]: [],
            }));
        }
    };

    const debouncedHandleSearchChange = useCallback(debounce((query: string) => {
        setLocalSearchQuery(query);
    }, 500), []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        debouncedHandleSearchChange(value);
    };

    const eventInputs: EventInput[] = filteredEvents.map((event: any) => ({
        id: String(event.id),
        title: event.title,
        start: event.startTime,
        end: event.endTime,
    }));

    const navigate = useNavigate();

    const handleEventClick = (eventClickInfo: any) => {
        const eventId = eventClickInfo.event.id;
        navigate(`/annonce/${eventId}`);
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            const fetchedCategories = response.data.categories;

            setCategories(fetchedCategories);
            console.log('Fetched categories:', fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <>
            <div className='flex flex-row justify-around items-center gap-4 my-6 border-b-2 py-4 font-bodyTest'>
                {categories?.map((category) => (
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
                                        className={`flex ${selectedCategories.includes(category) ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg'} ${isAllSelected ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg'}`}
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
                <div className={`w-full ${mobileView ? 'p-0' : ''}`}>
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
                <MapButton />
            </div>
        </>
    );
}