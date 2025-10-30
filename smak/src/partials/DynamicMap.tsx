import Map, { Source, Layer, Marker } from "react-map-gl/mapbox";
import { useDynamicMap } from "../context/DynamicMapProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "../config/Config";
import MapMarker from "../components/MapMarker";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface DynamicMapProps {
  className?: string;
}

export default function DynamicMap({ className: propClassName }: DynamicMapProps) {
  const {
    from,
    to,
    route,
    className: contextClassName,
    isLoginPage,
    mapRef
  } = useDynamicMap();

  const combinedClassName = [propClassName, contextClassName].filter(Boolean).join(' ');

  return (
    <div className={`${combinedClassName} w-100 h-100`}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 16.18071635577292,
          latitude: 58.589806397406655,
          zoom: isLoginPage ? 0 : config.initialMapZoomLevel
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        pitchWithRotate={false}
        touchPitch={false}
        dragRotate={false}
        scrollZoom={!isLoginPage}
        doubleClickZoom={!isLoginPage}
        boxZoom={!isLoginPage}
        keyboard={!isLoginPage}>

        {from && (
          <Marker
            longitude={from.coordinates[0]}
            latitude={from.coordinates[1]}
            anchor="bottom">
            <MapMarker />
          </Marker>
        )}

        {to && (
          <Marker
            longitude={to.coordinates[0]}
            latitude={to.coordinates[1]}
            anchor="bottom">
            <MapMarker />
          </Marker>
        )}

        {from && to && route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#016D85",
                "line-width": 4,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}