"use client";
import React, { useEffect, useState } from "react";
import {
  Circle,
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

import Center from "./center";

const GoogleMaps = (): JSX.Element => {
  const [map, setMap] = useState(null);

  const [currentPosition, setCurrentPosition] = useState<any>({});
  const [markerPosition, setMarkerPosition] = useState<any>({});

  const [clickPosition, setClickPosition] = useState<any>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [markers, setMarkers] = useState<any>(null);
  const [circlePosition, setCirclePosition] = useState<any>(null);

  /** 구글 맵 클릭 시 marker를 설정하는 함수 */
  const onMapClick = (e: any) => {
    setClickPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    if (markers !== null) {
      setMarkers(null);
    }

    if (circlePosition !== null) {
      setCirclePosition(null);
    }
    setShowInfo(true);
    setCurrentPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  /** 화면 렌더링 시 현재 위치를 불러오는 함수를 실행하는 useEffect */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess);

      setInterval(() => {
        navigator.geolocation.getCurrentPosition(setUserMarkerPosition);
      }, 1000);
    }
  }, []);

  /** 현재 위치 불러오기 성공 시 호출되는 함수 */
  const getCurrentPositionSuccess = (position: any) => {
    setCurrentPosition({
      ...currentPosition,
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  /** 현재 위치 불러오기 성공 시 유저 마크 생성하는 함수 */
  const setUserMarkerPosition = (position: any) => {
    setMarkerPosition({
      ...markerPosition,
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  /** 유저 현재 위치를 중심으로 지도를 이동시키는 함수 */
  const moveCenterCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCurrentPosition(newCenter);
      });
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || "",
  });

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  /** 거리 선택지로 원 범위를 정하는 함수 */
  const [rangeCircle, setRangeCircle] = useState<number>(0);

  const [range, setRange] = useState<number>(0);

  /** 원 안에 현재 위치 마커가 들어왔는지 감지하는 함수 */
  useEffect(() => {
    setInterval(() => {
      if (range !== 0) {
        if (
          Math.pow(range, 2) >=
          Math.pow(circlePosition.lat - markerPosition.lat, 2) +
            Math.pow(circlePosition.lng - markerPosition.lng, 2)
        ) {
          if (confirm("목적지 부근에 도착하였습니다.")) {
            location.href = "http://localhost:3000";
          }
        }
      }
    }, 2000);
  }, [range]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
        center={currentPosition}
        zoom={18}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        <MarkerF
          position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
        />

        {showInfo && clickPosition !== null ? (
          <>
            <InfoWindow
              position={{ lat: clickPosition.lat, lng: clickPosition.lng }}
              onCloseClick={() => setShowInfo(false)}
            >
              <>
                <div style={{ textAlign: "center", fontSize: "20px" }}>
                  알람 범위를 설정해주세요.
                </div>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="radio"
                      checked={rangeCircle === 10}
                      value={10}
                      onChange={() => setRangeCircle(10)}
                    />

                    <div style={{ marginLeft: "10px", fontSize: "16px" }}>
                      10m
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="radio"
                      checked={rangeCircle === 50}
                      value={50}
                      onChange={() => setRangeCircle(50)}
                    />

                    <div style={{ marginLeft: "10px", fontSize: "16px" }}>
                      50m
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="radio"
                      checked={rangeCircle === 100}
                      value={100}
                      onChange={() => setRangeCircle(100)}
                    />

                    <div style={{ marginLeft: "10px", fontSize: "16px" }}>
                      100m
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="radio"
                      checked={rangeCircle === 500}
                      value={500}
                      onChange={() => setRangeCircle(500)}
                    />

                    <div style={{ marginLeft: "10px", fontSize: "16px" }}>
                      500m
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div></div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        cursor: "pointer",
                        border: "1px solid #000",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 20px",
                      }}
                      onClick={() => {
                        setRangeCircle(0);
                        setShowInfo(false);
                      }}
                    >
                      취소
                    </div>

                    <div
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        border: "1px solid #000",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 20px",
                      }}
                      onClick={(e: any) => {
                        setMarkers({
                          lat: clickPosition.lat,
                          lng: clickPosition.lng,
                        });

                        if (circlePosition !== null) {
                          setCirclePosition(null);
                        } else {
                          setCirclePosition({
                            lat: clickPosition.lat,
                            lng: clickPosition.lng,
                          });
                        }
                        setShowInfo(false);
                        setRange(rangeCircle);
                        setRangeCircle(0);
                      }}
                    >
                      설정
                    </div>
                  </div>
                </div>
              </>
            </InfoWindow>
          </>
        ) : null}
        {markers !== null && (
          <MarkerF
            position={{ lat: markers.lat, lng: markers.lng }}
            icon={{
              url: "img/marker.png",
              scaledSize: new window.google.maps.Size(36, 48),
            }}
          />
        )}
        {circlePosition !== null ? (
          <Circle
            center={{ lat: circlePosition.lat, lng: circlePosition.lng }}
            radius={
              circlePosition !== null
                ? range === 10
                  ? 10
                  : range === 50
                  ? 50
                  : range === 100
                  ? 100
                  : 500
                : 0
            }
            options={{
              strokeColor: "#0000FF",
              fillColor: "#0000FF",
              fillOpacity: 0.3,
            }}
          />
        ) : null}

        <Center moveMap={moveCenterCurrentPosition} />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default GoogleMaps;
