
import { motion } from "framer-motion";
import { AlertTriangle, Heart, Microscope, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const FeatureCards = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      description: "Advanced AI algorithms predict your future hair fall risk with high accuracy",
      color: "from-red-400 to-pink-400",
      bgColor: "bg-red-50",
    },
    {
      icon: Heart,
      title: "Hair Health Status",
      description: "Comprehensive analysis of your current hair condition and overall health",
      color: "from-blue-400 to-purple-400",
      bgColor: "bg-blue-50",
    },
    {
      icon: Microscope,
      title: "Deficiency Detection",
      description: "Identify vitamin and protein deficiencies affecting your hair growth",
      color: "from-green-400 to-teal-400",
      bgColor: "bg-green-50",
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Download comprehensive PDF reports and share results with professionals",
      color: "from-orange-400 to-yellow-400",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Hair Analysis
          </h2>
          <p className="text-xl text-gray-600">
            Our AI-powered platform provides detailed insights into your hair health
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="h-full"
              >
                <Card className={`h-full ${feature.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
