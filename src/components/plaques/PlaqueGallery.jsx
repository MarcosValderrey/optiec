import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import PlaqueService from '../../services/PlaqueService';
import PlaqueCard from '../plaques/PlaqueCard';


function PlaqueGallery() {
    // State
    let plaqueList = PlaqueService.getActivePlaques();
    let plaqueGallery = null;
    if (plaqueList && plaqueList.length > 0) {
        plaqueGallery = plaqueList.map((plaque) => (
            <Col key={plaque.id}>
                <PlaqueCard key={plaque.id} plaque={plaque}></PlaqueCard>
            </Col>
        ));
    }

    // Render
    return (
        <Row xs={1} md={3} lg={4} className='g-2 mt-2 mb-2'>
            {plaqueGallery}
        </Row>
    );
}

export default PlaqueGallery;