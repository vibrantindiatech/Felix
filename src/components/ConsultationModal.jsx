import React, { useState, useEffect } from 'react';
import { X, Send, User, Mail, Phone, Globe, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

const ConsultationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        visaCategory: '',
        destination: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(".modal-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(".modal-content", { scale: 0.9, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // WhatsApp message construction - Synchronized with Contact.jsx formatting
        const message =
            `🚀 FELIX BY SAGAR - CONSULTATION REQUEST%0A%0A` +
            `----------------------------------%0A%0A` +
            `👤 CUSTOMER PROFILE%0A%0A` +
            `NAME: ${formData.name.toUpperCase()}%0A` +
            `EMAIL: ${formData.email}%0A` +
            `PHONE: ${formData.phone}%0A%0A%0A` +

            `📍 SERVICE DETAILS%0A%0A` +
            `VISA TYPE: ${formData.visaCategory || "Not Specified"}%0A` +
            `DESTINATION: ${formData.destination || "Not Specified"}%0A%0A%0A` +

            `📝 CLIENT MESSAGE%0A%0A` +
            `\"${formData.message || "Priority Consultation Requested."}\"%0A%0A%0A` +

            `----------------------------------%0A%0A` +
            `SENT ON: ${new Date().toLocaleString()}%0A` +
            `Felix Visa Solutions - Official Website`;

        const whatsappUrl = `https://wa.me/919714911022?text=${message}`;

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            window.open(whatsappUrl, '_blank');

            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setFormData({ name: '', email: '', phone: '', visaCategory: '', destination: '', message: '' });
            }, 3000);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="modal-overlay fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#050f1e]/40 backdrop-blur-[12px] cursor-pointer"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="modal-content relative w-full max-w-2xl bg-[#0a192f]/95 border border-white/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,215,0,0.05)] overflow-hidden cursor-default"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-30 p-2 bg-white/5 hover:bg-accent hover:text-primary rounded-full transition-all duration-300"
                >
                    <X size={20} />
                </button>

                {/* Form Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] -ml-20 -mb-20"></div>

                {isSuccess ? (
                    <div className="p-12 text-center flex flex-col items-center animate-fadeIn">
                        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-8">
                            <CheckCircle size={64} />
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-4">Transmission Successful</h2>
                        <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                            Your deployment request has been encrypted and sent to Sagar. You are now being redirected to the secure WhatsApp channel.
                        </p>
                        <div className="h-1 w-32 bg-accent/30 rounded-full overflow-hidden">
                            <div className="h-full bg-accent animate-progress"></div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 md:p-12 relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldCheck size={18} className="text-accent" />
                            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-black">Secure Request Terminal</span>
                        </div>
                        <h2 className="text-3xl font-heading font-black text-white mb-8 uppercase tracking-tighter">
                            Initiate <span className="text-gradient">Consultation</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:bg-white/15 transition-all font-light"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Email Intel</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            required
                                            type="email"
                                            placeholder="intel@domain.com"
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:bg-white/15 transition-all font-light"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+91 00000 00000"
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:bg-white/15 transition-all font-light"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Visa Category</label>
                                    <div className="relative">
                                        <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <select
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:bg-white/15 transition-all font-light appearance-none"
                                            value={formData.visaCategory}
                                            onChange={(e) => setFormData({ ...formData, visaCategory: e.target.value })}
                                        >
                                            <option value="" className="bg-[#0a192f]">Select Visa Type</option>
                                            <option value="Study" className="bg-[#0a192f]">Study Visa</option>
                                            <option value="Work" className="bg-[#0a192f]">Work Visa</option>
                                            <option value="Tourist" className="bg-[#0a192f]">Tourist Visa</option>
                                            <option value="Business" className="bg-[#0a192f]">Business Visa</option>
                                            <option value="PR" className="bg-[#0a192f]">Permanent Residency</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Client Message (Optional)</label>
                                <div className="relative">
                                    <MessageSquare size={16} className="absolute left-4 top-4 text-gray-300" />
                                    <textarea
                                        rows="3"
                                        placeholder="Describe your destination or specific requirements..."
                                        className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:bg-white/15 transition-all font-light resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                disabled={isSubmitting}
                                className="w-full py-4 bg-accent text-primary font-black uppercase tracking-widest rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-500 flex items-center justify-center gap-2 group"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>Execute Mission Inquiry <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                )}
                            </button>

                            <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                                Fast Response Action Guaranteed
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationModal;
