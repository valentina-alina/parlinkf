import { EventInput } from '@fullcalendar/core';

export interface Comment {
    id: number;
    firstname: string;
    lastname: string;
    message: string;
    date: string;
}

export interface AdWithoutCoordinatesInterface extends Omit<EventInput, 'id'> {
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
    comments: Comment[] | null;
}

export interface SidebarProps {
    events: AdWithoutCoordinatesInterface[];
}

export interface SidebarEventProps {
    event: AdWithoutCoordinatesInterface;
}