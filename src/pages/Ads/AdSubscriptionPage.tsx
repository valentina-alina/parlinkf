/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { getSubscribedProfiles } from "../../services/api/userSubscribed";
import { useEffect, useState } from "react";
import { SubscribedProfileInterface } from "../../services/interfaces/SubscribedProfile";
import { Card } from "flowbite-react";

const AdSubscriptionPage = () => {
    
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
                        ...(selectedSubscribedProfile as SubscribedProfileInterface),
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
            
            <div className="flex justify-center items-center ml-1 sm:ml-0 scale-90 sm:scale-100">
                <Card>
                    <p className="text-xl font-titleTest border-b-4 border-blue-700"><strong>{subscribedProfiles.firstname} {subscribedProfiles.lastname}</strong></p>
                    <p>{subscribedProfiles.email} - {subscribedProfiles.phone}</p>

                    {
                        subscribedProfiles.subscriptions?.map((subscription) => (
                            <div className="flex justify-center items-center mb-1">
                                <Card
                                    className="w-96 bg-gray-50 shadow-lg"
                                    horizontal
                                >
                                    <div key={subscription.ad_id} className="flex space-x-8">
                                        <div>
                                            <h3 className="mb-3"><strong className="font-bodyTest text-blue-800">{subscription.ad_title}</strong> <span>{subscription.ad_description}</span></h3>
                                            <p>{subscription.ad_city}</p>
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

export default AdSubscriptionPage