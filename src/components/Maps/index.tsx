'use client';
import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
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

    const [currentPosition, setCurrentPosition] = useState<any>({});
    const [markerPosition, setMarkerPosition] = useState<any>({});

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

    const handleApiLoaded = (map: any, maps: any) => {
        // Use the map and maps objects here if needed
    };

    /** 지도가 이동할 때마다 center 값을 update하는 함수 */
    const handleMapChange = ({ center }: any) => {
        setCurrentPosition(center)
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
    /** 유저의 현재 위치를 표시하는 marker를 render하는 함수 */
    const renderMarkers = (map: any, maps: any) => {
        let marker = new maps.Marker({
        position: { lat: markerPosition.lat, lng: markerPosition.lng },
        map,
        title: 'Hello World!'
        });
        return marker;
    };

    return (
        <div style = {{ width: '100%', height: '100vh', position: 'relative'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ''}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                center={currentPosition}
                zoom={16}
                onChange={handleMapChange}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
            
            </GoogleMapReact>

            <Center moveMap={moveCenterCurrentPosition} />
        </div>
    )
}

export default GoogleMaps;