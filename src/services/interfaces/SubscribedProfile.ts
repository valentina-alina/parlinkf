export interface SubscribedProfileInterface {
    id: number;
    firstname: string,
    lastname: string,
    birthDate: Date,
    email: string,
    phone: string,
    isSubscribed: true,
    subscriptions:
        {
            ad_id: number;
            ad_title: string;
            ad_description: string;
            ad_city: string;
        }[] | null;
}