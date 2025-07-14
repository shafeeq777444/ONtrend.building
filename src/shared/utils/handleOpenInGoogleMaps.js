   export const handleOpenInGoogleMaps = ({latitude, longitude}) => {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(mapsUrl, "_blank");
    };    