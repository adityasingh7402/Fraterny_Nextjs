"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Send, User, Mail, Phone, Globe, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react'
import Navigation from '../website-navigation/components/Navigation'
import Footer from '../website-navigation/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import Image from 'next/image'

const PartnerPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        description: '',
    });
    const [socialLinks, setSocialLinks] = useState(['']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialLinkChange = (index: number, value: string) => {
        const newLinks = [...socialLinks];
        newLinks[index] = value;
        setSocialLinks(newLinks);
    };

    const addSocialLink = () => {
        if (socialLinks.length < 3) {
            setSocialLinks([...socialLinks, '']);
        }
    };

    const removeSocialLink = (index: number) => {
        if (socialLinks.length > 1) {
            setSocialLinks(socialLinks.filter((_, i) => i !== index));
        } else {
            const newLinks = [...socialLinks];
            newLinks[0] = '';
            setSocialLinks(newLinks);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/partner/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    contact: formData.contact,
                    socialLinks: socialLinks,
                    description: formData.description,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitted(true);
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    contact: '',
                    description: '',
                });
                setSocialLinks(['']);
            } else {
                setError(result.error || 'Failed to submit application. Please try again.');
            }
        } catch (err) {
            console.error('Error submitting application:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f7f7] font-gilroy-medium selection:bg-violet-200">
            <CustomCursor />
            <Navigation />

            <main className="pt-20 pb-8 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row bg-white rounded-4xl shadow-2xl overflow-hidden border border-neutral-100 min-h-[600px]">

                    {/* Left Side: Content & Image */}
                    <div className="lg:w-1/2 relative bg-black text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                        {/* Background Image/Gradients */}
                        <div className="absolute inset-0 opacity-40 z-0">
                            <Image
                                src="/partnership_premium_abstract.png"
                                alt="Partnership Background"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20"
                                >
                                    <Sparkles className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm font-gilroy-bold tracking-widest uppercase">Collaborate with us</span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-5xl md:text-7xl font-gilroy-bold leading-tight mb-6"
                                >
                                    Partner with <span className="text-transparent bg-clip-text bg-[linear-gradient(157deg,var(--color-emerald-300),var(--color-violet-500))]">Quest</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg text-neutral-400 max-w-lg leading-relaxed mb-8"
                                >
                                    Join our ecosystem as a partner and help us redefine how ambitious individuals understand their psychology, identity, and growth.
                                </motion.p>

                                <div className="space-y-8">
                                    {[
                                        { title: "Unique Insights", desc: "Access world-class psychological mapping tools for your audience." },
                                        { title: "Precision & Depth", desc: "A product built for deep thinkers and high-achieving individuals." },
                                        { title: "Shared Impact", desc: "Scale the reach of introspective intelligence globally." }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="flex items-start space-x-4"
                                        >
                                            <div className="mt-1 bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-gilroy-bold text-white">{item.title}</h3>
                                                <p className="text-neutral-400 text-sm">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="pt-12 border-t border-white/10 mt-12"
                            >
                                <p className="text-neutral-500 text-xs">
                                    © {new Date().getFullYear()} Quest | Powered by Fraterny
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-gilroy-bold text-black mb-1">Apply for Partnership</h2>
                                        <p className="text-neutral-500 text-sm">Fill in the details below and our team will get back to you shortly.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-gilroy-bold text-neutral-700 uppercase tracking-wider">First Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                                    <input
                                                        required
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        placeholder="John"
                                                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-gilroy-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-gilroy-bold text-neutral-700 uppercase tracking-wider">Last Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                                    <input
                                                        required
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        placeholder="Doe"
                                                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-gilroy-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-gilroy-bold text-neutral-700 uppercase tracking-wider">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="john@example.com"
                                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-gilroy-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-gilroy-bold text-neutral-700 uppercase tracking-wider">Contact Info <span className="text-neutral-400 text-[10px]">(Optional)</span></label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                                <input
                                                    type="tel"
                                                    name="contact"
                                                    value={formData.contact}
                                                    onChange={handleInputChange}
                                                    placeholder="+1 (555) 000-0000"
                                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-gilroy-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-gilroy-bold text-neutral-700 uppercase tracking-wider">Social Media Links</label>
                                            </div>
                                            <div className="space-y-4">
                                                {socialLinks.map((link, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <div className="relative grow">
                                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                                            <input
                                                                required
                                                                type="url"
                                                                value={link}
                                                                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                                                                placeholder="https://instagram.com/yourprofile"
                                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-gilroy-medium"
                                                            />
                                                        </div>

                                                        {index === socialLinks.length - 1 && socialLinks.length < 3 && (
                                                            <button
                                                                type="button"
                                                                onClick={addSocialLink}
                                                                className="p-3 bg-violet-50 text-violet-600 rounded-xl hover:bg-violet-100 transition-colors border border-violet-100"
                                                                title="Add another link"
                                                            >
                                                                <Plus className="w-5 h-5" />
                                                            </button>
                                                        )}

                                                        {socialLinks.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeSocialLink(index)}
                                                                className="p-3 bg-neutral-50 text-neutral-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors border border-neutral-100"
                                                                title="Remove link"
                                                            >
                                                                <X className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-gilroy-bold text-neutral-700 uppercase tracking-wider">Why do you want to partner with us?</label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-neutral-400" />
                                                <textarea
                                                    required
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    placeholder="Tell us what impresses you about Quest and how you can add value..."
                                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all resize-none font-gilroy-medium"
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-gilroy-medium"
                                            >
                                                {error}
                                            </motion.div>
                                        )}

                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="w-full relative group overflow-hidden bg-black text-white px-8 py-4 rounded-2xl font-gilroy-bold text-base flex items-center justify-center space-x-3 hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-70 disabled:translate-y-0"
                                        >
                                            <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    <span>Submit Application</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <h2 className="text-4xl font-gilroy-bold text-black mb-4">Request Submitted!</h2>
                                    <p className="text-neutral-500 text-lg max-w-sm mx-auto mb-10">
                                        Your partnership application has been received. We'll review it and notify you when your account is approved. Check your email for updates!
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-violet-600 font-gilroy-bold hover:underline"
                                    >
                                        Send another application
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default PartnerPage
