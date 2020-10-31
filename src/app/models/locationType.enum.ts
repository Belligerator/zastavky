export enum ELocationType {

    STOP_PLATFORM,  // A location where passengers board or disembark from a transit vehicle. Is called a platform when defined within a parent_station.
    STATION,        // A physical structure or area that contains one or more platform.
    ENTRANCE_EXIT,  // A location where passengers can enter or exit a station from the street. If an entrance/exit belongs to multiple stations, it can be linked by pathways to both, but the data provider must pick one of them as parent.
    GENERIC_NODE,   // A location within a station, not matching any other location_type, which can be used to link together pathways define in pathways.txt.
    BOARDING_AREA   // A specific location on a platform, where passengers can board and/or alight vehicles.

}
