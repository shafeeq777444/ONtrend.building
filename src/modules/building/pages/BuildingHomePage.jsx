import React from "react";
import AllBuildings from "../containers/AllBuildings";
import BuildingRoomSearchBar from "../containers/BuildingRoomSearchBar";

const RoomHome = () => {
    return (
        <div className="ml-2 mt-10">
            <BuildingRoomSearchBar />
            <AllBuildings />
            <AllBuildings />
            <AllBuildings />
        </div>
    );
};

export default RoomHome;
