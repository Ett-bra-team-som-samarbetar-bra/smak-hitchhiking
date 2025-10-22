import { useEffect, useRef, useState } from "react";
import Map, { Source, Layer, Marker, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface DynamicMapProps  {
    from: string;
    to: string;
}

export default function DynamicMap({ from, to }: DynamicMapProps) {
    const [route, setRoute] = useState<any>(null);
    const [start, setStart] = useState<number[] | null>(null);
    const [end, setEnd] = useState<number[] | null>(null);
    const [longitudes, setLongitudes] = useState<number>();
    const [latitudes, setLatitudes] = useState<number>();
    const mapRef = useRef<MapRef>(null);

    const fetchRoute = async(fromCity: string, toCity: string) => {

        try {

            const geocode = async(place: string) => {
                const res = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                        place
                    )}.json?access_token=${MAPBOX_TOKEN}`
                );
                const data = await res.json();
                return data.features?.[0]?.geometry?.coordinates;
            };
            
            const [fromCoords, toCoords] = await Promise.all([
                geocode(fromCity),
                geocode(toCity),
            ]);
            
            if (!fromCoords || !toCoords) {
                alert("Could not find one of the locations.");
                return;
            }
            
            setStart(fromCoords);
            setEnd(toCoords);
            
            const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
            const res = await fetch(routeUrl);
            const data = await res.json();
            const newRoute = data.routes[0].geometry;
            setRoute(newRoute);
            
            const coords = newRoute.coordinates;
            const longitudes = coords.map((c: number[]) => c[0]);
            setLongitudes(longitudes);
            const latitudes = coords.map((c: number[]) => c[1]);
            setLatitudes(latitudes);
            const bounds: [[number, number], [number, number]] = [
                [Math.min(...longitudes), Math.min(...latitudes)],
                [Math.max(...longitudes), Math.max(...latitudes)],
            ];
            mapRef.current?.fitBounds(bounds, { padding: 60, duration: 1500 });
        } catch (err) {
            console.error("Error fetching route:", err);
        };
    };

    useEffect(() => {
        fetchRoute(from, to);
    }, [from, to]);

    return (
        <div>
            <Map ref={mapRef}
            initialViewState={{
                longitude: longitudes,
                latitude: latitudes,}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                >
                    {route && (
                        <>
                            <Source id="route" type="geojson" data={route}>
                                <Layer id="route-line"
                                type="line"
                                paint={{
                                    "line-color": "#007cbf",
                                    "line-width": 4,
                                }}></Layer>
                            </Source>

                            {start && ( 
                                <Marker longitude={start[0]} latitude={start[1]}></Marker>
                            )}
                        </>
                    )}

            </Map>
        </div>
    )

}