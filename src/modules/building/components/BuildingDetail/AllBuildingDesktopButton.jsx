import React from 'react'

const AllBuildingDesktopButton = ({setBuildingRoomType}) => {
  return (
   <div
                                    className="hidden lg:block w-full max-w-[340px] rounded-2xl overflow-hidden relative transition-transform duration-300 cursor-pointer hover:scale-105"
                                    onClick={() => setBuildingRoomType("AllRooms")}
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden">
                                        <img
                                            src="https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
                                            alt="All Rooms"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-white">
                                        <h3 className="text-xl font-bold">Explore All Rooms</h3>
                                        <div className="flex justify-between items-center mt-1 text-sm">
                                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">View All</span>
                                        </div>
                                    </div>
                                </div>
  )
}

export default AllBuildingDesktopButton
