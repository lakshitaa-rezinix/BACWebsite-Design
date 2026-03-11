import { motion } from "motion/react";
import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Display */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
            
            <div className="relative">
              <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 mb-4">
                404
              </h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
                <Home size={20} className="mr-2" />
                Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-primary/30 text-foreground hover:bg-primary/10"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="mt-16 opacity-20"
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#C6A75E"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
