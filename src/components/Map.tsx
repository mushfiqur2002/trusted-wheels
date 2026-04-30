"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"
import AnimatedMarker from "./AnimatedMarker"

import { useMap } from "react-leaflet"
import { useEffect, useState } from "react"

interface MarkerTrackerProps {
    latlng: [number, number]
    setPos: (point: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void
}
function GlobalKeyboardZoom() {
    const map = useMap();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "+" || e.key === "=") {
                map.zoomIn();
            } else if (e.key === "-") {
                map.zoomOut();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [map]);

    return null;
}

function MarkerTracker({ latlng, setPos }: MarkerTrackerProps) {
    const map = useMap()

    useEffect(() => {
        const update = () => {
            const point = map.latLngToContainerPoint(latlng)
            setPos((prev: { x: number; y: number }) => {
                if (prev?.x === point.x && prev?.y === point.y) return prev;
                return point;
            });
        }

        update()
        map.on("move zoom", update)

        return () => {
            map.off("move zoom", update)
        }
    }, [map, latlng, setPos])

    return null
}


function OffsetView() {
    const map = useMap()

    useEffect(() => {
        // move map UP → marker appears LOWER
        map.panBy([0, -100]) // [x, y]
    }, [map])

    return null
}

export default function Map() {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const latlng: [number, number] = [23.793277151862455, 90.35327911362343]
    return (
        <div className="w-full lg:h-[700px] md:h-[600px] h-[550px] relative">
            <MapContainer
                center={latlng}
                zoom={13}
                scrollWheelZoom={false}
                className="w-full h-full"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerTracker latlng={latlng} setPos={setPos} />
                <OffsetView />
                <GlobalKeyboardZoom />
            </MapContainer>
            <AnimatedMarker pos={pos} />
        </div>
    )
}