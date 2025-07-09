
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, Brain, Heart, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCards } from "@/components/FeatureCards";
import { UploadSection } from "@/components/UploadSection";
import { ResultsSection } from "@/components/ResultsSection";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState({
    riskLevel: "",
    hairHealth: "",
    deficiencies: [] as string[]
  });

  const handleImageUpload = (imageUrl: string) => {
    console.log("Image uploaded:", imageUrl);
    setUploadedImage(imageUrl);
    
    // Simulate analysis with loading delay
    setTimeout(() => {
      const mockResults = {
        riskLevel: ["Low", "Moderate", "High"][Math.floor(Math.random() * 3)],
        hairHealth: ["Healthy", "Dry", "Oily", "Damaged"][Math.floor(Math.random() * 4)],
        deficiencies: ["Biotin", "Iron", "Protein", "Vitamin D"].filter(() => Math.random() > 0.5)
      };
      
      setAnalysisResults(mockResults);
      setAnalysisComplete(true);
      setCurrentSection("results");
    }, 3000);
  };

  const renderSection = () => {
    switch (currentSection) {
      case "upload":
        return (
          <UploadSection 
            onImageUpload={handleImageUpload}
            isAnalyzing={uploadedImage && !analysisComplete}
          />
        );
      case "results":
        return analysisComplete ? (
          <ResultsSection 
            results={analysisResults}
            uploadedImage={uploadedImage}
          />
        ) : null;
      default:
        return (
          <>
            <HeroSection onGetStarted={() => setCurrentSection("upload")} />
            <FeatureCards />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Navbar 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      />
      
      <main className="pt-16">
        {renderSection()}
      </main>

      <ChatBot />
    </div>
  );
};

export default Index;
