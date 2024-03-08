import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RandomSignUp = () => {
    const [randomRouteId, setRandomRouteId] = useState(null);

    const generateRandomRouteId = () => {
        return Math.random().toString(36).substring(2, 10); // Generate an alphanumeric string
    };

    const handleGenerateRoute = () => {
        const newRouteId = generateRandomRouteId();
        setRandomRouteId(newRouteId);
        console.log(randomRouteId)
        // Navigate to the generated route
        // window.location.href = `/formdata/${newRouteId}`;
    };

    return (
        <div>
            <button onClick={handleGenerateRoute}>Generate Random Route</button>
            {randomRouteId && <Link to={`http://localhost:3000/formdata/t/?id=n3pyqqto&mail=abc@gmail.com&pos=staff`}>Go to FormData</Link>
            }
        </div>
    );
};

export default RandomSignUp;
