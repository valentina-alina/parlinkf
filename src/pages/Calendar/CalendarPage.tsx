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
        title: "Covoiturage",
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
]

function parseDate(dateString:any, hour = 0, minute = 0) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day, hour, minute);
}

//const eventsWithStringIds = events.map(event => ({ ...event, id: String(event.id) }));

export default function CalendarPage() {

    const [showWeekNumbers, setShowWeekNumbers] = useState(true);
    const [mobileView, setMobileView] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setShowWeekNumbers(window.innerWidth >= 640);
            setMobileView(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
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
            <h1 className='font-titleTest text-3xl my-8'>Calendrier des annonces</h1>
            <div className='flex flex-row justify-around items-center gap-4 my-6'>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('poolcar')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="poolcar"
                                className={`flex ${selectedCategories.includes('poolcar') ? 'font-bold  active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Covoiturage
                            </Label>
                        </span>
                    </Link>
                </div>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('tutoring')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="tutoring"
                                className={`flex ${selectedCategories.includes('tutoring') ? 'font-bold active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Soutien
                            </Label>
                        </span>
                    </Link>
                </div>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('childcare')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="childcare"
                                className={`flex ${selectedCategories.includes('childcare') ? 'font-bold active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Garde enfants
                            </Label>
                        </span>
                    </Link>
                </div>
                <div className="event_filter_wrapper">
                    <Link
                        to=""
                        onClick={() => handleCategoryChange('events')}
                        className="flex border-b-4 border-grey-800 active:ring focus:outline-none focus:border-b-4 focus:border-b-blue-800"
                    >
                        <span className='active:before:block active:before:absolute active:before:-inset-1 active:before:-skew-y-3 active:before:bg-blue-700 active:relative active:inline-block hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-blue-700 hover:relative hover:inline-block'>
                            <Label
                                htmlFor="events"
                                className={`flex ${selectedCategories.includes('events') ? 'font-bold active:relative active:text-white hover:relative hover:text-white' : 'flex active:relative active:text-white hover:relative hover:text-white'}`}
                            >
                                Sortie
                            </Label>
                        </span>
                    </Link>
                </div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 overflow-hidden">
                <div className={`w-full md:w-2/3  ${mobileView ? 'p-0' : ''}`}>
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
                            mobileView ? '80vh' : '100%'
                        }
                    />
                </div>
                <div className="w-full md:w-1/3 mt-10 sm:mt-0">
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
                        <ul>
                        {events.map((event:MyEvent) => (
                            <Card className='my-4 shadow-lg'>
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