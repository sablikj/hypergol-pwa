export interface Launch {
    id: number;
    url: string;
    slug: string;
    name: string;
    status: {
        id: number;
        name: string;
        abbrev: string;
        description: string;
    }
    last_updated: string;
    net: string;
    window_end: string;
    window_start: string; // Use datetime instead
    probability: number;
    holdreason: string;
    failreason: string;
    hashtag: string;
    launch_service_provider: {
        id: number;
        url: string;
        name: string;
        type: string;
    }
    rocket: {
        id: number;
        configuration: {
            id: number;
            url: string;
            name: string;
            family: string;
            full_name: string;
            variant: string;
        }
    }
    mission: {
        id: number;
        name: string;
        description: string;
        launch_designator: string;
        type: string;
        orbit: {
            id: number;
            name: string;
            abbev: string;
        }
    }
    pad: {
        id: number;
        url: string;
        agency_id: number;
        name: string;
        info_url: string;
        wiki_url: string;
        map_url: string;
        latitude: string;
        longitude: string;
        location: {
            id: number;
            url: string;
            name: string;
            country_code: string;
            map_image: string;
            total_launch_count: number;
            total_landing_count: number;
        }
        map_image: string;
        total_launches_count: string;
    }
    webcast_live: boolean;
    image: string;
    infographic: string;
    program: [];
}