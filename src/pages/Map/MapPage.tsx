/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { MapProvider } from '../../providers/MapProvider';
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom';
import fakerCategories from '../Ads/fakerCategories';
import { TextInput } from 'flowbite-react';
import { HiSearch } from "react-icons/hi";
import MapConfig from '../../services/utils/MapConfig';
import { debounce } from '../../services/utils/debounce';
import { getAds, getAdsByParams } from '../../services/api/ads';
import { AdWithoutCoordinatesInterface } from '../../services/interfaces/AdWithoutCoordinates';

type Category = typeof fakerCategories[number]['name'];

export default function MapPage({ searchQuery }: { searchQuery: string }) {
    const [adsList, setAdsList] = useState<any[]>([]);
    const [activeMarker, setActiveMarker] = useState<number | null>(null);
    const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);

    useEffect(() => {
        fetchAndSetAds();
    }, []);

    useEffect(() => {
        fetchFilteredAds();
    }, [selectedCategories, localSearchQuery, searchQuery]);

    const fetchAndSetAds = async () => {
        try {
            const listAd = await getAds();
            if (listAd) {
                setAdsList(listAd.map((ad: AdWithoutCoordinatesInterface) => ({
                    ...ad,
                    lat: parseFloat(ad.lat),
                    lng: parseFloat(ad.lng),
                })));
            }
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
    };

    const fetchFilteredAds = async () => {
        try {
            const query = localSearchQuery || searchQuery || '';
            const response = await getAdsByParams(query);

            // Assuming response structure is { data: { ads: Array } }
            const ads = response.data.ads;

            // Check if ads is an array before proceeding
            if (!Array.isArray(ads)) {
                console.error('Expected an array of ads but received:', ads);
                return;
            }

            setAdsList(ads.map((ad: AdWithoutCoordinatesInterface) => ({
                ...ad,
                lat: parseFloat(ad.lat),
                lng: parseFloat(ad.lng),
            })));
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
    };

    const filteredAds = adsList.filter((ad) => {
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(ad.category as Category);
        const matchesSearchQuery =
            !localSearchQuery ||
            ad.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
            ad.city.toLowerCase().includes(localSearchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
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

    const debouncedHandleSearchChange = useCallback(debounce((query: string) => {
        setLocalSearchQuery(query);
    }, 500), []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        debouncedHandleSearchChange(value);
    };

    const handleActiveMarker = (adId: number) => {
        if (adId === activeMarker) {
            return;
        }
        setActiveMarker(adId);
    };

    const navigate = useNavigate();

    const handleViewDetail = (ad: AdWithoutCoordinatesInterface) => {
        navigate(`/annonce/${ad.id}`, { state: { ad } });
    };

    const mapConfig = new MapConfig();

    return (
        <>
            <div className="flex justify-around items-center gap-4 my-6 border-b-2 py-4 text-xs sm:text-lg font-bodyTest">
                {fakerCategories.map((category) => (
                    <div className="event_filter_wrapper relative group" key={category.id}>
                        <div className='relative'>
                            <button
                                onClick={() => handleCategoryChange(category.name as Category)}
                                className={`flex ${selectedCategories.includes(category.name as Category) ? 'font-bold border-b-4 border-b-blue-800' : ''} ${isAllSelected ? 'font-bold border-b-4 border-b-blue-800' : ''}`}
                            >
                                <span>{category.label}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAds.length === 0 ? (
                <p className='font-bodyTest text-2xl my-32 italic text-orange-500'>Nous n'avons pas trouvé d'évènement.</p>
            ) : (
                <h1 className="font-titleTest text-3xl my-14">
                    Voir les annonces sur la carte
                </h1>
            )}

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

            <MapProvider>
                <div className="w-50 sm:w-full flex justify-center items-center">
                    <GoogleMap
                        mapContainerStyle={mapConfig.defaultMapContainerStyle('1200px', '80vh')}
                        center={mapConfig.defaultMapCenter(adsList)}
                        zoom={mapConfig.defaultMapZoom(6)}
                        options={mapConfig.defaultMapOptions(true,0,'auto','satellite')}
                    >
                        {filteredAds.map(ad => (
                            <MarkerF
                                key={ad.id}
                                position={{ lat: +ad.lat, lng: +ad.lng }}
                                onClick={() => handleActiveMarker(ad.id)}>
                                {activeMarker === ad.id ? (
                                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                        <button
                                            className="text-blue-800 font-bold"
                                            onClick={() => handleViewDetail(ad)}
                                        >
                                            <div>
                                                <p className="font-bold">{ad.title}</p>
                                                <p>{ad.postalCode} {ad.city}</p>
                                            </div>
                                        </button>
                                    </InfoWindowF>
                                ) : null}
                            </MarkerF>
                        ))}
                    </GoogleMap>
                </div>
            </MapProvider>
        </>
    );
}