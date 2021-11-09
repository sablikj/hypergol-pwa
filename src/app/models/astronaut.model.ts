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
    profile_image: string;
    profile_image_thumbnail: string;
    last_flight: string;
    first_flight: string
}