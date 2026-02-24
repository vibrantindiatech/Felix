import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Gavel, Scale, FileSignature, AlertTriangle, Briefcase, Globe } from 'lucide-react';

const TermsOfService = () => {
    const headerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
            gsap.fromTo(".terms-card",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
            );
        });
        return () => ctx.revert();
    }, []);

    const terms = [
        {
            icon: <Scale />,
            title: "Operational Framework",
            content: "By engaging with Felix by Sagar, you enter into a strategic partnership. You agree to provide 100% authentic intelligence (documents) and adhere to the tactical timelines set by our consultation team."
        },
        {
            icon: <Briefcase />,
            title: "Scope of Deployment",
            content: "Our services include university selection, structural documentation review, and student/work visa filing. We serve as expert conduits; the final decision on visa issuance remains with the sovereign embassy of the destination country."
        },
        {
            icon: <FileSignature />,
            title: "Client Obligations",
            content: "The client is responsible for the legal integrity of all submitted files. Any attempt to provide fraudulent intel will result in immediate mission termination and possible reports to relevant legal jurisdictions."
        },
        {
            icon: <Globe />,
            title: "Financial Protocols",
            content: "Deployment fees are structured based on the complexity of the visa target. Payments are non-refundable once mission operations (filing/review) have commenced. Official embassy fees are separate from consultancy charges."
        },
        {
            icon: <AlertTriangle />,
            title: "Risk Assessment",
            content: "While our success rate is 98%, visa outcomes are never guaranteed. Felix by Sagar shall not be liable for losses resulting from embassy rejections, policy shifts, or international travel restrictions."
        },
        {
            icon: <Gavel />,
            title: "Legal Jurisdiction",
            content: "These terms are governed by the laws of the Republic of India. Any disputes arising from this engagement shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat."
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-primary">
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-accent/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
                <div ref={headerRef} className="text-center mb-20">
                    <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black mb-4 block">Operational Framework</span>
                    <h1 className="text-5xl md:text-8xl font-heading font-black text-white mb-6 uppercase tracking-tighter">
                        Terms of <span className="text-gradient">Engagement</span>
                    </h1>
                    <div className="h-1 w-24 bg-accent mx-auto mb-8 rounded-full"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Defining the legal and operational boundaries for all consulting operations conducted by Felix by Sagar.
                    </p>
                </div>

                <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {terms.map((term, index) => (
                        <div key={index} className="terms-card bg-[#0a192f]/60 border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-3xl hover:border-accent/30 transition-all duration-500 group">
                            <div className="p-4 bg-accent/10 rounded-2xl w-fit mb-6 text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                                {React.cloneElement(term.icon, { size: 28 })}
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-tight">{term.title}</h3>
                            <p className="text-gray-400 font-light leading-relaxed text-base">
                                {term.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="terms-card max-w-4xl mx-auto mt-16 p-8 rounded-3xl border border-white/5 bg-white/[0.01] text-center">
                    <p className="text-gray-500 text-sm font-light italic">
                        By continuing to use our portal or services, you acknowledge that you have read, understood, and agreed to these strategic terms.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
