import React from 'react'

type NumberFormatProps = {
    value: number
}

export default function NumberFormat({ value }: NumberFormatProps) {
    let num = value
    let suffix = ""

    if (value >= 1_000_000_000) {
        num = value / 1_000_000_000
        suffix = "B"
    } else if (value >= 1_000_000) {
        num = value / 1_000_000
        suffix = "M"
    } else if (value >= 1_000) {
        num = value / 1_000
        suffix = "K"
    }

    return (
        <div>
            {num.toFixed(1).replace(/\.0$/, '')}{suffix}
        </div>
    )
}