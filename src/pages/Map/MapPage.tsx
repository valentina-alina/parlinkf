import { getAds } from '../../services/api/ads';
import { useEffect, useState } from 'react';
import { MapProvider } from '../../providers/MapProvider';
import { GoogleMap, MarkerF } from "@react-google-maps/api";

interface AdInterface {
    id: number;
    title: string;
    address: string;
    city: string;
    postal_code: string;
    lat: string;
    lng: string;
    start: Date;
    end: Date;
    attendees: number;
    category: string;
    description: string;
    imageUrl: string;
    comments:
    {
        id: number;
        firstname:string;
        lastname: string;
        message: string;
        date: string;
    }[] | null;
}

interface AdInterfaceWithCoordinates {
    id: number;
    title: string;
    address: string;
    city: string;
    postal_code: string;
    lat: number;
    lng: number;
    start: Date;
    end: Date;
    attendees: number;
    category: string;
    description: string;
    imageUrl: string;
    comments:
    {
        id: number;
        firstname:string;
        lastname: string;
        message: string;
        date: string;
    }[] | null;
}

const MapPage = () => {

    const [ads, setAds] = useState<AdInterfaceWithCoordinates[]>([]);

    useEffect(() => {
        const fetchAndSetAds = async () => {
            try {
                const listAd = await getAds();
                if (listAd) {
                    setAds(listAd.map((ad: AdInterface) => ({
                        ...ad,
                        lat: parseFloat(ad.lat),
                        lng: parseFloat(ad.lng),
                    })));
                }
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        };
        
        fetchAndSetAds();
    }, []);

    const defaultMapContainerStyle = {
        width: '1200px',
        height: '80vh',
        borderRadius: '10px 10px 10px 10px',
    };

    const defaultMapCenter = {
        lat: ads.length > 0 ? ads[0].lat : 0,
        lng: ads.length > 0 ? ads[0].lng : 0,
    };

    const defaultMapZoom = 6;

    const defaultMapOptions = {
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
        mapTypeId: 'satellite',
    };

    return (
        <>
            <h1 className="font-titleTest text-3xl my-8">
                Voir les annonces sur la carte
            </h1>

            <MapProvider>
                <div className="w-50 sm:w-full flex justify-center items-center">
                    <GoogleMap
                        mapContainerStyle={defaultMapContainerStyle}
                        center={defaultMapCenter}
                        zoom={defaultMapZoom}
                        options={defaultMapOptions}
                    >
                        {ads.map(ad => (
                            <MarkerF key={ad.id} position={{ lat: ad.lat, lng: ad.lng }} />
                        ))}
                    </GoogleMap>
                </div>
            </MapProvider>
        </>
    )
}

export default MapPage;