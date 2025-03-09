import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Camera, Image, FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { usePlatform } from '@/utils/platform';
import { MobileButton, MobileCard } from '@/components/ui/mobile-ui';

const Index = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isMobile } = usePlatform();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(isMobile ? 'slide-up-mobile' : 'animate-slide-up');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile]);

  // Mobile version of the home page
  if (isMobile) {
    return (
      <Layout>
        {/* Hero Section - Mobile Version */}
        <section className="py-8">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto slide-up-mobile">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                Sign Language Interpreter
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Breaking Barriers with 
                <span className="text-primary ml-1">Sign Language Recognition</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Upload images, videos, or use your camera for real-time sign language interpretation.
              </p>
              <div className="flex flex-col gap-3 pt-2 w-full">
                <MobileButton asChild size="lg">
                  <Link to="/webcam">
                    Start Live Capture
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </MobileButton>
                <MobileButton asChild variant="outline" size="lg">
                  <Link to="/image-upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Media
                  </Link>
                </MobileButton>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Mobile Version */}
        <section className="py-8">
          <div className="container px-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Mobile Feature Cards */}
              <MobileCard
                to="/image-upload"
                icon={<Image className="h-6 w-6" />}
                title="Image Upload"
                description="Upload images for interpretation"
                delay={0}
              />
              
              <MobileCard
                to="/video-upload"
                icon={<FileVideo className="h-6 w-6" />}
                title="Video Upload"
                description="Upload videos for analysis"
                delay={100}
              />
              
              <MobileCard
                to="/webcam"
                icon={<Camera className="h-6 w-6" />}
                title="Live Capture"
                description="Use camera for real-time recognition"
                delay={200}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section - Mobile Version */}
        <section className="py-8 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">How It Works</h2>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex items-start p-4 bg-card rounded-xl shadow-sm border border-border/10 slide-up-mobile"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-8 w-8 bg-primary/10 text-primary flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                    <span className="font-medium text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Web version (original UI)
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-6 md:py-12 bg-gradient-to-b from-background to-muted/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto animate-fade-in">
            <div className="inline-block px-4 py-1.5 bg-primary/8 text-primary rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
              Sign Language Interpretation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90">
              Breaking Barriers with 
              <span className="text-primary ml-2 inline-block transform hover:scale-[1.02] transition-transform duration-300">Sign Language Recognition</span>
            </h1>
            <p className="text-lg text-muted-foreground/90 max-w-2xl leading-relaxed">
              Upload images, videos, or use your camera for real-time sign language interpretation and bridge communication gaps.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all duration-300">
                <Link to="/webcam" className="flex items-center">
                  Start Live Capture
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 shadow-sm hover:shadow-md hover:bg-muted/50 transition-all duration-300">
                <Link to="/image-upload" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Multiple Input Methods</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the method that works best for you to interpret sign language.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Image Upload Feature */}
            <div 
              ref={(el) => (featureRefs.current[0] = el)}
              className="bg-card rounded-xl shadow-soft p-6 opacity-0 translate-y-10 transition-all duration-500 ease-out"
            >
              <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-5">
                <Image className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Image Upload</h3>
              <p className="text-muted-foreground mb-5">
                Upload images containing sign language gestures for instant interpretation.
              </p>
              <Button asChild variant="ghost" className="group">
                <Link to="/image-upload" className="flex items-center">
                  Try Image Upload
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Video Upload Feature */}
            <div
              ref={(el) => (featureRefs.current[1] = el)}
              className="bg-card rounded-xl shadow-soft p-6 opacity-0 translate-y-10 transition-all duration-500 ease-out"
              style={{ transitionDelay: '150ms' }}
            >
              <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-5">
                <FileVideo className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Upload</h3>
              <p className="text-muted-foreground mb-5">
                Upload videos for continuous sign language interpretation and analysis.
              </p>
              <Button asChild variant="ghost" className="group">
                <Link to="/video-upload" className="flex items-center">
                  Try Video Upload
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Live Capture Feature */}
            <div
              ref={(el) => (featureRefs.current[2] = el)}
              className="bg-card rounded-xl shadow-soft p-6 opacity-0 translate-y-10 transition-all duration-500 ease-out"
              style={{ transitionDelay: '300ms' }}
            >
              <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-5">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Capture</h3>
              <p className="text-muted-foreground mb-5">
                Use your camera for real-time sign language interpretation.
              </p>
              <Button asChild variant="ghost" className="group">
                <Link to="/webcam" className="flex items-center">
                  Try Live Capture
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const steps = [
  {
    title: 'Choose Your Input Method',
    description: 'Select from image upload, video upload, or live camera capture.'
  },
  {
    title: 'Present Sign Language',
    description: 'Show the signs clearly in frame for the best recognition.'
  },
  {
    title: 'Get Instant Interpretation',
    description: 'Receive real-time text interpretation of the sign language.'
  }
];

export default Index;