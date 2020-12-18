import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [poemAPIData, setPoemAPIData] = useState([]);

    useEffect(() => {
        axios
        .get(`https://damp-journey-22196.herokuapp.com/`) // link to heroku
        // .get(`http//localhost:4000`) // link to heroku
        .then(function(response) {
            if(response.data){
                setPoemAPIData(response.data);   
            }
        })
        .catch(function(error) {
            console.log('error', error)
        })
    }, []);

    console.log({poemAPIData});

    return (
        <div>
        <h1>Dead Poet's Society</h1>
        {poemAPIData.map((item,  i) => (
            <div key={i}>
            <p>Author: {item.author}</p>
            <p>Title: {item.title}</p>
            <p>Poem: {item.text}</p>
            </div>
    ))}
        </div>
    );
}

export default Home;