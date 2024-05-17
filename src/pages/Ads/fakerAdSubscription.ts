/* eslint-disable @typescript-eslint/no-explicit-any */
const fakeSubscribedProfile = [
    {
        id: 1,
        firstname: "Luis",
        lastname: "Jaramillo",
        birthDate: new Date(1982, 3, 22),
        email: "ljaramillo@gmail.com",
        phone: "0601060601",
        isSubscribed: true,
        subscriptions: [
            {
                ad_id: 1,
                ad_title: "Sample Ad 1",
                ad_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                ad_city: "New York"
            },
            {
                ad_id: 2,
                ad_title: "Sample Ad 2",
                ad_description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                ad_city: "Los Angeles"
            }
        ]
    },
    {
        id: 2,
        firstname: "Paulina",
        lastname: "Delgado",
        birthDate: new Date(1981, 11, 12),
        email: "pdelgado@gmail.com",
        phone: "0601060601",
        isSubscribed: false,
        subscriptions: []
    },
    {
        id: 3,
        firstname: "Gabriel",
        lastname: "Lozano",
        birthDate: new Date(1987, 2, 21),
        email: "glozano@gmail.com",
        phone: "0601060601",
        isSubscribed: true,
        subscriptions: [
            {
                ad_id: 1,
                ad_title: "Sample Ad 1",
                ad_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                ad_city: "New York"
            },
            {
                ad_id: 2,
                ad_title: "Sample Ad 2",
                ad_description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                ad_city: "Los Angeles"
            },
            {
                ad_id: 3,
                ad_title: "Sample Ad 3",
                ad_description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                ad_city: "Los Angeles"
            }
        ]
    },
    {
        id: 4,
        firstname: "Diana",
        lastname: "Reyes",
        birthDate: new Date(1984, 4, 17),
        email: "dereyes@gmail.com",
        phone: "0601060601",
        isSubscribed: true,
        subscriptions: [
            {
                ad_id: 1,
                ad_title: "Sample Ad 1",
                ad_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                ad_city: "New York"
            },
            {
                ad_id: 2,
                ad_title: "Sample Ad 2",
                ad_description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                ad_city: "Los Angeles"
            },
            {
                ad_id: 3,
                ad_title: "Sample Ad 3",
                ad_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                ad_city: "New York"
            },
            {
                ad_id: 4,
                ad_title: "Sample Ad 4",
                ad_description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                ad_city: "Los Angeles"
            }
        ]
    }
]

export default fakeSubscribedProfile;