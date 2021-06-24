export interface IResultListItem {

    id: number;
    departure_time: string;
    trip: {
        trip_id: number;
        trip_headsign: string;
        route: {
            route_id: string;
            route_short_name: string;
            route_long_name: number;
        }
    }
}
