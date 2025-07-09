
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Image, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UploadSectionProps {
  onImageUpload: (imageUrl: string) => void;
  isAnalyzing: boolean;
}

export const UploadSection = ({ onImageUpload, isAnalyzing }: UploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setUploadedFile(file);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          const imageUrl = URL.createObjectURL(file);
          onImageUpload(imageUrl);
        }
      }, 200);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleCamera = () => {
    // For demo purposes, we'll simulate camera capture
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create a gradient background to simulate a captured image
      const gradient = ctx.createLinearGradient(0, 0, 400, 300);
      gradient.addColorStop(0, '#f3e8ff');
      gradient.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 300);
      
      ctx.fillStyle = '#6b46c1';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Simulated Camera Capture', 200, 150);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.png', { type: 'image/png' });
          handleFile(file);
        }
      });
    }
  };

  if (isAnalyzing) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 mb-4">
                Analyzing Your Hair...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="w-20 h-20 mx-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-20 h-20 text-purple-500" />
                </motion.div>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600">Processing image and analyzing hair patterns...</p>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Image processed</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                  <span>AI analysis</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span>Generating report</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Upload Your Hair Photo
          </h1>
          <p className="text-xl text-gray-600">
            Get instant AI-powered analysis of your hair and scalp health
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-purple-600" />
                <span>Upload Image</span>
              </CardTitle>
              <CardDescription>
                Drag and drop your image or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-300 hover:border-purple-300 hover:bg-purple-25"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drop your hair/scalp image here
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Browse Files
                </Button>
              </motion.div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Camera Capture */}
          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-blue-600" />
                <span>Capture Photo</span>
              </CardTitle>
              <CardDescription>
                Use your device camera to take a photo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Take a photo using your camera
                </p>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  onClick={handleCamera}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Open Camera
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">
                📸 Photo Guidelines for Best Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Lighting</h4>
                  <p>Ensure good, natural lighting for clear visibility</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Angle</h4>
                  <p>Take photos from multiple angles (top, side, back)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Focus</h4>
                  <p>Keep the camera steady and focus on hair/scalp area</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
