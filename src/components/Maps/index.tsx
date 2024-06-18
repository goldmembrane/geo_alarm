'use client';
import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

import Center from "./center";

const GoogleMaps = ():JSX.Element => {

    /** 기본 지도 설정 값 */
    const defaultProps = {
        center: {
            lat: 37.514575,
            lng: 127.0495556
        },
        zoom: 11
    };

    const [map, setMap] = useState(null);

    const [currentPosition, setCurrentPosition] = useState<any>({});
    const [markerPosition, setMarkerPosition] = useState<any>({});

    const [markers, setMarkers] = useState<any>([]);

    /** 구글 맵 클릭 시 marker를 설정하는 함수 */
    const onMapClick = (e: any) => {
        setMarkers((current: any) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }
        ]);
        setCurrentPosition({lat: e.latLng.lat(), lng: e.latLng.lng()})


    }

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess)
            navigator.geolocation.getCurrentPosition(setUserMarkerPosition)
        }
    }, [])

    /** 현재 위치 불러오기 성공 시 호출되는 함수 */
    const getCurrentPositionSuccess = (position: any) => {
        setCurrentPosition({
            ...currentPosition,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }

    /** 현재 위치 불러오기 성공 시 유저 마크 생성하는 함수 */
    const setUserMarkerPosition = (position: any) => {
        setMarkerPosition({
            ...markerPosition,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }

    /** 유저 현재 위치를 중심으로 지도를 이동시키는 함수 */
    const moveCenterCurrentPosition = () => {
        if ( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newCenter = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                setCurrentPosition(newCenter)
            })
        } else {
            alert('Geolocation is not supported by this browser')
        }
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey:  process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ''
    })
    
    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100vh', position: 'relative' }}
                center={currentPosition}
                zoom={18}
                onUnmount={onUnmount}
                onClick={onMapClick}
            >

                {markers.map((marker:any) => (
                    <MarkerF position={{ lat: marker.lat, lng: marker.lng}} key = {marker.lat}/>
                ))}

                <Center moveMap={moveCenterCurrentPosition} />
            </GoogleMap>
        </>

    ) : <></>
}

export default GoogleMaps;