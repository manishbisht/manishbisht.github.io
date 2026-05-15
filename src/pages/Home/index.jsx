import Hero from "../../components/Hero";
import Timeline from "../../components/Timeline";
import {
    OPEN_SOURCE,
    TIMELINE,
} from "../../components/Timeline/constants";
import Skills from "../../components/Skills";

export default function Home() {
    return (
        <>
            <Hero />
            <Timeline
                id="experience"
                eyebrow="EXPERIENCE"
                title="Eight years of shipping into production."
                lede="From founding engineer at a 6-person startup to platform owner at a Series C."
                items={TIMELINE}
            />
            <Timeline
                id="open-source"
                eyebrow="OPEN SOURCE"
                title="Mentoring and contributing in the open."
                lede="Google Summer of Code with Anita B.org / Systers, then F8 Scholar two years running mentoring Jest and Docusaurus."
                items={OPEN_SOURCE}
            />
            <Skills />
        </>
    );
}
