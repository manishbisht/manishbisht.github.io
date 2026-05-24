import Hero from "../../components/Hero";
import Timeline from "../../components/Timeline";
import { OPEN_SOURCE, TIMELINE } from "../../components/Timeline/constants";
import Skills from "../../components/Skills";

export default function Home() {
    return (
        <>
            <Hero />
            <Timeline
                id="experience"
                eyebrow="EXPERIENCE"
                title="A decade across product, platform, and engineering leadership."
                lede="From founding Run4Offers and early startup engineering to leading VideoVerse teams, with production work across media, ticketing, fintech, SaaS, and developer platforms."
                items={TIMELINE}
            />
            <Timeline
                id="open-source"
                eyebrow="OPEN SOURCE"
                title="Two summers in the open source."
                lede="Google Summer of Code 2017 on phpmyadmin core, then a 6-week Facebook Open Source mentorship in 2018 contributing to Facebook Instant Articles."
                items={OPEN_SOURCE}
            />
            <Skills />
        </>
    );
}
