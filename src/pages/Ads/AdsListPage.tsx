import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Carousel, Label, TextInput } from "flowbite-react";
import fakerCategories from './fakerCategories';
import { HiViewList, HiSearch } from "react-icons/hi";
import { MdOutlineApps } from "react-icons/md";
import MapButton from '../../components/Map/MapButton';
import { CiEdit } from "react-icons/ci";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAds, getAdsByParams } from '../../services/api/ads';

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
    const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [adsList, setAdsList] = useState<any[]>([]);
    const [categoryCounts, setCategoryCounts] = useState(initialCategoryCounts);

    const [role, setRole] = useState('');

    useEffect(() => {
      // Get the role from localStorage
      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        setRole(storedRole);
      }
    }, []);

    useEffect(() => {
        fetchAds();
    }, []);

    useEffect(() => {
        fetchFilteredAds();
    }, [selectedCategories, localSearchQuery, searchQueryFromNavbar]);

    const fetchAds = async () => {
        const ads = await getAds();
        setAdsList(ads);
        updateCategoryCounts(ads);
        fetchInitialItems(ads);
    };

    const fetchFilteredAds = async () => {
        if (localSearchQuery || searchQueryFromNavbar) {
            const query = localSearchQuery || searchQueryFromNavbar || '';
            const ads = await getAdsByParams(query);
            fetchInitialItems(ads);
        } else {
            fetchInitialItems(adsList);
        }
    };

    const fetchInitialItems = (ads: any[]) => {
        const filteredAds = ads.filter((ad) => {
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
            const matchesSearchQueryFromNavbar =
                !searchQueryFromNavbar ||
                ad.title.toLowerCase().includes(searchQueryFromNavbar.toLowerCase()) ||
                ad.city.toLowerCase().includes(searchQueryFromNavbar.toLowerCase());
            const matchesLocalSearchQuery =
                !localSearchQuery ||
                ad.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
                ad.city.toLowerCase().includes(localSearchQuery.toLowerCase());
            return matchesCategory && matchesSearchQueryFromNavbar && matchesLocalSearchQuery;
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchQuery(event.target.value);
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
            const matchesLocalSearchQuery =
                !localSearchQuery ||
                ad.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
                ad.city.toLowerCase().includes(localSearchQuery.toLowerCase());
            return matchesCategory && matchesSearchQueryFromNavbar && matchesLocalSearchQuery;
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
        localStorage.getItem('refreshToken')
    
    };

    return (
        <>
            <div className='flex flex-row justify-around items-center gap-4 mb-4 border-b-2 py-4 font-bodyTest'>
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

            <h2 className="font-titleTest text-xl  sm:text-2xl mb-4"> {role} Fil d'annonces : {items.length}</h2>

            <div className="sm:hidden w-50 my-4">
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

            {items.length === 0 ? (
                <>
                    <p className='font-bodyTest text-2xl mt-28 italic text-orange-500'>Nous n'avons pas trouvé d'évènement.</p>
                </>
            ) : (
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
                        {items.map((event) => (
                            <Card key={event.id} className='my-4 shadow-lg'>
                                <Link to={`/annonce/${event.id}`} className="link text-blue-800 text-bodyTest">
                                   {/* FIXME: afficher edit que pour mes annonces ou enlever 'ici et mettre sur la page mes annonces */}
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
                                        <img src={event.adPicture} alt="Ad Image" className="w-96 h-40 md:w-80 mt-2" />
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </InfiniteScroll>
            )}
            <MapButton />
        </>
    );
}
