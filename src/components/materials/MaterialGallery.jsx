import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MaterialService from '../../services/MaterialService';
import MaterialCard from './MaterialCard';


function MaterialGallery() {
    // State
    let materialsList = MaterialService.getActiveMaterials();
    let materialsGallery = null;
    if (materialsList.length > 0) {
        materialsGallery = 
            materialsList.map((material) => (
                <Col key={material.id}>
                    <MaterialCard key={material.id} material={material}></MaterialCard>
                </Col>
            ));
    }

    // Render
    return (
        <Row xs={1} md={3} lg={4} className='g-2 mt-2 mb-2'>
            {materialsGallery}
        </Row>
    );
}

export default MaterialGallery;