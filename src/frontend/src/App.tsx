import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Flower2,
  Heart,
  IndianRupee,
  Lightbulb,
  Loader2,
  MapPin,
  Menu,
  Phone,
  Shield,
  Sparkles,
  Star,
  Timer,
  Trees,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useBusinessInfo, useSubmitInquiry } from "./hooks/useQueries";

const queryClient = new QueryClient();

const SERVICES = [
  {
    id: "garden",
    icon: <Trees className="w-7 h-7" />,
    title: "Marriage Garden",
    desc: "Sprawling, landscaped garden venue with lush greenery, floral archways, and ambient lighting perfect for all wedding ceremonies.",
  },
  {
    id: "tent",
    icon: <Sparkles className="w-7 h-7" />,
    title: "Tent Decoration",
    desc: "Lavish tent setups adorned with silk drapes, marigold garlands, chandelier lights, and vibrant floral arrangements.",
  },
  {
    id: "stage",
    icon: <Flower2 className="w-7 h-7" />,
    title: "Stage & Mandap Setup",
    desc: "Elegant mandap and bridal stage designs featuring ornate carvings, flower backdrops, and traditional decor motifs.",
  },
  {
    id: "lighting",
    icon: <Lightbulb className="w-7 h-7" />,
    title: "Event Lighting",
    desc: "Magical fairy lights, LED canopies, and decorative illumination that transform any venue into a glittering dreamscape.",
  },
];

const WHY_US = [
  {
    id: "accredited",
    icon: <Shield className="w-5 h-5" />,
    label: "Accredited Business",
  },
  {
    id: "experienced",
    icon: <Star className="w-5 h-5" />,
    label: "Experienced Team",
  },
  {
    id: "affordable",
    icon: <IndianRupee className="w-5 h-5" />,
    label: "Affordable Pricing",
  },
  {
    id: "ontime",
    icon: <Timer className="w-5 h-5" />,
    label: "On-Time Delivery",
  },
  {
    id: "customers",
    icon: <Users className="w-5 h-5" />,
    label: "1000+ Happy Customers",
  },
];

