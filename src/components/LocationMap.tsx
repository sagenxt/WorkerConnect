import React, { useState, useEffect, useRef } from 'react';

// Google Maps type declarations
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        Geocoder: any;
        MapTypeId: any;
        Animation: any;
        event: any;
        MapMouseEvent: any;
      };
    };
  }
}

interface LocationMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  onLocationSelect?: (lat: number, lng: number, address: string) => void;
  height?: string;
  className?: string;
  readonly?: boolean;
}

const LocationMap: React.FC<LocationMapProps> = ({
  latitude = 20.5937, // Default to India center
  longitude = 78.9629,
  address = '',
  onLocationSelect,
  height = '400px',
  className = '',
  readonly = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({
    lat: latitude,
    lng: longitude
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return;

      try {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: currentLocation,
          zoom: 15,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        const markerInstance = new window.google.maps.Marker({
          position: currentLocation,
          map: mapInstance,
          draggable: !readonly,
          title: address || 'Selected Location',
          animation: window.google.maps.Animation.DROP
        });

        // Add click listener to map if not readonly
        if (!readonly) {
          mapInstance.addListener('click', (event: any) => {
            const lat = event.latLng?.lat();
            const lng = event.latLng?.lng();
            
            if (lat && lng) {
              const newPosition = { lat, lng };
              markerInstance.setPosition(newPosition);
              setCurrentLocation(newPosition);
              
              // Reverse geocode to get address
              reverseGeocode(lat, lng);
            }
          });
        }

        // Add drag listener to marker if not readonly
        if (!readonly) {
          markerInstance.addListener('dragend', (event: any) => {
            const lat = event.latLng?.lat();
            const lng = event.latLng?.lng();
            
            if (lat && lng) {
              const newPosition = { lat, lng };
              setCurrentLocation(newPosition);
              
              // Reverse geocode to get address
              reverseGeocode(lat, lng);
            }
          });
        }

        setMap(mapInstance);
        setMarker(markerInstance);
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map. Please check your internet connection.');
        setIsLoading(false);
      }
    };

    // Load Google Maps script if not already loaded
    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        setError('Failed to load Google Maps. Please check your internet connection.');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (map && window.google?.maps) {
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
  }, []);

  // Update marker position when props change
  useEffect(() => {
    if (map && marker && (latitude !== currentLocation.lat || longitude !== currentLocation.lng)) {
      const newPosition = { lat: latitude, lng: longitude };
      marker.setPosition(newPosition);
      map.setCenter(newPosition);
      setCurrentLocation(newPosition);
    }
  }, [latitude, longitude, map, marker]);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      if (!window.google?.maps) return;
      
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      
      if (response.results[0]) {
        const address = response.results[0].formatted_address;
        onLocationSelect?.(lat, lng, address);
      }
    } catch (err) {
      console.error('Error reverse geocoding:', err);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const newPosition = { lat, lng };
        
        if (map && marker) {
          marker.setPosition(newPosition);
          map.setCenter(newPosition);
          map.setZoom(15);
        }
        
        setCurrentLocation(newPosition);
        reverseGeocode(lat, lng);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting current location:', error);
        setError('Unable to get your current location. Please check your permissions.');
        setIsLoading(false);
      }
    );
  };

  const searchLocation = async (query: string) => {
    try {
      if (!window.google?.maps) return;
      
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ address: query });
      
      if (response.results[0]) {
        const { lat, lng } = response.results[0].geometry.location;
        const newPosition = { lat: lat(), lng: lng() };
        
        if (map && marker) {
          marker.setPosition(newPosition);
          map.setCenter(newPosition);
          map.setZoom(15);
        }
        
        setCurrentLocation(newPosition);
        onLocationSelect?.(lat(), lng(), response.results[0].formatted_address);
      }
    } catch (err) {
      console.error('Error searching location:', err);
      setError('Location not found. Please try a different search term.');
    }
  };

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Map Controls */}
      {!readonly && (
        <div className="absolute top-4 left-4 z-10 space-y-2">
          <button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            title="Get current location"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      )}

      {/* Location Search */}
      {!readonly && (
        <div className="absolute top-4 right-4 z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search location..."
              className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchLocation(e.currentTarget.value);
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                searchLocation(input.value);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div
        ref={mapRef}
        style={{ height }}
        className="w-full rounded-lg border border-gray-300 overflow-hidden"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Loading map...</span>
          </div>
        </div>
      )}

      {/* Location Info */}
      {address && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">Selected Location</p>
              <p className="text-sm text-gray-600">{address}</p>
              <p className="text-xs text-gray-500 mt-1">
                Coordinates: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!readonly && (
        <div className="mt-2 text-xs text-gray-500">
          <p>Click on the map to select a location or use the search bar above</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;