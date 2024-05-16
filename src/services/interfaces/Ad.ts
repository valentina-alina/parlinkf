export interface AdInterface {
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