import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Services() {
  const [markers, setMarkers] = useState([]);
  const [activeMaker, setActiveMaker] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 40.3947365, lng: 49.6898045 });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  })

  const handleActiveMaker = (maker) => {
    if (maker === activeMaker) {
      return;
    }
    setActiveMaker(maker);
  }

  useEffect(() => {
    axios.get('http://localhost:8080/services-de-depannage')
      .then(response => {
        setMarkers(response.data.map(service => ({
          id: service.idService,
          name: service.nomFournisseur,
          description: service.descriptionDuService,
          price: service.prix,
          phone: service.telephone,
          position: { lat: service.latitude, lng: service.longitude }
        })));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12 mb-3">
          <Link to="/accueil" className="btn btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <h1 className="card-header text-center">Trouvez un service de depannage proche ici</h1>
            <div className="card-body">
              <div style={{ width: "100%", height: "70vh" }}>
                {
                  isLoaded ?
                    <GoogleMap
                      center={currentPosition}
                      zoom={10}
                      onClick={() => setActiveMaker(null)}
                      mapContainerStyle={{ width: "100%", height: "70vh" }}
                    >
                      {
                        markers.map(({ id, name, description, price, phone, position }) =>
                          <MarkerF
                            key={id}
                            position={position}
                            onClick={() => handleActiveMaker(id)}
                            icon={{
                              url: "https://cdn-icons-png.flaticon.com/128/1995/1995470.png",
                              scaledSize: { width: 50, height: 50 }
                            }}
                          >
                            {activeMaker === id && (
                              <InfoWindow onCloseClick={() => setActiveMaker(null)}>
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">{name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Description du service: {description}</h6>
                                    <p className="card-text">Prix: {price}</p>
                                    <p className="card-text">Téléphone: {phone}</p>
                                    <Link to="#" className="btn btn-primary">Voir plus</Link>
                                  </div>
                                </div>
                              </InfoWindow>
                            )}
                          </MarkerF>
                        )
                      }
                    </GoogleMap> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services;
