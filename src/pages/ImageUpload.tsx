import { useState, useRef } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/layout/Layout';
import { usePlatform } from '@/utils/platform';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = usePlatform();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    } else {
      toast.error('Please upload a valid image file');
    }
  };

  const processImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          simulateAnalysis();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const simulateAnalysis = () => {
    toast.info('Analyzing sign language gestures...');
    
    setTimeout(() => {
      setResults('Hello, how are you?');
      toast.success('Sign language interpretation complete!');
    }, 2000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResults(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="container px-2 py-4">
          <div className="max-w-full mx-auto">
            <div className="text-center mb-8 slide-up-mobile">
              <h1 className="text-2xl font-bold mb-2">Image Upload</h1>
              <p className="text-muted-foreground text-sm">
                Upload an image with sign language gestures
              </p>
            </div>

            <MobileCard className="overflow-hidden slide-up-mobile">
              <MobileCardContent className="p-4">
                {!selectedImage ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all touch-highlight ${
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      ref={fileInputRef}
                    />

                    <div className="flex flex-col items-center gap-4">
                      <div className="h-14 w-14 bg-primary/10 text-primary flex items-center justify-center rounded-full">
                        <Upload className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">
                          Tap to upload an image
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Or take a photo with your camera
                        </p>
                        <MobileButton 
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose Image
                        </MobileButton>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background z-10 rounded-full"
                        onClick={clearImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <img
                        src={selectedImage}
                        alt="Uploaded sign language"
                        className="w-full h-auto max-h-[300px] object-contain rounded-lg"
                      />
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}

                    {results && (
                      <div className="p-4 bg-muted rounded-lg slide-up-mobile">
                        <h3 className="font-semibold mb-2">Interpretation Result:</h3>
                        <p className="text-foreground">{results}</p>
                      </div>
                    )}

                    <MobileCardFooter>
                      <MobileButton
                        onClick={clearImage}
                        variant="outline"
                      >
                        Upload Another Image
                      </MobileButton>
                    </MobileCardFooter>
                  </div>
                )}
              </MobileCardContent>
            </MobileCard>

            <div className="mt-6 p-4 bg-secondary/50 rounded-xl border border-border/50 slide-up-mobile shadow-sm">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm mb-1">Tips for Best Results</h3>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside ml-1">
                    <li>Ensure good lighting for clear visibility</li>
                    <li>Position hands in the center of the frame</li>
                    <li>Make sure the entire hand gesture is visible</li>
                    <li>Use a simple background for better recognition</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-3">Image Upload</h1>
            <p className="text-muted-foreground">
              Upload an image containing sign language gestures for interpretation
            </p>
          </div>

          <Card className="shadow-soft overflow-hidden animate-slide-up">
            <CardContent className="p-6">
              {!selectedImage ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />

                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 bg-primary/10 text-primary flex items-center justify-center rounded-full">
                      <Upload className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Drag and drop your image here
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Or click to select a file from your computer
                      </p>
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-full"
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background z-10"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <img
                      src={selectedImage}
                      alt="Uploaded sign language"
                      className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                    />
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {results && (
                    <div className="p-6 bg-muted rounded-lg animate-slide-up">
                      <h3 className="text-lg font-semibold mb-2">Interpretation Result:</h3>
                      <p className="text-foreground text-lg">{results}</p>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Button
                      onClick={clearImage}
                      variant="outline"
                      className="rounded-full"
                    >
                      Upload Another Image
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 p-6 bg-card rounded-xl border border-border/50 animate-slide-up shadow-soft">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Tips for Best Results</h3>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside ml-2">
                  <li>Ensure good lighting conditions for clear visibility</li>
                  <li>Position hands in the center of the frame</li>
                  <li>Make sure the entire hand gesture is visible</li>
                  <li>Use a simple, uncluttered background for better recognition</li>
                  <li>Avoid rapid movements when capturing the gesture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ImageUpload;