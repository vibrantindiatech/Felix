import React, { useRef, useEffect } from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Footer = () => {
    const footerRef = useRef(null);

    // Simple fade-in only, NO scroll trigger to prevent hiding
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(footerRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    delay: 0.5 // Wait for page content to load a bit
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const socialLinks = [
        { icon: <Instagram size={18} />, href: "https://www.instagram.com/felixbysagar/" },
        { icon: <Facebook size={18} />, href: "https://www.facebook.com/share/1KqyfvbKd6/" }
    ];

    return (
        <footer ref={footerRef} className="bg-[#050f1e] text-gray-300 relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6 pt-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex flex-col items-start leading-none group mb-10 transition-all duration-300">
                            <span className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter group-hover:text-accent transition-colors mb-1.5">
                                FELIX
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="h-[2px] w-6 bg-accent/60 group-hover:w-10 transition-all"></div>
                                <span className="text-[12px] md:text-[14px] font-light text-accent/90 tracking-[0.4em] uppercase">
                                    by Sagar
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed mb-8 text-gray-400 font-light">
                            Felix by Sagar is a premier immigration consultancy dedicated to realizing your global dreams. With a 98% success rate, we are your trusted bridge to a new life abroad.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-all duration-300 hover:-translate-y-1"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-white font-heading text-lg mb-6 font-bold">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'About Us', path: '/about' },
                                { name: 'Why Choose Us', path: '/why-us' },
                                { name: 'Blog & News', path: '/blog' },
                                { name: 'Testimonials', path: '/testimonials' },
                                { name: 'Contact Support', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="flex items-center hover:text-accent transition-colors text-sm font-light group w-fit">
                                        <ArrowRight size={14} className="mr-2 text-accent/50 group-hover:text-accent transition-all group-hover:translate-x-1" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-white font-heading text-lg mb-6 font-bold">Our Services</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Study Visa', path: '/services/study' },
                                { name: 'Work Visa', path: '/services/work' },
                                { name: 'Tourist Visa', path: '/services/tourist' },
                                { name: 'Business Visa', path: '/services/business' },
                                { name: 'Permanent Residency', path: '/services/pr' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="flex items-center hover:text-accent transition-colors text-sm font-light group w-fit">
                                        <ArrowRight size={14} className="mr-2 text-accent/50 group-hover:text-accent transition-all group-hover:translate-x-1" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div>
                        <h4 className="text-white font-heading text-lg mb-6 font-bold">Get in Touch</h4>
                        <ul className="space-y-5 text-sm font-light">
                            <li className="flex items-start group">
                                <div className="mt-1 mr-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors">
                                    <MapPin size={16} />
                                </div>
                                <span className="text-gray-400 group-hover:text-white transition-colors">
                                    Hill Town Impressa Shop No.516, 5th Floor, Opp. Parikh Hospital, Nr. Suvas Scala, Gangotri Circle Road, Nikol, Ahmedabad-382350, Gujarat, India.
                                </span>
                            </li>
                            <li className="flex items-center group">
                                <div className="mr-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors">
                                    <Phone size={16} />
                                </div>
                                <span className="text-gray-400 group-hover:text-white transition-colors">+91 97149 11022</span>
                            </li>
                            <li className="flex items-center group">
                                <div className="mr-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors">
                                    <Mail size={16} />
                                </div>
                                <span className="text-gray-400 group-hover:text-white transition-colors">felixbysagar@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light tracking-wide">
                    <p>&copy; {new Date().getFullYear()} Felix by Sagar. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 translate-y-1/2"></div>
        </footer>
    );
};

export default Footer;
