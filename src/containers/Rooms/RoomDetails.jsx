import React from "react";
import RoomTitle from "@/components/Rooms/RoomDetail/RoomTitle";
import RoomHighliteImageGallery from "@/components/Rooms/RoomDetail/RoomHighliteImageGallery";
import RoomDetailSwitchingTab from "@/components/Rooms/RoomDetail/RoomDetailSwitchingTab";
import RoomGuestFavouriteBadge from "@/components/Rooms/RoomDetail/RoomGuestFavouriteBadge";
import AllBuildings from "./AllBuildings";

const RoomDetails = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-16">
      {/* <RoomHighliteImageGallery />
      <RoomTitle />
      <RoomDetailSwitchingTab/>
      <RoomGuestFavouriteBadge/> */}
      <AllBuildings/>
    </div>
  );
};

export default RoomDetails;
