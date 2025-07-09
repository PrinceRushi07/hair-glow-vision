
import { motion } from "framer-motion";
import { AlertTriangle, Heart, Microscope, Download, Share2, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsSectionProps {
  results: {
    riskLevel: string;
    hairHealth: string;
    deficiencies: string[];
  };
  uploadedImage: string | null;
}

export const ResultsSection = ({ results, uploadedImage }: ResultsSectionProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle };
      case "moderate": return { color: "text-yellow-600", bg: "bg-yellow-50", icon: AlertCircle };
      case "high": return { color: "text-red-600", bg: "bg-red-50", icon: XCircle };
      default: return { color: "text-gray-600", bg: "bg-gray-50", icon: AlertCircle };
    }
  };

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case "healthy": return { color: "text-green-600", bg: "bg-green-50" };
      case "dry": return { color: "text-orange-600", bg: "bg-orange-50" };
      case "oily": return { color: "text-blue-600", bg: "bg-blue-50" };
      case "damaged": return { color: "text-red-600", bg: "bg-red-50" };
      default: return { color: "text-gray-600", bg: "bg-gray-50" };
    }
  };

  const riskInfo = getRiskColor(results.riskLevel);
  const healthInfo = getHealthColor(results.hairHealth);
  const RiskIcon = riskInfo.icon;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Hair Analysis Results
          </h1>
          <p className="text-xl text-gray-600">
            Based on AI analysis of your uploaded image
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Uploaded Image */}
          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Analyzed Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={uploadedImage}
                    alt="Uploaded hair analysis"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Risk Level */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className={`${riskInfo.bg} border-0 shadow-lg h-full`}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4`}>
                  <RiskIcon className={`w-8 h-8 ${riskInfo.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Hair Fall Risk
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className={`${riskInfo.color} text-lg px-4 py-2 mb-4`} variant="secondary">
                  {results.riskLevel} Risk
                </Badge>
                <p className="text-gray-600">
                  {results.riskLevel === "Low" && "Your hair shows minimal signs of hair fall risk. Continue your current care routine."}
                  {results.riskLevel === "Moderate" && "Some factors indicate potential hair fall. Consider preventive measures."}
                  {results.riskLevel === "High" && "Several risk factors detected. Recommend consulting a specialist."}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hair Health */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className={`${healthInfo.bg} border-0 shadow-lg h-full`}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4`}>
                  <Heart className={`w-8 h-8 ${healthInfo.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Hair Health Status
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className={`${healthInfo.color} text-lg px-4 py-2 mb-4`} variant="secondary">
                  {results.hairHealth}
                </Badge>
                <p className="text-gray-600">
                  {results.hairHealth === "Healthy" && "Your hair appears to be in good condition with proper moisture and strength."}
                  {results.hairHealth === "Dry" && "Your hair may need more moisture and hydration treatments."}
                  {results.hairHealth === "Oily" && "Excess oil production detected. Consider adjusting washing frequency."}
                  {results.hairHealth === "Damaged" && "Signs of damage detected. Repair treatments recommended."}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Deficiencies */}
        {results.deficiencies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-gray-800">
                  <Microscope className="w-6 h-6 text-orange-600" />
                  <span>Potential Deficiencies Detected</span>
                </CardTitle>
                <CardDescription>
                  These nutrients may be affecting your hair health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {results.deficiencies.map((deficiency, index) => (
                    <motion.div
                      key={deficiency}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="text-center p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Microscope className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="font-semibold text-gray-800">{deficiency}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {deficiency === "Biotin" && "Essential for hair growth"}
                        {deficiency === "Iron" && "Prevents hair thinning"}
                        {deficiency === "Protein" && "Strengthens hair structure"}
                        {deficiency === "Vitamin D" && "Supports hair follicles"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Report
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
