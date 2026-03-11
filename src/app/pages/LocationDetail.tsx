import { motion } from "motion/react";
import { useParams, Link } from "react-router";
import { MapPin, Phone, Mail, ArrowLeft, Building2, Award } from "lucide-react";
import { LOCATIONS } from "../data/constants";
import { Button } from "../components/ui/button";

export function LocationDetail() {
  const { city } = useParams();
  const location = LOCATIONS.find((loc) => loc.id === city);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Location Not Found
          </h1>
          <Link
            to="/contact"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            &larr; View All Locations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-6 hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={16} />
              All Locations
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              {location.city}
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl">
              {location.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Team Photo & Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-primary/20"
              >
                <img
                  src={location.teamPhoto}
                  alt={`Team ${location.city}`}
                  className="w-full aspect-video object-cover"
                />
              </motion.div>

              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Contact Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Address</p>
                      <p className="text-muted-foreground">{location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Phone</p>
                      <a
                        href={`tel:${location.phone.replace(/\s/g, "")}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Email</p>
                      <a
                        href={`mailto:${location.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-primary/20">
                  <a href={`mailto:${location.email}`}>
                    <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
                      Contact This Center
                    </Button>
                  </a>
                </div>
              </motion.div>

              {/* BIS Certificate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      BIS Certified Center
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Bureau of Indian Standards recognized
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  This center holds a valid BIS license for hallmarking and assaying of precious metals including gold, silver, platinum, and palladium.
                </p>
              </motion.div>
            </div>

            {/* Right - Google Maps */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden"
                style={{ height: "500px" }}
              >
                <iframe
                  src={location.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map - ${location.city}`}
                />
              </motion.div>

              {/* Other Locations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Other Centers
                </h3>
                <div className="space-y-2">
                  {LOCATIONS.filter((loc) => loc.id !== location.id).map(
                    (loc) => (
                      <Link key={loc.id} to={`/locations/${loc.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors mb-1">
                          <Building2
                            size={16}
                            className="text-primary shrink-0"
                          />
                          <span className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                            {loc.city}
                            {loc.isHQ ? " (HQ)" : ""}
                          </span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
