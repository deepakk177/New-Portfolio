import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import RevealText from './RevealText';

const Hero = () => {
    const M = motion;
    const line1 = "WE BUILD";
    const line2 = "Digital";
    const line3 = "EXPERIENCES";

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div className="container mx-auto px-6 z-10">
                <div className="max-w-5xl">
                    <RevealText>
                        <p className="text-muted uppercase tracking-[0.5em] mb-8 text-xs font-semibold">
                            Creative Developer & Designer
                        </p>
                    </RevealText>

                    <div className="mb-12">
                        <RevealText delay={0.1}>
                            <h1 className="h-xl flex flex-wrap gap-x-4">
                                {line1.split(" ").map((word, i) => (
                                    <span key={i}>{word}</span>
                                ))}
                            </h1>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <h1 className="h-xl italic font-serif normal-case text-muted -mt-2">
                                {line2}
                            </h1>
                        </RevealText>
                        <RevealText delay={0.3}>
                            <h1 className="h-xl -mt-2">
                                {line3}
                            </h1>
                        </RevealText>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-16">
                        <RevealText delay={0.5}>
                            <p className="max-w-sm text-gray-500 leading-relaxed uppercase text-[10px] tracking-widest font-medium leading-[2]">
                                Designing interfaces that feel alive. Combining motion with minimalistic design to create premium digital products.
                            </p>
                        </RevealText>

                        <RevealText delay={0.6}>
                            <a href="#work" className="interactive block">
                                <MagneticButton className="border-none px-0 py-0 flex items-center space-x-6 group">
                                    <span className="uppercase text-xs tracking-[0.4em] font-bold">View Projects</span>
                                    <div className="w-16 h-px bg-white group-hover:w-20 transition-all duration-500" />
                                </MagneticButton>
                            </a>
                        </RevealText>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                <h2 className="text-[50vw] font-bold uppercase tracking-tighter select-none">
                    DEE
                </h2>
            </div>
        </section>
    );
};

export default Hero;
