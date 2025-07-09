
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Upload, Heart, Brain, Microscope, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const Navbar = ({ currentSection, onSectionChange }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "hair-health", label: "Hair Health", icon: Heart },
    { id: "risk-predictor", label: "Risk Predictor", icon: Brain },
    { id: "deficiency-insight", label: "Deficiency Insight", icon: Microscope },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            HairGlow Vision
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    currentSection === item.id
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "hover:bg-purple-50"
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-purple-100 py-4"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start mb-2 hover:bg-purple-50"
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
