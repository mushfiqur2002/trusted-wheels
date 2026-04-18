"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import AnimatedMarker from "./AnimatedMarker"

import { useMap } from "react-leaflet"
import { useEffect, useState } from "react"

interface MarkerTrackerProps {
    latlng: [number, number]
    setPos: (point: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void
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
        map.panBy([0, -150]) // [x, y]
    }, [map])

    return null
}

export default function Map() {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const latlng: [number, number] = [10.505, -0.09]
    return (
        <div className="w-full h-[700px] relative">
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
            </MapContainer>
            <AnimatedMarker pos={pos} />
        </div>
    )
}