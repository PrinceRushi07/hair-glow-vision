
import { motion } from "framer-motion";
import { Sparkles, Camera, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4"
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 bg-clip-text text-transparent mb-6">
              Your Hair's Future
            </h1>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-4"
            >
              <Sparkles className="w-6 h-6 text-blue-400" />
            </motion.div>
          </div>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Discover your hair health with AI-powered analysis. 
            <br />
            Get insights on risk factors, deficiencies, and personalized care recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
              onClick={onGetStarted}
            >
              <Camera className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Upload & Analyze</h3>
              <p className="text-gray-600">Simply upload your hair/scalp photo for instant AI analysis</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">AI Prediction</h3>
              <p className="text-gray-600">Get accurate predictions on hair fall risk and health status</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Personalized Care</h3>
              <p className="text-gray-600">Receive tailored recommendations for optimal hair health</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
