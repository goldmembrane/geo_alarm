'use client';
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '100vh',
}

const center = {
    lat: 35.68125171209752,
    lng: 139.76712335330515
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

    // get current position
    const [currentPosition, setCurrentPosition] = useState<any>({})

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentPosition({lat: position.coords.latitude, lng: position.coords.longitude})
            })
        }
    }, [currentPosition])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
        </GoogleMap>
    ) : <></>
}

export default GoogleMaps;