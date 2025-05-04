
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface Location {
  lat: number;
  lng: number;
}

interface TrackingMapProps {
  locationData?: {
    restaurant?: Location;
    destination?: Location;
    courier?: Location;
  };
}

const TrackingMap = ({ locationData }: TrackingMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, this would integrate with a mapping API (Google Maps, Mapbox, etc.)
    // For now, we'll just create a basic placeholder
    console.log("Map would display locations:", locationData);
  }, [locationData]);

  return (
    <Card className="h-full relative overflow-hidden">
      <div ref={mapRef} className="w-full h-full bg-gray-100 flex items-center justify-center">
        {locationData ? (
          <div className="relative w-full h-full">
            {/* Simple placeholder map visualization */}
            <div className="absolute inset-0 bg-gray-200 opacity-75" />
            
            {/* Restaurant location */}
            {locationData.restaurant && (
              <div className="absolute w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                style={{ 
                  left: '30%', 
                  top: '40%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>
              </div>
            )}
            
            {/* Destination */}
            {locationData.destination && (
              <div className="absolute w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                style={{ 
                  left: '70%', 
                  top: '60%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
            )}
            
            {/* Delivery person */}
            {locationData.courier && (
              <div className="absolute w-8 h-8 animate-pulse"
                style={{ 
                  left: '50%', 
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                <div className="relative w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Path line */}
            {locationData.restaurant && locationData.courier && locationData.destination && (
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <path 
                  d="M30%,40% Q50%,45% 50%,50% T70%,60%" 
                  fill="none" 
                  stroke="#0EA5E9" 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                />
              </svg>
            )}
          </div>
        ) : (
          <div className="text-gray-500">
            <p>No tracking data available</p>
          </div>
        )}
      </div>

      {/* Map attribution - would be required for real mapping services */}
      <div className="absolute bottom-1 right-1 text-xs text-gray-500 bg-white bg-opacity-70 px-1 rounded">
        Map Data Placeholder
      </div>
    </Card>
  );
};

export default TrackingMap;
