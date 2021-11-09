export interface Astronaut {
    id: number;
    url: string;
    name: string;
    status: {
        id: number;
        name: string
    };
    type: {
        id: number;
        name: string
    };
    date_of_birth: string;
    date_of_death: string;
    nationality: string;
    bio: string;
    twitter: string;
    instagram: string;
    wiki: string;
    last_flight: string;
    first_flight: string;
    profile_image: string;
    agency: {
        id: number;
        url: string;
        name: string;
        featured: boolean;
        type: string;
        country_code: string;
        abbrev: string;
        description: string;
        administrator: string;
        founding_year: string;
        launchers: string;
        spacecraft: string;
        parent: string;
        image_url: string
    };
    flights: [
        {
            id: string;
            name: string;
            net: string;
            launch_service_provider: {
                id: number;
                name: string;
                type: string;
            };

            mission: {
                id: number;
                name: string;
                description: string;
                type: string;
            };
        }
    ];
    landings: [
        {
            id: number;
            url: string;
            destination: string;
            mission_end: string;
            image_url: string;
        }
    ]
}