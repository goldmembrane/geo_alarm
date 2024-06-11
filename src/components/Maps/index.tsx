'use client';
import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';


const GoogleMaps = ():JSX.Element => {

    /** 기본 지도 설정 값 */
    const defaultProps = {
        center: {
            lat: 37.514575,
            lng: 127.0495556
        },
        zoom: 11
    };

    const [currentPosition, setCurrentPosition] = useState<any>({});

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess)
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

    return (
        <div style = {{ width: '100%', height: '100vh' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ''}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                center={currentPosition}
                zoom={16}
            >

            </GoogleMapReact>
        </div>
    )
}

export default GoogleMaps;