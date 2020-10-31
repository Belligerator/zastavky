import { ELocationType } from './locationType.enum';
import { EWheelchairBoarding } from './wheelchairBoarding.enum';

export interface IStop {

    stop_id: string;
    stop_name: string;
    stop_lat: number;
    stop_lon: number;
    location_type: ELocationType;
    parent_station: string;
    wheelchair_boarding: EWheelchairBoarding;
    stop_desc: string;
    stop_url: string;

}
