/* eslint-disable @typescript-eslint/no-explicit-any */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { EventInput } from '@fullcalendar/core';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Label } from 'flowbite-react';
import { FaMapMarkedAlt } from "react-icons/fa";
import fakerCategories from '../Ads/fakerCategories';
import { CiEdit } from "react-icons/ci";
import poolcar from '../../assets/poolcar.png';
import childcare from '../../assets/childcare.png';
import event from '../../assets/event.jpg';
import tutoring from '../../assets/tutoring.jpg';

interface MyEvent extends Omit<EventInput, 'id'> {
    id: number;
    title: string;
    address: string;
    city: string;
    postal_code: string;
    lat: string;
    lng: string;
    start: Date;
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

interface SidebarProps {
    events: MyEvent[];
}

interface SidebarEventProps {
    event: MyEvent;
}

const events:MyEvent[] = [
    {
        id: 1,
        title: "Covoiturage école",
        address: "18 rue Jean Moulin",
        city: "Amiens",
        postal_code: "80000",
        lat: "49.883440",
        lng: "2.281520",
        start: parseDate('10/07/2024', 10, 30),
        end: parseDate('10/07/2024', 10, 50),
        attendees: 3,
        category: 'poolcar',
        description: "Covoiturage pour emmener les enfants à l'école",
        imageUrl: poolcar,
        comments:
            [
                {
                    id: 1,
                    firstname: "Gabriel",
                    lastname: "Rubio",
                    message: "Ce message est un test.",
                    date: "envoyé le 10/07/2024",
                },
                {
                    id: 2,
                    firstname: "María",
                    lastname: "Moreno",
                    message: "Ceci est un message de test.",
                    date: "envoyé le 25/01/2024",
                },
                {
                    id: 3,
                    firstname: "Enrique",
                    lastname: "Quesada",
                    message: "Voici un message de test.",
                    date: "envoyé le 29/09/2024",
                },
                {
                    id: 4,
                    firstname: "Teresa",
                    lastname: "Hernández",
                    message: "Mon message de test.",
                    date: "envoyé le 17/05/2024",
                },
            ]
    },
    {
        id: 2,
        title: "Garde d'enfants",
        address: "70 rue Pasteur",
        city: "Valence",
        postal_code: "26000",
        lat: "44.951290",
        lng: "4.900990",
        start: parseDate('23/05/2024', 14, 15),
        end: parseDate('23/05/2024', 17, 15),
        attendees: 2,
        category: 'childcare',
        description: "Garde d'enfants pour l'après-midi",
        imageUrl: childcare,
        comments:
            [
                {
                    id: 1,
                    firstname: "Laura",
                    lastname: "Morelo",
                    message: "Un message est un test.",
                    date: "envoyé le 22/02/2024",
                },
                {
                    id: 2,
                    firstname: "Eduardo",
                    lastname: "Restrepo",
                    message: "Voici mon message de test.",
                    date: "envoyé le 17/03/2024",
                },
            ]
    },
    {
        id: 3,
        title: "Sortie collective au zoo",
        address: "5 rue de la victoire",
        city: "Tarbes",
        postal_code: "65000",
        lat: "43.234192",
        lng: "0.071030",
        start: parseDate('30/05/2024', 10, 30),
        end: parseDate('30/05/2024', 15, 30),
        attendees: 4,
        category: 'events',
        description: "Sortie découverte au zoo",
        imageUrl: event,
        comments:
            [
                {
                    id: 1,
                    firstname: "Raúl",
                    lastname: "Duque",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 4,
        title: "Soutien en maths",
        address: "30 av C. de Gaulle",
        city: "Castres",
        postal_code: "81100",
        lat: "43.601580",
        lng: "2.251310",
        start: parseDate('12/08/2024', 15, 10),
        end: parseDate('12/08/2024', 16, 10),
        attendees: 1,
        category: 'tutoring',
        description: "Cours de soutien en maths niveau CM2",
        imageUrl: tutoring,
        comments:
            [
                {
                    id: 1,
                    firstname: "Manuel",
                    lastname: "Torres",
                    message: "Voilà ce message de test.",
                    date: "envoyé le 04/11/2024",
                },
                {
                    id: 2,
                    firstname: "Flavia",
                    lastname: "Suárez",
                    message: "Ceci est un message de test.",
                    date: "envoyé le 25/01/2024",
                },
                {
                    id: 3,
                    firstname: "Javier",
                    lastname: "Luna",
                    message: "Et un message de test.",
                    date: "envoyé le 04/07/2024",
                },
            ]
    },
    {
        id: 5,
        title: "Sortie collective au zoo",
        address: "20 rue du port",
        city: "Bordeaux",
        postal_code: "33800",
        lat: "44.8317861",
        lng: "-0.5613553",
        start: parseDate('30/05/2024', 10, 30),
        end: parseDate('30/05/2024', 15, 30),
        attendees: 4,
        category: 'events',
        description: "Sortie découverte au zoo",
        imageUrl: event,
        comments:
            [

            ]
    },
    {
        id: 6,
        title: "Sortie à la piscine",
        address: "10 boulevard Jean Jaurès",
        city: "Lille",
        postal_code: "59160",
        lat: "50.6362762",
        lng: "3.0189568",
        start: parseDate('02/07/2024', 10,15),
        end: parseDate('02/07/2024', 11, 45),
        attendees: 4,
        category: 'events',
        description: "Sortie à la piscine",
        imageUrl: event,
        comments:
            [
                {
                    id: 1,
                    firstname: "Ernesto",
                    lastname: "Vaerla",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Marisa",
                    lastname: "Caicedo",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 7,
        title: "Garde d'enfants",
        address: "3 allée des bleuets",
        city: "Narbonne",
        postal_code: "11100",
        lat: "43.1869784",
        lng: "3.0264988",
        start: parseDate('12/06/2024', 14, 30),
        end: parseDate('12/06/2024', 16, 30),
        attendees: 4,
        category: 'childcare',
        description: "Garde d'enfants pour l'après-midi",
        imageUrl: childcare,
        comments:
            [
                {
                    id: 1,
                    firstname: "Jorge",
                    lastname: "De León",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Emiliano",
                    lastname: "Rodríguez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Lucía",
                    lastname: "Cepeda",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 8,
        title: "Garde d'enfants",
        address: "28 rue Charles Péguy",
        city: "Béziers",
        postal_code: "34500",
        lat: "43.3475315",
        lng: "3.230261",
        start: parseDate('18/10/2024', 9, 30),
        end: parseDate('18/10/2024', 10, 30),
        attendees: 4,
        category: 'childcare',
        description: "Garde d'enfants pour la matinée",
        imageUrl: childcare,
        comments:
            [
                {
                    id: 1,
                    firstname: "Diego",
                    lastname: "Linares",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 9,
        title: "Covoiturage école",
        address: "40 boulevard Jules Verne",
        city: "Nantes",
        postal_code: "44300",
        lat: "47.2364422",
        lng: "-1.5332915",
        start: parseDate('24/09/2024', 8, 20),
        end: parseDate('24/09/2024', 8, 30),
        attendees: 4,
        category: 'poolcar',
        description: "Covoiturage pour emmener les enfants à l'école",
        imageUrl: poolcar,
        comments:
            [
                
            ]
    },
    {
        id: 10,
        title: "Soutien en français",
        address: "8 rue de paris",
        city: "Nancy",
        postal_code: "54000",
        lat: "48.6927117",
        lng: "6.1653217",
        start: parseDate('28/05/2024', 10, 15),
        end: parseDate('28/05/2024', 11, 15),
        attendees: 4,
        category: 'tutoring',
        description: "Cours de soutien en français niveau CM1",
        imageUrl: tutoring,
        comments:
            [
                {
                    id: 1,
                    firstname: "Alba",
                    lastname: "Urrutia",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Federico",
                    lastname: "Vázquez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Roberto",
                    lastname: "Celedón",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 4,
                    firstname: "Miriam",
                    lastname: "Gómez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 11,
        title: "Soutien en histoire",
        address: "24 avenue Anatole France",
        city: "Troyes",
        postal_code: "10000",
        lat: "48.285241",
        lng: "4.073956",
        start: parseDate('13/09/2024', 14, 30),
        end: parseDate('13/09/2024', 15, 30),
        attendees: 4,
        category: 'tutoring',
        description: "Cours de soutien en histoire niveau CM2",
        imageUrl: tutoring,
        comments:
            [
                {
                    id: 1,
                    firstname: "Tina",
                    lastname: "Paz",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "David",
                    lastname: "Londoño",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 12,
        title: "Covoiturage école",
        address: "50 allée du rossignol",
        city: "Caen",
        postal_code: "14000",
        lat: "49.1935697",
        lng: "-0.3947772",
        start: parseDate('30/05/2024', 10, 30),
        end: parseDate('30/05/2024', 15, 30),
        attendees: 4,
        category: 'poolcar',
        description: "Covoiturage pour emmener les enfants à l'école",
        imageUrl: poolcar,
        comments:
            [
                {
                    id: 1,
                    firstname: "Jaime",
                    lastname: "Narváez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Lidia",
                    lastname: "Vélez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 13,
        title: "Sortie collective au musée",
        address: "38 rue des acacias",
        city: "Montpellier",
        postal_code: "34090",
        lat: "49.1935697",
        lng: "-0.3947772",
        start: parseDate('22/09/2024', 10, 15),
        end: parseDate('22/09/2024', 14, 30),
        attendees: 4,
        category: 'events',
        description: "Sortie découverte au musée",
        imageUrl: event,
        comments:
            [
                {
                    id: 1,
                    firstname: "Pedro",
                    lastname: "Clemente",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Carolina",
                    lastname: "Heredia",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Gabriela",
                    lastname: "Quiñónez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 14,
        title: "Covoiturage école",
        address: "6 avenue Pierre Brossolette",
        city: "Aix-en-Provence",
        postal_code: "13090",
        lat: "43.5229241",
        lng: "5.442414",
        start: parseDate('20/11/2024', 8, 10),
        end: parseDate('20/11/2024', 8, 20),
        attendees: 4,
        category: 'poolcar',
        description: "Covoiturage pour emmener les enfants à l'école",
        imageUrl: poolcar,
        comments:
            [
                {
                    id: 1,
                    firstname: "Iván",
                    lastname: "Gallardo",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Cecilia",
                    lastname: "Bravo",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Efraín",
                    lastname: "Zuluaga",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 4,
                    firstname: "Héctor",
                    lastname: "Peña",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 15,
        title: "Sortie collective au centre aéré",
        address: "5 avenue de l'aérodrome",
        city: "Perpignan",
        postal_code: "66000",
        lat: "42.7213337",
        lng: "2.8856205",
        start: parseDate('12/07/2024', 10, 15),
        end: parseDate('12/07/2024', 15, 30),
        attendees: 4,
        category: 'events',
        description: "Sortie découverte au centre aéré",
        imageUrl: event,
        comments:
            [
                {
                    id: 1,
                    firstname: "Pablo",
                    lastname: "Torres",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Isabel",
                    lastname: "Montoya",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Aleida",
                    lastname: "Jiménez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 16,
        title: "Covoiturage",
        address: "37 rue de la tour",
        city: "Agen",
        postal_code: "47000",
        lat: "44.2068383",
        lng: "0.6263647",
        start: parseDate('13/06/2024', 8, 20),
        end: parseDate('13/06/2024', 8, 30),
        attendees: 4,
        category: 'poolcar',
        description: "Covoiturage pour emmener les enfants à l'école",
        imageUrl: poolcar,
        comments:
            [
                
            ]
    },
    {
        id: 17,
        title: "Soutien en géo",
        address: "6 rue des tanneurs",
        city: "Rennes",
        postal_code: "35700",
        lat: "48.120503",
        lng: "-1.6731231",
        start: parseDate('20/06/2024', 14, 30),
        end: parseDate('20/06/2024', 15, 30),
        attendees: 4,
        category: 'tutoring',
        description: "Cours de soutien en géographie niveau CM1",
        imageUrl: tutoring,
        comments:
            [
                {
                    id: 1,
                    firstname: "Carlos",
                    lastname: "Núñez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Francisco",
                    lastname: "Villanueva",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Jairo",
                    lastname: "Márquez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 4,
                    firstname: "Beatriz",
                    lastname: "Galarza",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 18,
        title: "Garde d'enfants",
        address: "52 rue de la fosse aux loups",
        city: "Nevers",
        postal_code: "58000",
        lat: "46.9859036",
        lng: "3.1822656",
        start: parseDate('12/09/2024', 9, 30),
        end: parseDate('12/09/2024', 11, 30),
        attendees: 4,
        category: 'childcare',
        description: "Garde d'enfants pour la matinée",
        imageUrl: childcare,
        comments:
            [
                {
                    id: 1,
                    firstname: "Julia",
                    lastname: "Robles",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Helena",
                    lastname: "Zúñiga",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Óscar",
                    lastname: "Valiente",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 4,
                    firstname: "Susana",
                    lastname: "León",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 19,
        title: "Garde d'enfants",
        address: "3 rue marceau",
        city: "Dijon",
        postal_code: "21000",
        lat: "47.3276334",
        lng: "5.0448015",
        start: parseDate('30/05/2024', 15, 15),
        end: parseDate('30/05/2024', 17, 15),
        attendees: 4,
        category: 'childcare',
        description: "Garde d'enfants pour l'après-midi",
        imageUrl: childcare,
        comments:
            [
                {
                    id: 1,
                    firstname: "Josefina",
                    lastname: "Enríquez",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Mateo",
                    lastname: "Monterola",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Ricardo",
                    lastname: "Ruiz",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 4,
                    firstname: "Eduardo",
                    lastname: "Montaner",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 5,
                    firstname: "Juan",
                    lastname: "Alvaredo",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
    {
        id: 20,
        title: "Soutien en maths",
        address: "29 avenue de provence",
        city: "Antibes",
        postal_code: "06000",
        lat: "43.5756631",
        lng: "7.1195755",
        start: parseDate('26/10/2024', 10, 30),
        end: parseDate('26/10/2024', 15, 30),
        attendees: 4,
        category: 'tutoring',
        description: "Cours de soutien en maths niveau CM1",
        imageUrl: tutoring,
        comments:
            [
                
            ]
    },
    {
        id: 21,
        title: "Sortie collective au jardin botanique",
        address: "6 boulevard de Stalingrad",
        city: "Périgueux",
        postal_code: "24000",
        lat: "45.1833",
        lng: "0.7167",
        start: parseDate('07/06/2024', 9, 30),
        end: parseDate('07/06/2024', 11, 30),
        attendees: 4,
        category: 'events',
        description: "Sortie découverte au jardin botanique",
        imageUrl: event,
        comments:
            [
                {
                    id: 1,
                    firstname: "Flavia",
                    lastname: "Feliciano",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 2,
                    firstname: "Luisa",
                    lastname: "Echevarría",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
                {
                    id: 3,
                    firstname: "Patricia",
                    lastname: "Muñoz",
                    message: "Un petit message de test.",
                    date: "envoyé le 24/04/2024",
                },
            ]
    },
]

function parseDate(dateString:any, hour = 0, minute = 0) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day, hour, minute);
}

type Category = typeof fakerCategories[number]['name'];

export default function CalendarPage() {

    const [showWeekNumbers, setShowWeekNumbers] = useState(true);
    const [mobileView, setMobileView] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(true);

    useEffect(() => {
        const handleResize = () => {
            setShowWeekNumbers(window.innerWidth >= 640);
            setMobileView(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const filteredEvents = selectedCategories.length > 0
        ? events.filter((event) => selectedCategories.includes(event.category))
        : events;

    const eventInputs: EventInput[] = filteredEvents.map((event) => ({
        id: String(event.id),
        title: event.title,
        start: event.start,
        end: event.end,
    }));

    const navigate = useNavigate();

    const handleEventClick = (eventClickInfo: any) => {
        const eventId = eventClickInfo.event.id;
        navigate(`/annonce/${eventId}`);
    };

    return (
        <>
            <div className='flex flex-row justify-around items-center gap-4 my-6 border-b-2 py-4 font-bodyTest'>
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
                                        className={`flex ${selectedCategories.includes(category.name as Category) ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg'} ${isAllSelected ? 'font-bold border-b-4 border-b-blue-800 active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg' : 'flex active:relative active:text-white hover:relative hover:text-white text-xs sm:text-lg'}`}
                                    >
                                        {category.label}
                                    </Label>
                                </span>
                            </Link>
                        </div>
                        {category.group && (
                            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
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
                    </div>
                ))}
            </div>

            <h1 className='font-titleTest text-3xl my-8'>Calendrier des annonces</h1>

            <div className="flex flex-wrap gap-8 overflow-hidden">
                <div className={`w-full  ${mobileView ? 'p-0' : ''}`}>
                    <FullCalendar
                        timeZone={'local'}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={'dayGridMonth'}
                        headerToolbar={{
                            start: mobileView ? 'title' : 'prev,today,next',
                            center: mobileView ? 'prev,next,today' : 'title',
                            end: mobileView ? '' : 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        weekends={true}
                        events={eventInputs}
                        eventContent={renderEventContent}
                        eventClick={handleEventClick}
                        locale={frLocale}
                        weekNumbers={showWeekNumbers}
                        navLinks={true}
                        dayMaxEvents={true}
                        selectable={true}
                        height={
                            mobileView ? '80vh' : '90vh'
                        }
                    />
                </div>
                <div className="w-full mt-10 sm:mt-0">
                    <Sidebar
                        events={filteredEvents}
                    />
                </div>
                <div className="fixed bottom-1 left-1/2 z-50 px-2 content-center bg-orange-400 rounded max-sm:hidden py-2">
                    <Link className='text-md flex gap-2 content-center items-center text-white' to="/carte">Voir sur la carte
                        <FaMapMarkedAlt className='h-6 w-6' />
                    </Link>
                </div>
            </div>
        </>
    )
}

function renderEventContent(eventInfo:MyEvent) {
    
    return (
        <>
            <span className='flex flex-col text-xs text-white w-72 py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-400 relative inline-block' >
                <span className='relative text-white flex flex-col'>
                    <b>{eventInfo.timeText}</b>
                    <i>{eventInfo.event.title}</i>
                </span>
            </span>
        </>
    );
}

function Sidebar({ events}: SidebarProps) {

    if (!events || events.length === 0) {
        return <p>Nous n'avons pas trouvé d'évènement.</p>;
    }

    
    return (
        <>
            <div className='demo-app-sidebar-section'>
                <h2 className="text-lg font-titleTest font-bold mb-4 border-e-4 border-solid border-blue-700">Toutes les annonces ({events.length})</h2>
                        <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {events.map((event:MyEvent) => (
                            <Card className='my-4 shadow-lg'>
                                <Link to={`/edit-annonce/${event.id}`} className="link text-red-800 text-bodyTest">
                                    <CiEdit />
                                </Link>
                                <SidebarEvent key={event.id} event={event} />
                            </Card>
                        ))}
                        </ul>
            </div>
        </>
    )
}

function SidebarEvent({ event }: SidebarEventProps) {
    
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    const day = startDate.getDate().toString().padStart(2, '0');
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const year = startDate.getFullYear();
    const hour = startDate.getHours().toString().padStart(2, '0');
    const minute = startDate.getMinutes().toString().padStart(2, '0');

    const endHour = endDate.getHours().toString().padStart(2, '0');
    const endMinute = endDate.getMinutes().toString().padStart(2, '0');

    const formattedDate = `Le ${day}/${month}/${year} de ${hour}h${minute} à ${endHour}h${endMinute}`;

    const navigate = useNavigate();

    const handleViewDetail = (event: MyEvent) => {
        navigate(`/annonce/${event.id}`, { state: { event } });
    };

    return (
        <>
            <li key={event.id}>
                <button
                    className="text-blue-800 text-bold text-bodyTest"
                    onClick={() => handleViewDetail(event)}
                >
                    <div className='flex flex-col'>
                        <b>
                            {event.title}
                        </b>
                        <i className='tracking-wider'>{formattedDate}</i>
                        
                        <i className='flex justify-between items-center'>
                            {event.city} <span className='text-blue-700 font-bold'> Nbp {event.attendees}</span>
                        </i>
                        <img src={event.imageUrl} alt="Ad Image" className="w-96 h-40 md:w-80 mt-2" />
                    </div>
                </button>
            </li>
        </>
    )
}