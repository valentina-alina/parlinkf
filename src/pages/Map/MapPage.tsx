/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect} from 'react';
import { MapProvider } from '../../providers/MapProvider';
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import {  useNavigate, useParams } from 'react-router-dom';
// import { Label, TextInput } from 'flowbite-react';
// import { HiSearch } from "react-icons/hi";
import MapConfig from '../../services/utils/MapConfig';
// import { debounce } from '../../services/utils/debounce';
import { getAds, getAdById, getAdsByParams, getCategories, getSubCategories, getAdsByCategories, getAdsBySubCategories } from '../../services/api/ads';
import { AdWithoutCoordinatesInterface } from '../../services/interfaces/AdWithoutCoordinates';
import axios from 'axios';
import FixedHeader from '../../components/Header/FixedHeader';

type Category = string;

const GEOCODEAPI_KEY = 'd5192c485eda412caca23991c255a796';

export default function MapPage({ searchQuery }: { searchQuery: string }) {
    const [adsList, setAdsList] = useState<any[]>([]);
    const [activeMarker, setActiveMarker] = useState<number | null>(null);
    // const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
    const [localSearchQuery] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Record<Category, string[]>>({});
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchAndSetAds();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (id) {
            fetchAdDetails(id);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchAdDetails(id);
        }
    }, [id]);

    useEffect(() => {
        fetchFilteredAds();
    }, [selectedCategories, localSearchQuery, searchQuery]);

    const fetchAndSetAds = async () => {
        try {
            const listAd = await getAds();
            if (listAd) {
                const adsWithCoordinates = await Promise.all(
                    listAd.map(async (ad: AdWithoutCoordinatesInterface) => {
                        const coordinates = await getCoordinates(ad);
                        return { ...ad, ...coordinates };
                    })
                );
                setAdsList(adsWithCoordinates);
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération des annonces:`, error);
        }
    };

    const fetchFilteredAds = async () => {
        try {
            const query = localSearchQuery || searchQuery || '';
            let response = await getAdsByParams(query);

            if (isAllSelected || selectedCategories.length === 0) {
                response = await getAdsByParams(query);
            } else {
                const categoryAds = await Promise.all(
                    selectedCategories.map(category => getAdsByCategories(category))
                );
                const ads = categoryAds.flatMap(category => category.data.ads);
                response = { data: { ads } };
            }

            const fetchedAds = response.data.ads;

            if (!Array.isArray(fetchedAds)) {
                console.error(`Attendait une liste d'annonces mais a reçu:`, fetchedAds);
                return;
            }

            const adsWithCoordinates = await Promise.all(
                fetchedAds.map(async (ad: AdWithoutCoordinatesInterface) => {
                    const coordinates = await getCoordinates(ad);
                    return { ...ad, ...coordinates };
                })
            );

            setAdsList(adsWithCoordinates);
        } catch (error) {
            console.error(`Erreur lors de la récupération des annonces:`, error);
        }
    };

    const handleCategoryChange = async (category: Category) => {
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

        await fetchFilteredAds();
    };

    const handleSubCategoryChange = async (subCategory: string) => {
        try {
            const response = await getAdsBySubCategories(subCategory);
            const fetchedAds = response.data.ads;

            if (!Array.isArray(fetchedAds)) {
                console.error(`Attendait une liste d'annonces mais a reçu:`, fetchedAds);
                return;
            }

            const adsWithCoordinates = await Promise.all(
                fetchedAds.map(async (ad: AdWithoutCoordinatesInterface) => {
                    const coordinates = await getCoordinates(ad);
                    return { ...ad, ...coordinates };
                })
            );

            setAdsList(adsWithCoordinates);

        } catch (error) {
            console.error(`Erreur lors de la récupération des annonces pour la sous-catégorie ${subCategory}:`, error);
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
                setSubCategories((prevSubCategories) => ({
                    ...prevSubCategories,
                    [category]: [],
                }));
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération des sous-catégories de la catégorie ${category}:`, error);

            setSubCategories((prevSubCategories) => ({
                ...prevSubCategories,
                [category]: [],
            }));
        }
    };

    // const debouncedHandleSearchChange = useCallback(debounce((query: string) => {
    //     setLocalSearchQuery(query);
    // }, 500), []);

    // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value } = event.target;
    //     debouncedHandleSearchChange(value);
    // };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            const fetchedCategories = response.data.categories;

            setCategories(['all', ...fetchedCategories]);
            console.log(`Catégories récupérées:`, fetchedCategories);
        } catch (error) {
            console.error(`Erreur lors de la récupération des catégories:`, error);
        }
    };

    const handleActiveMarker = (adId: number) => {
        if (adId === activeMarker) {
            return;
        }
        setActiveMarker(adId);
    };

    const navigate = useNavigate();

    const handleViewDetail = (ad: AdWithoutCoordinatesInterface) => {
        navigate(`/ad/${ad.id}`, { state: { ad } });
    };

    const fetchAdDetails = async (id: string) => {
        try {
            const adDetails = await getAdById(id);
            console.log(`Détails de l'annonce:`, adDetails);
        } catch (error) {
            console.error(`Erreur lors de la récupération des détails de l'annonce avec l'id ${id}:`, error);
        }
    };

    const getCoordinates = async (ad: AdWithoutCoordinatesInterface) => {
        const address = `${ad.address}, ${ad.postalCode}, ${ad.city}, ${ad.country}`;
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: address,
                    key: GEOCODEAPI_KEY,
                },
            });
            const { lat, lng } = response.data.results[0].geometry;
            return { lat, lng };
        } catch (error) {
            console.error('Erreur lors de la récupération du géocode:', error);
            return { lat: 0, lng: 0 }; // Fallback to (0,0) if geocoding fails
        }
    };

    const mapConfig = new MapConfig();

    return (
        <>
            <FixedHeader
                categories={categories}
                selectedCategories={selectedCategories}
                isAllSelected={isAllSelected}
                subCategories={subCategories}
                handleCategoryChange={handleCategoryChange}
                handleCategoryHover={handleCategoryHover}
                handleSubCategoryChange={handleSubCategoryChange}
            />
      <div className="pt-[128px] p-4" >
            {adsList.length === 0 ? (
                <p data-cy="no-ads" className='font-bodyTest text-2xl my-32 italic text-orange-500'>Nous n'avons pas trouvé d'évènement.</p>
            ) : (
                <h1 className="font-titleTest text-xl my-4">
                    Les annonces sur La carte
                </h1>
            )}
       
                <MapProvider >
                    <div className="w-50 sm:w-full flex justify-center items-center">
                        <GoogleMap
                            mapContainerStyle={mapConfig.defaultMapContainerStyle('1200px', '80vh')}
                            center={mapConfig.defaultMapCenter()}
                            zoom={mapConfig.defaultMapZoom(6)}
                            options={mapConfig.defaultMapOptions(true, 0, 'auto', 'satellite')}
                        >
                            {adsList.map(ad => (
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
                </div>
        </>
    );
}