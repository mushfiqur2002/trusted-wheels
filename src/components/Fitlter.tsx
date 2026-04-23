"use client"
import { useState } from "react"
import { Checkbox } from "./ui/checkbox";
import { carInfo } from "@/constants";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Fitlter() {
    const uniqueBodyStyle = [...new Set(carInfo.map(car => car.bodyStyle))]
    const min = 0, max = 1000;
    const [price, setPrice] = useState<number>(500);
    const [selected, setSelected] = useState<string[]>([])

    const toggle = (car: string) => {
        setSelected((prev) =>
            prev.includes(car)
                ? prev.filter((c) => c !== car)
                : [...prev, car]
        )
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
                        <AccordionTrigger>
                            <p className="capitalize text-[18px] font-medium">body style</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="mt-2 space-y-2">
                                {uniqueBodyStyle.map((car: string | undefined, index: number) => {
                                    if (!car) return null
                                    const isChecked = selected.includes(car)

                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={() => toggle(car)}
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
                                                {car}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* made by */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="made by">
                        <AccordionTrigger>
                            <p className="capitalize text-[18px] font-medium">made by</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            Returns accepted within 30 days. Items must be unused and in original
                            packaging. Refunds processed within 5-7 business days.
                        </AccordionContent>
                    </AccordionItem>

                    {/* fuel type */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="fuel type">
                        <AccordionTrigger>
                            <p className="capitalize text-[18px] font-medium">fuel type</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            Returns accepted within 30 days. Items must be unused and in original
                            packaging. Refunds processed within 5-7 business days.
                        </AccordionContent>
                    </AccordionItem>

                    {/* year */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="year">
                        <AccordionTrigger>
                            <p className="capitalize text-[18px] font-medium">year</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            Returns accepted within 30 days. Items must be unused and in original
                            packaging. Refunds processed within 5-7 business days.
                        </AccordionContent>
                    </AccordionItem>

                    {/* transmission */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="transmission">
                        <AccordionTrigger>
                            <p className="capitalize text-[18px] font-medium">transmission</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            Returns accepted within 30 days. Items must be unused and in original
                            packaging. Refunds processed within 5-7 business days.
                        </AccordionContent>
                    </AccordionItem>

                    {/* engine cylinder */}
                    <AccordionItem
                        className={`w-full h-auto p-3 shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.1)] rounded-lg border-none`}
                        value="engine cylinder">
                        <AccordionTrigger>
                            <p className="capitalize text-[18px] font-medium">engine cylinders</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            Returns accepted within 30 days. Items must be unused and in original
                            packaging. Refunds processed within 5-7 business days.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
        </div>
    )
}
