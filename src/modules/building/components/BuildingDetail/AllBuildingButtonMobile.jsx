import React from 'react'

const AllBuildingMobile = ({setBuildingRoomType}) => {
  return (
     <div
                                    className="flex flex-col items-center transition-transform duration-200 cursor-pointer hover:scale-110 lg:hidden"
                                    onClick={() => setBuildingRoomType("AllRooms")}
                                >
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent bg-gray-100 flex items-center justify-center">
                                        <img
                                            src="https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
                                            alt="All Rooms"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <span className="mt-2 text-sm text-center text-gray-700 font-medium max-w-20 leading-tight">
                                        All Rooms
                                    </span>
                                </div>
  )
}

export default AllBuildingMobile
