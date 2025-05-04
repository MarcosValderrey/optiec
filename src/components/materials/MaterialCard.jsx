import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function MaterialCard({ material }) {
    // Render
    return (
        <Card key={material.id}>
            <Card.Img variant='top' src={material.image}></Card.Img>
            <Card.Body>
                <Card.Title>{material.description}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default MaterialCard;