import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AdminSchoolInfo() {
    const [data, setData] = useState("");

    useEffect(() => {
        const apiUrl = "http://localhost:5000/api/schoolInfo";

        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
                console.log('Response:', response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
console.log(data);
    return (
        <>
            <p>Hello World</p>
        </>
    );
}
