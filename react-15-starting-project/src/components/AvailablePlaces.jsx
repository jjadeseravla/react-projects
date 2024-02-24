// import Places from './Places.jsx';
// import Error from './Error.jsx';
// import { sortPlacesByDistance } from '../loc.js'
// import { fetchAvailablePlaces } from '../http.js';
// import { useFetch } from '../hooks/useFetch.js';


// async function fetchSortedPlaces() {
//   const places = await fetchAvailablePlaces();

//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition((position) => { 
//       const sortedPlaces = sortPlacesByDistance
//         (places,
//           position.coords.latitude,
//           position.coords.longitude
//       );
//       resolve(sortedPlaces);
//     });
//   })
// }

// export default function AvailablePlaces({ onSelectPlace }) {

//   const {
//     isFetching,
//     error,
//     fetchedData: availablePlaces,
//   } = useFetch(fetchSortedPlaces, []);

//   if (error) {
//     console.log('gfjchvkbjlnm')
//     return <Error title="An error occurred!" message={error.message}/>
//   }

//   return (
//     <Places
//       title="Available Places"
//       places={availablePlaces}
//       isLoading={isFetching}
//       loadingText="Fetching places data..."
//       fallbackText="No places available."
//       onSelectPlace={onSelectPlace}
//     />
//   );
// }
import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => { 
          const sortedPlaces = sortPlacesByDistance(places, position.coordslatitude, position.coords.longitude);
          setAvailablePlaces(places);
          setIsFetching(false);
        });

      } catch (error) {
        setError({ message: error.message } || 'cant fetch places, this is my own error message');
        setIsFetching(false);
        }
    }
    fetchPlaces();
  }, []);

  if (error) {
    console.log('gfjchvkbjlnm')
    return <Error title="An error occurred!" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}