import { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, CameraOff, Settings, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';

const Webcam = () => {
  const [isActive, setIsActive] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [mirror, setMirror] = useState(true);
  const [results, setResults] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Get available camera devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        
        if (videoDevices.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error getting media devices:', error);
        toast.error('Could not access camera devices');
      }
    };

    getDevices();
  }, []);

  // Start/stop webcam
  const toggleCamera = useCallback(async () => {
    try {
      if (isActive) {
        // Stop the camera
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setIsActive(false);
        setResults([]);
      } else {
        // Start the camera
        const constraints = {
          video: selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : true
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setIsActive(true);
        toast.success('Camera started successfully');
        
        // Start mock analysis
        simulateAnalysis();
      }
    } catch (error) {
      console.error('Error toggling camera:', error);
      toast.error('Could not access camera');
    }
  }, [isActive, selectedDeviceId]);

  // Change camera device
  const changeDevice = async (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    
    // If camera is already active, restart it with the new device
    if (isActive) {
      // Stop current stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      try {
        // Start new stream
        const constraints = {
          video: { deviceId: { exact: deviceId } }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        toast.success('Camera changed successfully');
      } catch (error) {
        console.error('Error changing camera device:', error);
        toast.error('Could not switch camera');
        setIsActive(false);
      }
    }
  };

  // Mock analysis
  const simulateAnalysis = () => {
    setResults([]);
    
    const mockResults = [
      'Hello',
      'Welcome',
      'How are you?',
      'Thank you',
      'Good to see you'
    ];
    
    mockResults.forEach((result, index) => {
      setTimeout(() => {
        setResults(prev => [...prev, result]);
        
        // Scroll to newest result
        const resultContainer = document.getElementById('result-container');
        if (resultContainer) {
          resultContainer.scrollTop = resultContainer.scrollHeight;
        }
      }, (index + 1) * 3000);
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-3">Live Webcam Capture</h1>
            <p className="text-muted-foreground">
              Use your camera for real-time sign language interpretation
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <Card className="shadow-soft md:col-span-3 animate-slide-up">
              <CardContent className="p-6">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
                  {!isActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/80 z-10">
                      <Camera className="h-12 w-12 mb-4 opacity-70" />
                      <p className="mb-4 font-medium">Camera is currently inactive</p>
                      <Button
                        onClick={toggleCamera}
                        className="rounded-full"
                      >
                        Start Camera
                      </Button>
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${mirror ? 'scale-x-[-1]' : ''}`}
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={toggleCamera}
                      variant={isActive ? 'destructive' : 'default'}
                      className="rounded-full"
                      size="sm"
                    >
                      {isActive ? (
                        <>
                          <CameraOff className="mr-2 h-4 w-4" />
                          Stop Camera
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Start Camera
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setShowSettings(!showSettings)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  {isActive && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={simulateAnalysis}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {showSettings && (
                  <div className="mt-4 p-4 bg-muted rounded-lg space-y-4 animate-slide-up">
                    <div className="space-y-2">
                      <Label>Select Camera</Label>
                      <Select
                        value={selectedDeviceId}
                        onValueChange={changeDevice}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a camera" />
                        </SelectTrigger>
                        <SelectContent>
                          {devices.map((device) => (
                            <SelectItem key={device.deviceId} value={device.deviceId}>
                              {device.label || `Camera ${devices.indexOf(device) + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label>Mirror Video</Label>
                      <Switch
                        checked={mirror}
                        onCheckedChange={setMirror}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2 shadow-soft animate-slide-up" style={{ animationDelay: '150ms' }}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Interpretation Results</h2>
                <div 
                  id="result-container"
                  className="h-[400px] overflow-y-auto space-y-3 pr-2"
                >
                  {results.map((result, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-muted rounded-lg animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <p className="text-sm">{result}</p>
                    </div>
                  ))}
                  {results.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>{isActive ? 'Waiting for signs to interpret...' : 'Start the camera to begin interpretation'}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Webcam;