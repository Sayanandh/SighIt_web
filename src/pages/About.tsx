import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">About GestureFlow</h1>
            <p className="text-muted-foreground">
              Bridging communication gaps through sign language interpretation
            </p>
          </div>

          <div className="space-y-8">
            <section className="animate-slide-up">
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                GestureFlow was created with a simple yet powerful mission: to make communication more accessible for everyone. We believe that technology can bridge the gap between sign language users and those who don't understand sign language, fostering more inclusive interactions.
              </p>
              <p className="text-muted-foreground">
                Our platform leverages cutting-edge machine learning and computer vision to interpret sign language in real-time, whether from images, videos, or live camera feeds. We're committed to continually improving our technology to provide more accurate and comprehensive sign language interpretation.
              </p>
            </section>

            <section className="animate-slide-up" style={{ animationDelay: '150ms' }}>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <p className="text-muted-foreground mb-4">
                GestureFlow uses advanced computer vision algorithms to detect and track hand movements and gestures. Our models have been trained on thousands of examples of sign language across different dialects to ensure broad coverage and accuracy.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {howItWorks.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-card rounded-lg border border-border/50 shadow-soft"
                  >
                    <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-md mb-3">
                      <span className="font-semibold">{index + 1}</span>
                    </div>
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-semibold mb-4">Our Approach to Accessibility</h2>
              <p className="text-muted-foreground mb-4">
                We believe that everyone should have access to tools that facilitate communication. That's why we've designed GestureFlow to be:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><span className="font-medium text-foreground">User-friendly:</span> Simple, intuitive interfaces that don't require technical expertise.</li>
                <li><span className="font-medium text-foreground">Multi-platform:</span> Available across devices so you can use it wherever you are.</li>
                <li><span className="font-medium text-foreground">Flexible:</span> Multiple input methods to accommodate different needs and situations.</li>
                <li><span className="font-medium text-foreground">Privacy-focused:</span> We process data locally when possible and maintain strict privacy standards.</li>
              </ul>
            </section>

            <section className="text-center py-6 animate-slide-up" style={{ animationDelay: '450ms' }}>
              <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link to="/webcam">
                    Try Live Capture
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link to="/image-upload">
                    Upload an Image
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const howItWorks = [
  {
    title: 'Input Capture',
    description: 'Our system processes sign language gestures from images, videos, or live camera feeds.'
  },
  {
    title: 'Gesture Recognition',
    description: 'Advanced computer vision identifies hand shapes, positions, and movements that form sign language.'
  },
  {
    title: 'Language Interpretation',
    description: 'We translate the recognized gestures into text using our trained machine learning models.'
  }
];

export default About;