const GALLERY = [
  {
    id: "garden",
    src: "/assets/generated/garden-venue.dim_600x400.jpg",
    label: "Marriage Garden",
  },
  {
    id: "tent",
    src: "/assets/generated/tent-decoration.dim_600x400.jpg",
    label: "Tent Decoration",
  },
  {
    id: "stage",
    src: "/assets/generated/stage-decor.dim_600x400.jpg",
    label: "Stage & Mandap",
  },
];

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
    eventDate: "",
  });

  const { data: businessInfo } = useBusinessInfo();
  const submitInquiry = useSubmitInquiry();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message || !form.eventDate) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitInquiry.mutateAsync(form);
      toast.success("Inquiry submitted! We'll contact you within 24 hours.");
      setForm({ name: "", phone: "", message: "", eventDate: "" });
    } catch {
      toast.error("Failed to submit. Please try calling us directly.");
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  const stats = [
    {
      id: "years",
      icon: <Clock className="w-8 h-8" />,
      stat: businessInfo
        ? `${businessInfo.yearsExperience}+ Years`
        : "20+ Years",
      label: "Experience",
    },
    {
      id: "customers",
      icon: <Users className="w-8 h-8" />,
      stat: businessInfo ? `${businessInfo.customersServed}+` : "1000+",
      label: "Happy Customers",
    },
    {
      id: "accredited",
      icon: <Shield className="w-8 h-8" />,
      stat: "Accredited",
      label: "Trusted Business",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-maroon shadow-maroon shadow-lg" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-gold">
              <Heart className="w-5 h-5 text-maroon" fill="currentColor" />
            </div>
            <div className="text-left">
              <p className="font-display font-bold text-sm leading-tight text-cream">
                Pavan Gupta
              </p>
              <p className="text-xs text-gold">Tent House & Marriage Garden</p>
            </div>
          </button>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link.id)}
                  className="text-cream/90 hover:text-gold font-medium text-sm transition-colors duration-200 hover:underline underline-offset-4"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <Button
            className="hidden md:flex bg-gold hover:bg-gold-dark text-maroon font-bold shadow-gold"
            onClick={() => scrollTo("contact")}
          >
            Book Now <ChevronRight className="w-4 h-4 ml-1" />
          </Button>

          <button
            type="button"
            className="md:hidden text-cream p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-maroon border-t border-gold/20"
            >
              <ul className="container mx-auto px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      data-ocid="nav.link"
                      onClick={() => scrollTo(link.id)}
                      className="text-cream/90 hover:text-gold font-medium w-full text-left py-2 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <Button
                    className="w-full bg-gold text-maroon font-bold"
                    onClick={() => scrollTo("contact")}
                  >
                    Book Now
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-wedding.dim_1200x600.jpg"
            alt="Wedding celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/80 via-maroon/60 to-maroon-dark/85" />
        </div>
        <div className="absolute top-1/4 left-8 w-32 h-32 rounded-full bg-gold/10 blur-2xl" />
        <div className="absolute bottom-1/3 right-12 w-48 h-48 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative z-10 text-center container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="ornamental-divider mb-6 max-w-xs mx-auto">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                Chhatarpur, Madhya Pradesh
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-cream leading-tight mb-6"
          >
            Your Dream Wedding,
            <br />
            <span className="gold-gradient">Our Promise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-cream/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            <strong className="text-gold">
              Pavan Gupta Tent House &amp; Marriage Garden
            </strong>{" "}
            — Chhatarpur's most trusted wedding planner with over 20 years of
            crafting unforgettable celebrations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              className="bg-gold hover:bg-gold-dark text-maroon font-bold px-8 py-6 text-lg shadow-gold rounded-full hover:scale-105 transition-all duration-200"
              onClick={() => scrollTo("contact")}
            >
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Book Your Event
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cream/50 text-cream hover:bg-cream/10 font-medium px-8 py-6 text-lg rounded-full"
              onClick={() => scrollTo("services")}
            >
              Explore Services
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gold/50 flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="maroon-gold-gradient py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-4 border border-gold/30">
                  {item.icon}
                </div>
                <div className="font-display text-4xl font-bold text-gold mb-1">
                  {item.stat}
                </div>
                <div className="text-cream/80 text-sm tracking-wide uppercase font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-maroon">
                <img
                  src="/assets/generated/garden-venue.dim_600x400.jpg"
                  alt="Our marriage garden"
                  className="w-full h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full maroon-gold-gradient flex flex-col items-center justify-center shadow-maroon border-4 border-cream">
                <span className="font-display text-gold text-2xl font-bold">
                  20+
                </span>
                <span className="text-cream/90 text-xs text-center leading-tight">
                  Years of Excellence
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <div className="ornamental-divider mb-4">
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium whitespace-nowrap">
                  About Us
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mb-6 leading-tight">
                Crafting Memories Since Over Two Decades
              </h2>
              <p className="text-foreground/75 text-lg leading-relaxed mb-4">
                <strong className="text-maroon">Mr. Pavan Gupta</strong> founded
                this business with a single vision — to make every wedding in
                Chhatarpur as grand and beautiful as the love it celebrates.
                Based in the heart of Madhya Pradesh, our team brings warmth,
                expertise, and meticulous attention to detail to every event.
              </p>
              <p className="text-foreground/75 leading-relaxed mb-8">
                Over 20 years and more than 1,000 families have trusted us with
                their most precious occasions. From intimate family gatherings
                to grand marriage celebrations, we deliver excellence every
                single time — on schedule, within budget, and beyond
                expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {[
                  { id: "cert", text: "Accredited & Certified" },
                  { id: "loc", text: "Chhatarpur, MP Based" },
                  { id: "cust", text: "1000+ Satisfied Families" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-gold flex-shrink-0"
                      fill="oklch(0.78 0.14 70)"
                    />
                    <span className="text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-cream-dark/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="ornamental-divider mb-4 max-w-xs mx-auto">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium whitespace-nowrap">
                Our Services
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon">
              Everything Your Event Deserves
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-maroon transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-maroon mb-6 group-hover:bg-gold group-hover:text-maroon transition-all duration-300">
                  {svc.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-maroon mb-3">
                  {svc.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="ornamental-divider mb-4 max-w-xs mx-auto">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium whitespace-nowrap">
                Gallery
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon">
              A Glimpse of Our Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {GALLERY.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ scale: 1.02 }}
                className="relative group rounded-2xl overflow-hidden shadow-card cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-display text-cream font-bold text-lg">
                    {img.label}
                  </p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-maroon/80 text-gold text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 maroon-gold-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="ornamental-divider mb-4 max-w-xs mx-auto">
              <span className="text-gold/80 text-xs tracking-[0.3em] uppercase font-medium whitespace-nowrap">
                Why Choose Us
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
              The Pavan Gupta Difference
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-gold/20 hover:border-gold/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-4">
                  {item.icon}
                </div>
                <p className="text-cream font-semibold text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="ornamental-divider mb-4 max-w-xs mx-auto">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium whitespace-nowrap">
                Get In Touch
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mb-4">
              Book Your Dream Event
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fill in your details and we'll get back to you within 24 hours to
              discuss your event plans.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-maroon font-semibold">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    data-ocid="contact.input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="border-border/60 focus-visible:ring-maroon h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-maroon font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    data-ocid="contact.input"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="border-border/60 focus-visible:ring-maroon h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="eventDate"
                    className="text-maroon font-semibold"
                  >
                    Event Date
                  </Label>
                  <Input
                    id="eventDate"
                    data-ocid="contact.input"
                    type="date"
                    value={form.eventDate}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, eventDate: e.target.value }))
                    }
                    className="border-border/60 focus-visible:ring-maroon h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-maroon font-semibold"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="contact.textarea"
                    placeholder="Tell us about your event — type, guest count, special requests..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="border-border/60 focus-visible:ring-maroon min-h-[130px]"
                    required
                  />
                </div>

                {submitInquiry.isSuccess && (
                  <div
                    data-ocid="contact.success_state"
                    className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3"
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    Inquiry submitted! We'll contact you within 24 hours.
                  </div>
                )}

                <Button
                  data-ocid="contact.submit_button"
                  type="submit"
                  size="lg"
                  className="w-full bg-maroon hover:bg-maroon-light text-cream font-bold h-12 rounded-xl shadow-maroon"
                  disabled={submitInquiry.isPending}
                >
                  {submitInquiry.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" fill="currentColor" />{" "}
                      Send Inquiry
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                <h3 className="font-display text-2xl font-bold text-maroon mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-maroon text-sm">
                        Address
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {businessInfo?.address ||
                          "Chhatarpur, Madhya Pradesh, India"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-maroon text-sm">Phone</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {businessInfo?.phone || "+91 94XXX XXXXX"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-maroon text-sm">
                        Working Hours
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Mon – Sun: 9:00 AM – 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-maroon rounded-2xl p-8 shadow-maroon">
                <p className="font-display text-gold text-xl font-bold mb-3">
                  "Every celebration deserves to be extraordinary."
                </p>
                <p className="text-cream/80 text-sm leading-relaxed">
                  With 20 years of experience and 1000+ happy families, we are
                  Chhatarpur's trusted name for weddings and events. Let us make
                  your special day truly unforgettable.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-gold" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-cream font-semibold text-sm">
                      Mr. Pavan Gupta
                    </p>
                    <p className="text-gold/80 text-xs">Founder & Director</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-maroon-dark py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-gold" fill="currentColor" />
              <span className="font-display text-cream text-xl font-bold">
                Pavan Gupta Tent House &amp; Marriage Garden
              </span>
            </div>
            <p className="text-cream/60 text-sm">
              Chhatarpur, Madhya Pradesh — Making your celebrations
              extraordinary.
            </p>
          </div>
          <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/50 text-sm">
              © {new Date().getFullYear()} Pavan Gupta Tent House &amp; Marriage
              Garden. All rights reserved.
            </p>
            <p className="text-cream/40 text-xs">
              Built with{" "}
              <Heart className="w-3 h-3 inline text-gold" fill="currentColor" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
