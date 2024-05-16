/* eslint-disable @typescript-eslint/no-explicit-any */
import poolcar from '../../assets/poolcar.png';
import childcare from '../../assets/childcare.png';
import event from '../../assets/event.jpg';
import tutoring from '../../assets/tutoring.jpg';


const fakeAd = [
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


export default fakeAd;