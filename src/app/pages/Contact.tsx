import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router";
import { LOCATIONS, COMPANY } from "../data/constants";
import { toast } from "sonner";
import { SplitTextReveal, GoldShimmerText } from "../components/animations/AnimatedText";


export function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [COMPANY.phone],
      link: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email",
      details: [COMPANY.email, "support@bombayassay.com"],
      link: `mailto:${COMPANY.email}`,
    },
    {
      icon: MapPin,
      title: "Head Office",
      details: ["MG Road, Bangalore", "Karnataka 560001, India"],
      link: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
      ],
      link: null,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, #C6A75E 1px, transparent 1px),
              linear-gradient(to bottom, #C6A75E 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              <SplitTextReveal splitBy="word" staggerDelay={0.08} animate>
                Get In Touch
              </SplitTextReveal>
            </h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-muted-foreground text-xl">
              <GoldShimmerText>
                Have questions? We're here to help and answer any questions you
                might have
              </GoldShimmerText>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl hover:border-primary/50 transition-all"
              >
                <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                  <info.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground text-sm mb-1">
                    {info.link && i === 0 ? (
                      <a
                        href={info.link}
                        className="hover:text-primary transition-colors"
                      >
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-foreground mb-2 text-sm">
                        First Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John"
                        className="bg-background/50 border-primary/20 text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground mb-2 text-sm">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Doe"
                        className="bg-background/50 border-primary/20 text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-foreground mb-2 text-sm">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2 text-sm">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2 text-sm">
                      Subject
                    </label>
                    <Input
                      type="text"
                      placeholder="How can we help?"
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2 text-sm">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-3 bg-background/50 border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-6 group">
                    <Send
                      size={20}
                      className="mr-2 group-hover:translate-x-1 transition-transform"
                    />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Map & Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Google Maps Embed */}
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985!2d77.6065!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BAC Head Office Location"
                />
              </div>

              {/* Visit Our Centers */}
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Visit Our Centers
                </h3>
                <p className="text-muted-foreground mb-6">
                  We have 7 centers across India ready to serve you. Click on
                  any location to learn more.
                </p>
                <div className="space-y-3">
                  {LOCATIONS.map((location) => (
                    <Link key={location.id} to={`/locations/${location.id}`}>
                      <div className="flex items-center justify-between gap-3 p-3 bg-background/30 border border-primary/10 rounded-lg hover:border-primary/30 transition-colors mb-2">
                        <div className="flex items-center gap-3">
                          <MapPin className="text-primary" size={20} />
                          <span className="text-foreground">
                            {location.city}
                            {location.isHQ ? " (Head Office)" : ""}
                          </span>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-primary/50"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "What are your hallmarking service turnaround times?",
                a: "Standard hallmarking services are completed within 3-5 business days. Express services are available for urgent requirements.",
              },
              {
                q: "Do you provide pickup and delivery services?",
                a: "Yes, we offer secure pickup and delivery services for bulk orders. Contact us for more details.",
              },
              {
                q: "What documents are required for hallmarking?",
                a: "You'll need valid business registration, GST certificate, and a completed application form. Our team will guide you through the process.",
              },
              {
                q: "How can I track my certification status?",
                a: "Use our Proficiency Portal to track your registration and certification status in real-time.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
