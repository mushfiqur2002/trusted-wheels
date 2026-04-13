// components/Price.tsx
type Props = {
    value: number
}

export default function Price({ value }: Props) {
    const formatted = new Intl.NumberFormat('en-US').format(value)

    return <span>${formatted}</span>
}