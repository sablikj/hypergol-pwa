export interface LaunchDetail {
    id: number;
    url: string;
    slug: string;
    name: string;
    status: {
        id: number;
        name: string;
        abbrev: string;
        description: string;
    };
    last_updated: string;
    updates: [
        {
            id: number;
            profile_image: string;
            comment: string;
            info_url: string;
            created_by: string;
            created_on: string;
        }
    ];
    net: string;
    window_end: string;
    window_start: string;
    holdreason: string;
    failreason: string;
    launch_service_provider: {
        id: number;
        url: string;
        name: string;
        type: string;
        country_code: string;
        abbrev: string;
        description: string;
        administrator: string;
        founding_year: number;
        launchers: string;
        spacecraft: string;
        total_launch_count: number;
        consecutive_successful_launches: number;
        successful_launches: number;
        info_url: string;
        wiki_url: string;
        logo_url: string;
        image_url: string;
        nation_url: string;
    };
    rocket: {
        id: number;
        configuration: {
            id: number;
            url: string;
            name: string;
            description: string;
            family: string;
            full_name: string
            manufacturer: {
                id: number;
                url: string;
                name: string;
                type: string;
                country_code: string;
                abbrev: string;
                description: string;
                administrator: string;
                founding_year: number;
                launchers: string;
                spacecraft: string;
                total_launch_count: number;
                successful_launches: number;
                info_url: string;
                wiki_url: string;
                logo_url: string;
                image_url: string;
                nation_url: string;
            };
            variant: string;
            alias: string;
            min_stage: number;
            max_stage: number;
            length: number;
            diameter: number;
            maiden_flight: string;
            launch_cost: string;
            launch_mass: number;
            leo_capacity: number;
            gto_capacity: number;
            to_thrust: number;
            apogee: number;
            vehicle_range: number;
            image_url: string;
            info_url: string;
            wiki_url: string;
            total_launch_count: number;
            consecutive_successful_launches: number;
            successful_launches: number;
            failed_launches: number;
        };
        launcher_stage: [];
        spacecraft_stage: number;
    };
    mission: {
        id: number;
        name: string;
        description: string;
        launch_designator: string;
        type: string;
        orbit: {
            id: number;
            name: string;
            abbrev: string
        }
    };
    pad: {
        id: number;
        url: string;
        agency_id: number;
        name: string;
        info_url: string;
        wiki_url: string;
        map_url: string;
        latitude: number;
        longitude: number;
        location: {
            id: number;
            url: string;
            name: string;
            country_code: string;
            map_image: string;
            total_launch_count: number;
            total_landing_count: number;
        };
        map_image: string;
        total_launch_count: number
    };
    infoURLs: [
        {
            priority: number;
            title: string;
            description: string;
            feature_image: string;
            url: string;
        }
    ];
    vidURLs: [
        {
            priority: number;
            title: string;
            description: string;
            feature_image: string;
            url: string;
        }
    ];
    webcast_live: boolean;
    image: string;
    infographic: string;
    orbital_launch_attempt_count: number;
    location_launch_attempt_count: number;
    pad_launch_attempt_count: number;
    agency_launch_attempt_count: number;
    orbital_launch_attempt_count_year: number;
    location_launch_attempt_count_year: number;
    pad_launch_attempt_count_year: number;
    agency_launch_attempt_count_year: number;
    notifications_enabled: boolean;
}



/*export interface LaunchDetail {
    id: number;
    url: string;
    slug: string;
    flightclub_url: string;
    r_spacex_api_id: number;
    name: string;
    status: {
        id: number;
        name: string;
        abbrev: string;
        description: string;
    };
    last_updated: string;
    updates: [
        {
            id: number;
            profile_image: string;
            comment: string;
            info_url: string;
            created_by: string;
            created_on: string;
        }
    ];
    net: string;
    window_end: string;
    window_start: string;
    probability: any;
    holdreason: string;
    failreason: string;
    hashtag: string;
    launch_service_provider: {
        id: number;
        url: string;
        name: string;
        featured: boolean;
        type: string;
        country_code: string;
        abbrev: string;
        description: string;
        administrator: string;
        founding_year: number;
        launchers: string;
        spacecraft: string;
        launch_library_url: string;
        total_launch_count: number;
        consecutive_successful_launches: number;
        successful_launches: number;
        failed_launches: number;
        pending_launches: number;
        consecutive_successful_landings: number;
        successful_landings: number;
        failed_landings: number;
        attempted_landings: number;
        info_url: string;
        wiki_url: string;
        logo_url: string;
        image_url: string;
        nation_url: string;
    };
    rocket: {
        id: number;
        configuration: {
            id: number;
            url: string;
            name: string;
            description: string;
            family: string;
            full_name: string
            manufacturer: {
                id: number;
                url: string;
                name: string;
                featured: boolean;
                type: string;
                country_code: string;
                abbrev: string;
                description: string;
                administrator: string;
                founding_year: number;
                launchers: string;
                spacecraft: string;
                launch_library_url: string;
                total_launch_count: number;
                consecutive_successful_launches: number;
                successful_launches: number;
                failed_launches: number;
                pending_launches: number;
                consecutive_successful_landings: number;
                successful_landings: number;
                failed_landings: number;
                attempted_landings: number;
                info_url: string;
                wiki_url: string;
                logo_url: string;
                image_url: string;
                nation_url: string;
            };
            program: [];
            variant: string;
            alias: string;
            min_stage: number;
            max_stage: number;
            length: number;
            diameter: number;
            maiden_flight: string;
            launch_cost: string;
            launch_mass: number;
            leo_capacity: number;
            gto_capacity: number;
            to_thrust: number;
            apogee: number;
            vehicle_range: number;
            image_url: string;
            info_url: string;
            wiki_url: string;
            total_launch_count: number;
            consecutive_successful_launches: number;
            successful_launches: number;
            failed_launches: number;
            pending_launches: number;
        };
        launcher_stage: [];
        spacecraft_stage: number;
    };
    mission: {
        id: number;
        name: string;
        description: string;
        launch_designator: string;
        type: string;
        orbit: {
            id: number;
            name: string;
            abbrev: string
        }
    };
    pad: {
        id: number;
        url: string;
        agency_id: number;
        name: string;
        info_url: string;
        wiki_url: string;
        map_url: string;
        latitude: number;
        longitude: number;
        location: {
            id: number;
            url: string;
            name: string;
            country_code: string;
            map_image: string;
            total_launch_count: number;
            total_landing_count: number;
        };
        map_image: string;
        total_launch_count: number
    };
    infoURLs: [
        {
            priority: number;
            title: string;
            description: string;
            feature_image: string;
            url: string;
        }
    ];
    vidURLs: [
        {
            priority: number;
            title: string;
            description: string;
            feature_image: string;
            url: string;
        }
    ];
    webcast_live: boolean;
    image: string;
    infographic: string;
    program: [];
    orbital_launch_attempt_count: number;
    location_launch_attempt_count: number;
    pad_launch_attempt_count: number;
    agency_launch_attempt_count: number;
    orbital_launch_attempt_count_year: number;
    location_launch_attempt_count_year: number;
    pad_launch_attempt_count_year: number;
    agency_launch_attempt_count_year: number;
    mission_patches: [];
    notifications_enabled: boolean;
}*/
