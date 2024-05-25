"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Label, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getAds } from '../../services/api/ads';
import { AdInterface } from '../../services/interfaces/Ad';
import { useParams } from 'react-router-dom';
import { MapProvider } from '../../providers/MapProvider';
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { HiPencilAlt } from "react-icons/hi";
import MapConfig from '../../services/utils/MapConfig';

export default function AdsDetailPage() {

    const { idAd } = useParams();
    
    const [ ads, setAds ] = useState<AdInterface | null>(null);

    const [selectedAttendees, setSelectedAttendees] = useState<number>(0);
    const [remainingAttendees, setRemainingAttendees] = useState<number>(0);

    useEffect(() => {
        const loadAds = async () => {
            const listAd = await getAds();
            if (listAd) {
                const selectedAd = listAd.find(ad => ad.id.toString() === idAd);
                if (selectedAd) {
                    setAds({
                        ...selectedAd,
                        lat: parseFloat(selectedAd.lat),
                        lng: parseFloat(selectedAd.lng),                        
                    });
                } else {
                    setAds(null);
                }
            }
        };
        loadAds();
    }, [idAd]);

    useEffect(() => {
        if (ads) {            
            const remaining = ads.attendees - selectedAttendees;
            setRemainingAttendees(remaining);
        }
    }, [ads, selectedAttendees]);

    const handleAttendeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setSelectedAttendees(value);
    };

    const startDate = ads ? new Date(ads.start) : new Date();
    const endDate = ads ? new Date(ads.end) : new Date();

    const day = startDate.getDate().toString().padStart(2, '0');
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const year = startDate.getFullYear();
    const hour = startDate.getHours().toString().padStart(2, '0');
    const minute = startDate.getMinutes().toString().padStart(2, '0');

    const endHour = endDate.getHours().toString().padStart(2, '0');
    const endMinute = endDate.getMinutes().toString().padStart(2, '0');

    const formattedDate = `Le ${day}/${month}/${year} de ${hour}h${minute} à ${endHour}h${endMinute}`;

    const mapConfig = new MapConfig();
    console.log('mapConfig', mapConfig)

    return (
        <>
            <h1 className="font-titleTest text-3xl sm:my-40">Fiche de l'annonce</h1>

            {
                !ads? (
                    <p className="font-bodyTest text-2xl my-32 italic text-orange-500">Oups! Il n'y a pas d'annonce correspondante</p>
                ) : (
                    <>
                        <div className="flex justify-center items-center ml-1 sm:ml-0 scale-90 sm:scale-100">
                            <Card>
                                <p className="text-xl font-titleTest border-b-4 border-blue-700"><strong>{ads.title}</strong></p>
                                <div className="flex justify-start items-start mt-10 gap-36 font-bodyTest italic">
                                    <div className="flex flex-col justify-start items-start">
                                        <p>{ads.address}</p>
                                        <div className="flex flex-row gap-6">
                                            <p>{ads.postal_code} </p>
                                            <p>{ads.city}</p>
                                        </div>
                                    </div>
                                    <p>{formattedDate}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <img src={ads.imageUrl} alt="Ad Image" className="w-40 h-auto" />
                                    <p className="mt-10 mb-8 max-w-xs break-words">{ads.description}</p>
                                </div>
                                <MapProvider>
                                    <div className="w-96 sm:w-full flex justify-center items-center">
                                        <GoogleMap
                                            mapContainerStyle={mapConfig.defaultMapContainerStyle('400px','30vh')}
                                            center={mapConfig.defaultMapCenterAdDetail(ads)}
                                            zoom={mapConfig.defaultMapZoom(18)}
                                            options={mapConfig.defaultMapOptions(true,0,'auto','satellite')}
                                        >
                                            <MarkerF key={ads.id} position={mapConfig.defaultMapCenterAdDetail(ads)}>
                                            </MarkerF>
                                        </GoogleMap>
                                    </div>
                                </MapProvider>
                                <div className="flex flex-row justify-start items-start mt-8 gap-44">
                                    <div className="flex flex-col">
                                        <p>Places disponibles: {remainingAttendees}</p>
                                        <TextInput
                                            id="attendees"
                                            name="attendees"
                                            type="number"
                                            value={selectedAttendees.toString()}
                                            onChange={handleAttendeesChange}
                                            min="0"
                                            max={ads.attendees.toString()}
                                        />
                                    </div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="comment" value="Discussions" />
                                    </div>
                                </div>
                                <div className="flex justify-evenly gap-8 font-bodyTest mt-8 mb-10">
                                    <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-gray-700 relative flex gap-2 mt-2'>
                                        <Button className="bg-gray-700">
                                                <span className="relative m-1">Contacter</span>
                                        </Button>
                                    </span>
                                    <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-700 relative flex gap-2 mt-2'>
                                        <Button className="bg-blue-700">
                                                <span className="relative text-white m-1">S'inscrire</span>
                                        </Button>
                                    </span>
                                    
                                </div>

                                <div className="relative">
                                    <Textarea
                                        id="comment"
                                        name="comment"
                                        className="font-bodyTest mb-8 pl-10 h-22"
                                        placeholder="Commentaire..."
                                        rows={2}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                                        <HiPencilAlt className="text-gray-400 h-5 w-5" />
                                    </div>
                                </div>

                                {
                                    ads.comments?.map((comment) => (
                                        <div key={comment.id} className="flex justify-center items-center mb-1">
                                            <Card
                                                className="w-96 bg-gray-50 shadow-lg"
                                                horizontal
                                            >
                                                <div className="flex space-x-8">
                                                    <div>
                                                        <h3 className="mb-3"><strong className="font-bodyTest text-blue-800">{comment.firstname} {comment.lastname}</strong> <span>{comment.message}</span></h3>
                                                        <p>{comment.date}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </Card>
                        </div>
                    </>
                )
            }
        </>
    )
}