/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WhereSection from "../components/SearchBar/WhereSection";
import WhoSection from "../components/SearchBar/WhoSection";
import SearchButton from "../components/SearchBar/SearchButton";
import DateRangePickerSection from "../components/SearchBar/DateSections";
import { useDispatch, useSelector } from "react-redux";
import {
  setWhereSlice,
  setCheckInSlice,
  setCheckOutSlice,
  setAdultCountSlice,
  setChildrenCountSlice,
} from "../slices/buildingSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const BuildingRoomSearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { where, checkIn, checkOut, adultCount, childrenCount } = useSelector(
    (state) => state.building
  );

  // ---------------- States ----------------
  const [showGuestSearch, setShowGuestSearch] = useState(false);
  const [hasUserChangedGuests, setHasUserChangedGuests] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // ---------------- URL Params ----------------
  const urlParams = new URLSearchParams(location.search);
  const urlCheckIn = urlParams.get("checkIn");
  const urlCheckOut = urlParams.get("checkOut");
  const urlAdults = urlParams.get("adults");
  const urlChildren = urlParams.get("children");
  const urlLocation = urlParams.get("location");

  // ---------------- Inputs ----------------
  const [locationInputValue, setLocationInputValue] = useState(
    urlLocation || where || ""
  );

  const [dateRange, setDateRange] = useState([
    {
      startDate: urlCheckIn
        ? new Date(urlCheckIn)
        : checkIn
        ? new Date(checkIn)
        : null,
      endDate: urlCheckOut
        ? new Date(urlCheckOut)
        : checkOut
        ? new Date(checkOut)
        : null,
      key: "selection",
    },
  ]);

  // ---------------- Init Redux from URL ----------------
  useEffect(() => {
    if (urlLocation) dispatch(setWhereSlice(urlLocation));
    if (urlCheckIn) dispatch(setCheckInSlice(new Date(urlCheckIn).getTime()));
    if (urlCheckOut) dispatch(setCheckOutSlice(new Date(urlCheckOut).getTime()));
    if (urlAdults) dispatch(setAdultCountSlice(+urlAdults));
    if (urlChildren) dispatch(setChildrenCountSlice(+urlChildren));
  }, [urlLocation, urlCheckIn, urlCheckOut, urlAdults, urlChildren, dispatch]);

  // ---------------- Handlers ----------------
  const handleGuestChange = (type, operation) => {
    setHasUserChangedGuests(true);

    const currentAdults = hasUserChangedGuests
      ? adultCount
      : urlAdults
      ? +urlAdults
      : adultCount;

    const currentChildren = hasUserChangedGuests
      ? childrenCount
      : urlChildren
      ? +urlChildren
      : childrenCount;

    if (type === "adults") {
      if (operation === "increase" && currentAdults < 16) {
        dispatch(setAdultCountSlice(currentAdults + 1));
      } else if (operation === "decrease" && currentAdults > 1) {
        dispatch(setAdultCountSlice(currentAdults - 1));
      }
    }

    if (type === "children") {
      if (operation === "increase" && currentChildren < 10) {
        dispatch(setChildrenCountSlice(currentChildren + 1));
      } else if (operation === "decrease" && currentChildren > 0) {
        dispatch(setChildrenCountSlice(currentChildren - 1));
      }
    }
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    dispatch(setCheckInSlice(newRange[0].startDate?.getTime() || ""));
    dispatch(setCheckOutSlice(newRange[0].endDate?.getTime() || ""));
  };

  const handleLocationChange = (value) => {
    setLocationInputValue(value);
    dispatch(setWhereSlice(value));
  };


const onClickSearch = () => {
        dispatch(setWhereSlice(locationInputValue));
        dispatch(setCheckInSlice(dateRange[0].startDate?.getTime() || ""));
        dispatch(setCheckOutSlice(dateRange[0].endDate?.getTime() || ""));
        dispatch(setAdultCountSlice(adultCount || 0));
        dispatch(setChildrenCountSlice(childrenCount || 0));
        console.log("dateRange:", dateRange, "adultCount:", adultCount, "childrenCount:", childrenCount, "LocationinputValue:", locationInputValue, "search");
        const params = {};
        if (locationInputValue) params.location = locationInputValue;
        if (dateRange[0]?.startDate) params.checkIn = dateRange[0].startDate.toISOString();
        if (dateRange[0]?.endDate) params.checkOut = dateRange[0].endDate.toISOString();
        if (adultCount) params.adults = adultCount;
        if (childrenCount) params.children = childrenCount;

        const queryParams = new URLSearchParams(params).toString();
        navigate(`/building/search${queryParams ? `?${queryParams}` : ''}`);
        toast.success("search Completed");
    };
  // ---------------- Resize Listener ----------------
  useLayoutEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 640;
      if (newIsMobile !== isMobile) setShowGuestSearch(false);
      setIsMobile(newIsMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // ---------------- Scroll Listener ----------------
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(!(currentY > lastScrollY.current && currentY > 100));
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------- UI ----------------
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-16 z-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-gray-200 rounded-3xl shadow-lg p-2 max-w-4xl mx-auto"
      >
        {/* Desktop */}
        {!isMobile && (
          <div className="hidden lg:flex items-center justify-between">
            <WhereSection
              inputValue={locationInputValue}
              setInputValue={handleLocationChange}
            />
            <DateRangePickerSection
              dateRange={dateRange}
              setDateRange={handleDateRangeChange}
              isSearchBar
            />
            <WhoSection
              showGuestSearch={showGuestSearch}
              setShowGuestSearch={setShowGuestSearch}
              handleGuestChange={handleGuestChange}
              adultCount={
                hasUserChangedGuests
                  ? adultCount
                  : urlAdults
                  ? +urlAdults
                  : adultCount
              }
              childrenCount={
                hasUserChangedGuests
                  ? childrenCount
                  : urlChildren
                  ? +urlChildren
                  : childrenCount
              }
            />
            <SearchButton onClick={onClickSearch} />
          </div>
        )}

        {/* Mobile */}
        {isMobile && (
          <div className="lg:hidden space-y-3">
            <WhereSection
              inputValue={locationInputValue}
              setInputValue={handleLocationChange}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <DateRangePickerSection
                dateRange={dateRange}
                setDateRange={handleDateRangeChange}
                isSearchBar
              />
              <WhoSection
                showGuestSearch={showGuestSearch}
                setShowGuestSearch={setShowGuestSearch}
                handleGuestChange={handleGuestChange}
                adultCount={
                  hasUserChangedGuests
                    ? adultCount
                    : urlAdults
                    ? +urlAdults
                    : adultCount
                }
                childrenCount={
                  hasUserChangedGuests
                    ? childrenCount
                    : urlChildren
                    ? +urlChildren
                    : childrenCount
                }
              />
            </div>
            <SearchButton onClick={onClickSearch} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BuildingRoomSearchBar;
