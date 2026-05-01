"use client"
import { useState } from "react"
import { Checkbox } from "./ui/checkbox";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { uniqueBodyStyle, uniqueBrand, uniqueEngine, uniqueFuelType, uniqueTransmission } from "@/constants/filterData";

type FilterCategories = {
    bodyStyle: string[]
    brand: string[]
    fuelType: string[]
    transmission: string[]
    engine: string[]
}

export default function Filter() {
    const min = 0, max = 1000;
    const [price, setPrice] = useState<number>(500);
    const [selected, setSelected] = useState<FilterCategories>({
        bodyStyle: [],
        brand: [],
        fuelType: [],
        transmission: [],
        engine: []
    })

    const toggle = (item: string, category: keyof FilterCategories) => {
        setSelected((prev) => ({
            ...prev,
            [category]: prev[category].includes(item)
                ? prev[category].filter((c) => c !== item)
                : [...prev[category], item]
        }))
    }

    return (
        <div className="w-full px-5 py-4 rounded-xl flex flex-col">
            <h1 className="capitalize text-[20px] font-semibold">Filter</h1>
            <div className="w-full mt-2">
                {/* inpute range */}
                <div className="w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg">
                    <p className="capitalize text-[18.5px] text-medium font-medium">price</p>
                    <label htmlFor="username">{price}</label>
                    <input type="range"
                        min={min}
                        max={max}
                        step={100}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        style={{
                            background: `linear-gradient(
                            to right,
                                        #212121 0%,
                                        #212121 ${(price / max) * 96}%,
                                        #f5f5f5 ${(price / max) * 96}%,
                                        #f5f5f5 100%)`,
                        }}
                        className="
    w-full cursor-pointer appearance-none rounded-full

    [&::-webkit-slider-runnable-track]:h-2
    [&::-webkit-slider-runnable-track]:bg-[rgba(0,0,0,.1)]
    [&::-webkit-slider-runnable-track]:rounded-full

    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-[#f5f5f5]
    [&::-webkit-slider-thumb]:border
    [&::-webkit-slider-thumb]:border-[2px]
    [&::-webkit-slider-thumb]:border-[rgba(240,31,11,1)]
    [&::-webkit-slider-thumb]:mt-[-4px]

    [&::-moz-range-track]:h-2
    [&::-moz-range-track]:bg-[rgba(0,0,0,0.1)]
    [&::-moz-range-track]:rounded-full

    [&::-moz-range-thumb]:h-4
    [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-[#f5f5f5]
    [&::-moz-range-thumb]:border
    [&::-moz-range-thumb]:border-[rgba(240,31,11,1)]
                        "
                    />
                </div>

                <Accordion className={`gap-4 mt-4`}>
                    {/* body style */}
                    <AccordionItem
                        className={`w-full p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="body style">
                        <AccordionTrigger className={'p-0'}>
                            <p className="capitalize text-[18px] font-medium">body style</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="mt-2 space-y-2">
                                {uniqueBodyStyle.map((bodyStyle: string | undefined, index: number) => {
                                    if (!bodyStyle) return null
                                    const isChecked = selected.bodyStyle.includes(bodyStyle)

                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={() => toggle(bodyStyle, 'bodyStyle')}
                                                id={`${index}`}
                                                className="cursor-pointer"
                                            />

                                            <label
                                                htmlFor={`${index}`}
                                                className={`uppercase text-[18px] font-medium cursor-pointer transition-colors ${isChecked
                                                    ? "text-[rgba(33,33,33,1)]"
                                                    : "text-[rgba(0,0,0,.35)]"
                                                    }`}
                                            >
                                                {bodyStyle}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* brand */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="made by">
                        <AccordionTrigger className={'p-0'}>
                            <p className="capitalize text-[18px] font-medium">brand</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="mt-2 space-y-2">
                                {uniqueBrand.map((brand: string | undefined, index: number) => {
                                    if (!brand) return null
                                    const isChecked = selected.brand.includes(brand)

                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={() => toggle(brand, 'brand')}
                                                id={`${index}`}
                                                className="cursor-pointer"
                                            />

                                            <label
                                                htmlFor={`${index}`}
                                                className={`uppercase text-[18px] font-medium cursor-pointer transition-colors ${isChecked
                                                    ? "text-[rgba(33,33,33,1)]"
                                                    : "text-[rgba(0,0,0,.35)]"
                                                    }`}
                                            >
                                                {brand}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* fuel type */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="fuel type">
                        <AccordionTrigger className={'p-0'}>
                            <p className="capitalize text-[18px] font-medium">fuel type</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="mt-2 space-y-2">
                                {uniqueFuelType.map((fuel: string | undefined, index: number) => {
                                    if (!fuel) return null
                                    const isChecked = selected.fuelType.includes(fuel)

                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={() => toggle(fuel, 'fuelType')}
                                                id={`${index}`}
                                                className="cursor-pointer"
                                            />

                                            <label
                                                htmlFor={`${index}`}
                                                className={`uppercase text-[18px] font-medium cursor-pointer transition-colors ${isChecked
                                                    ? "text-[rgba(33,33,33,1)]"
                                                    : "text-[rgba(0,0,0,.35)]"
                                                    }`}
                                            >
                                                {fuel}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* transmission */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="transmission">
                        <AccordionTrigger className={'p-0'}>
                            <p className="capitalize text-[18px] font-medium">transmission</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="mt-2 space-y-2">
                                {uniqueTransmission.map((transmission: string | undefined, index: number) => {
                                    if (!transmission) return null
                                    const isChecked = selected.transmission.includes(transmission)

                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={() => toggle(transmission, 'transmission')}
                                                id={`${index}`}
                                                className="cursor-pointer"
                                            />

                                            <label
                                                htmlFor={`${index}`}
                                                className={`uppercase text-[18px] font-medium cursor-pointer transition-colors ${isChecked
                                                    ? "text-[rgba(33,33,33,1)]"
                                                    : "text-[rgba(0,0,0,.35)]"
                                                    }`}
                                            >
                                                {transmission}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* engine cylinder */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="engine cylinder">
                        <AccordionTrigger className={'p-0'}>
                            <p className="capitalize text-[18px] font-medium">engine cylinders</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="mt-2 space-y-2">
                                {uniqueEngine.map((engine: string | undefined, index: number) => {
                                    if (!engine) return null
                                    const isChecked = selected.engine.includes(engine)

                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={() => toggle(engine, 'engine')}
                                                id={`${index}`}
                                                className="cursor-pointer"
                                            />

                                            <label
                                                htmlFor={`${index}`}
                                                className={`uppercase text-[18px] font-medium cursor-pointer transition-colors ${isChecked
                                                    ? "text-[rgba(33,33,33,1)]"
                                                    : "text-[rgba(0,0,0,.35)]"
                                                    }`}
                                            >
                                                {engine}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
        </div>
    )
}
