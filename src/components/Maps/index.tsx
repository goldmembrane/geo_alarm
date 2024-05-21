'use client';
import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: '1000px',
    height: '500px',
}

const center = {
    lat: -3.745,
    lng: -38.523
}

const GoogleMaps = ():JSX.Element => {
    // google map api
    const { isLoaded } = useJsApiLoader({
        id: 'geo-alarm',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ''
    })

    // google map initialize
    const [map, setMap] = useState(null)

    const onLoad = React.useCallback(function callback(map: any) {

        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map : any) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
        </GoogleMap>
    ) : <></>
}

export default GoogleMaps;