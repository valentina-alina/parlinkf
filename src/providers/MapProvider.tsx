//Since the map will be laoded and displayed on client side
'use client';

// Import necessary modules and functions from external libraries and our own project
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

// Define a list of libraries to load from the Google Maps API
const libraries: Libraries = ['places', 'drawing', 'geometry'];

// Define a function component called MapProvider that takes a children prop
export function MapProvider({ children }: { children: ReactNode }) {

  // Load the Google Maps JavaScript API asynchronously
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyCiRGSR05s9hPcsy104Ss2IGQQLdZJoQKE',
        libraries,
    });

    if(loadError) return <p>Erreur au chargement de la carte</p>
    
    if (!isLoaded) return <p>Chargement...</p>;

    // Return the children prop wrapped by this MapProvider component
    return children;
}