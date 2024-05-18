/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { getSubscribedProfiles } from "../../services/api/userSubscribed";
import { useEffect, useState } from "react";
import { SubscribedProfileInterface } from "../../services/interfaces/SubscribedProfile";
import { Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

const AdSubscriptionPage = () => {

    const navigate = useNavigate();

    const handleViewDetail = (subscription: any) => {
        navigate(`/annonce/${subscription.ad_id}`, { state: { subscription } });
    };
    
    const { idUser } = useParams();

    const [ subscribedProfiles, setSubscribedProfiles ] = useState<SubscribedProfileInterface | null>({
        id: 0,
        firstname: '',
        lastname: '',
        birthDate: new Date(),
        email: '',
        phone: '',
        isSubscribed: true,
        subscriptions: null,
    });

    useEffect(() => {
        const loadSubscribedProfiles = async () => {
            const listSubscribedProfile = await getSubscribedProfiles();
            if (listSubscribedProfile) {
                const selectedSubscribedProfile = listSubscribedProfile.find(subscribedProfile => subscribedProfile.id.toString() === idUser);
                if (selectedSubscribedProfile) {
                    setSubscribedProfiles({
                        ...(selectedSubscribedProfile as unknown as SubscribedProfileInterface),
                    });
                } else {
                    setSubscribedProfiles(null);
                }
            }
        };
        loadSubscribedProfiles();
    }, [idUser]);

    if (!subscribedProfiles) {
        return <p className="font-titleTest text-3xl">Oups! Il n'y a pas d'annonces sur mon comopte</p>;
    }



    return (
        <>
            <h1 className="font-titleTest text-3xl my-8">Mes annonces</h1>
            
            <div className="flex justify-center items-center ml-1 sm:ml-0 scale-125 sm:scale-100 my-80 sm:my-0">
                <Card>
                    <p className="text-xl font-titleTest border-b-4 border-blue-700"><strong>{subscribedProfiles.firstname} {subscribedProfiles.lastname}</strong></p>
                    <p>{subscribedProfiles.email} - {subscribedProfiles.phone}</p>

                    {
                        subscribedProfiles.subscriptions?.map((subscription) => (
                            <div key={subscription.ad_id} className="flex justify-center items-center mb-1">
                                <button
                                    className="text-blue-800 text-bold text-bodyTest"
                                    onClick={() => handleViewDetail(subscription)}
                                >
                                    <Card className="w-full">
                                        <p className="text-xl font-titleTest border-b-4 border-blue-700 mb-4"><strong>{subscription.ad_title}</strong></p>
                                        <div className="flex flex-col sm:flex-row justify-evenly items-start">
                                            <img src={subscription.ad_imageUrl} alt="Ad Image" className="w-36 sm:w-40 h-auto" />
                                            <p className="mt-10 max-w-xs break-words">{subscription.ad_description}</p>
                                        </div>
                                        <div className="flex justify-center items-start mt-4 gap-36 font-bodyTest italic">
                                            <div className="flex flex-row gap-6">
                                                <p>{subscription.ad_postal_code}</p><p>{subscription.ad_city}</p>
                                            </div>
                                    </div>
                                    </Card>
                                </button>
                            </div>
                        ))
                    }
                </Card>
            </div>
        </>
    )
}

export default AdSubscriptionPage