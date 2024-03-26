'use client'

import React, { useState } from 'react';
import { fetchStudentPhoto } from './fetchPhoto';

export default function Accept(props) {
    const [photo, setPhoto] = useState('');

    const callFunction = async () => {
        const photo = await fetchStudentPhoto('');
        const imageUrl = `data:image/jpeg;base64,${photo}`;
        setPhoto(imageUrl);
    }
  
    return (
        <>
        <button onClick={callFunction}>Student</button>
        <div>
            <h2>Image Preview</h2>
            <img src={photo} alt="Base64 Image" />
        </div>
        </>
    );
  }
  