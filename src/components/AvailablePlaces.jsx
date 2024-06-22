import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import {fetchAvailablePlaces} from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {

    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [error, setError] = useState();

    // useEffect(() => {
    //     fetch('http://localhost:3000/places')
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((resData)=> {
    //         setAvailablePlaces(resData.places);
    //     });
    // }, []);

    useEffect(() => {
        async function fetchPlaces () {
            try{
                const places = await fetchAvailablePlaces();

                setAvailablePlaces(places);
            } catch(error) {
                setError({message: error.message || 'Could not fetch places'});
            }
            
        }

        fetchPlaces();
    }, []);

    if (error) {
        return <Error title = "An Error Occurred... !" message={error.message}/>
    }

    return (
        <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText="No places available."
        onSelectPlace={onSelectPlace}
        />
    );
}
