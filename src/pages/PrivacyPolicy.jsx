import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Shield, Lock, Eye, FileText, Database, ShieldAlert } from 'lucide-react';

const PrivacyPolicy = () => {
    const headerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
            gsap.fromTo(".policy-card",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
            );
        });
        return () => ctx.revert();
    }, []);

    const sections = [
        {
            icon: <Database />,
            title: "Data Collection Protocol",
            content: "We collect essential identification data (Name, Passport Details, Contact Info) required for strategic visa processing. This information is gathered solely to facilitate your global transition and is never shared with unauthorized operatives."
        },
        {
            icon: <Lock />,
            title: "Security Infrastructure",
            content: "All client intel is stored behind 256-bit AES encryption. Our servers are monitored 24/7 to prevent any breach of confidentiality. We treat your personal data with the same level of security as a tactical deployment."
        },
        {
            icon: <Eye />,
            title: "Intel Usage",
            content: "Your data is used to optimize your application success rate, provide mission-critical updates, and manage your account within the Felix Visa ecosystem. We do not sell your personal data to high-frequency marketing firms."
        },
        {
            icon: <ShieldAlert />,
            title: "Third-Party Sharing",
            content: "Information is only transmitted to official government embassies, certified partner universities, and relevant financial institutions required for your specific visa category. All partners must adhere to our strict data integrity protocols."
        },
        {
            icon: <Shield />,
            title: "Your Operational Rights",
            content: "As a client of Felix by Sagar, you have the right to request a full transcript of your data, update your file at any time, or request the dissolution of your digital record once mission goals are achieved."
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-primary">
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-600/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
                <div ref={headerRef} className="text-center mb-20">
                    <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black mb-4 block">Data Integrity Protocol</span>
                    <h1 className="text-5xl md:text-8xl font-heading font-black text-white mb-6 uppercase tracking-tighter">
                        Privacy <span className="text-gradient">Command</span>
                    </h1>
                    <div className="h-1 w-24 bg-accent mx-auto mb-8 rounded-full"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Establishing the framework for secure data transmission and client confidentiality within the Felix ecosystem.
                    </p>
                </div>

                <div ref={contentRef} className="max-w-4xl mx-auto space-y-6">
                    {sections.map((section, index) => (
                        <div key={index} className="policy-card bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2rem] backdrop-blur-3xl hover:border-accent/30 transition-all duration-500 group">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                                <div className="p-4 bg-accent/10 rounded-2xl w-fit h-fit text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                                    {React.cloneElement(section.icon, { size: 32 })}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-heading font-bold text-white mb-4 uppercase tracking-tight">{section.title}</h3>
                                    <p className="text-gray-400 font-light leading-loose text-lg">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="policy-card bg-accent/5 border border-accent/20 p-10 rounded-[2.5rem] mt-12 text-center">
                        <h4 className="text-white font-bold mb-2">Protocol Version: 2.1.0</h4>
                        <p className="text-gray-400 text-sm font-light">Last Strategic Update: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
