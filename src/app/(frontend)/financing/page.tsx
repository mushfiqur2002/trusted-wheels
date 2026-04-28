import Form from "./components/Form";
import Hero from "./components/Hero";

export default function page() {
    return (
        <div className='className="text-[var(--secondary-text-color)] bg-[var(--primary-background-color)]'>
            <Hero />
            <Form />
        </div>
    )
}
