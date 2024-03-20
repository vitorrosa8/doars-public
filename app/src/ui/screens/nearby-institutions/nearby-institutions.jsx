import './nearby-institutions.style.css';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useInstitutionApi } from '../../../hooks';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SCREENS } from '../../../constants';

export const GOOGLE_API_KEY = '';
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -30.033056,
  lng: -51.230000,
};

export const NearbyInstitutionScreen = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY,
        region: 'BR',
        language: 'pt-Br',
        })
    const [markers, setMarkers] = useState([])
    const [institutions, setInstitutions] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [userLocation, setUserLocation] = useState(null);

    const { getAllInstitutions } = useInstitutionApi()

    const getInstitutions = useCallback(async () => {
        const response = await getAllInstitutions()
        setInstitutions(response)
      }, [getAllInstitutions])

    
    useEffect(() => {
        getInstitutions()
    }, [getInstitutions])

    useEffect(() => {
        if (institutions.length > 0) {
            for (const institution of institutions) {
              handleSearchByInstitution(institution)
            }
          }
        }, [institutions])


    const buildAddress = (institution) => {
        const addressString = `${institution.location}, ${institution.city}, ${institution.uf}, ${institution.cep}`;
        return encodeURIComponent(addressString);
    };
    
    const handleSearchByInstitution = async (institution) => {
        const address = buildAddress(institution)
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
        console.log();
        const data = await response.json()

        const location = data.results[0].geometry.location
        const marker = {
            position: location,
            options: {
                label: {
                    text: institution.name,
                    className: 'map__marker',
                },
            },
            institution: institution,
        }

        setMarkers((prevMarkers) => [...prevMarkers, marker])
    }

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);

    const navigate = useNavigate()

    const navigateToProfile = institutionId => navigate(`${SCREENS.PROFILE}/${institutionId}`)

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation || center}
      zoom={13}
    >
        {markers.map((marker, index) => (
            <Marker key={index} {...marker} onClick={() => setSelectedMarker(marker)}/>
        ))}

        {selectedMarker && (
            <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
            >
                <div className='selected__marker'>
                    <h2 onClick={() => navigateToProfile(selectedMarker.institution.id)}>{selectedMarker.institution.name}</h2>
                    <p>{selectedMarker.institution.description}</p>
                    <p>Localização: {selectedMarker.institution.location}, {selectedMarker.institution.city}, {selectedMarker.institution.uf}, {selectedMarker.institution.cep}</p>
                    {/* Adicione mais informações conforme necessário */}
                </div>
            </InfoWindow>
        )}    
    </GoogleMap>
  ) : <></>
};