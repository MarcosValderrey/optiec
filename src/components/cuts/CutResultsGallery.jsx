import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import CutResult from '../../models/CutResult';
import CutResultsCard from '../cuts/CutResultsCard';


function CutResultsGallery({ cutResultsList }) {
    // State
    let cutResultsGallery = null;
    if (cutResultsList && cutResultsList.length > 0) {
        cutResultsGallery = cutResultsList.map((cutResults, index) => (
            <Col key={index}>
                <CutResultsCard key={index} index={index + 1} cutResults={cutResults}></CutResultsCard>
            </Col>
        ));
    }

    // Render
    return (
        <Row xs={1} md={1} lg={1} className='g-2 mt-2 mb-2'>
            {cutResultsGallery}
        </Row>
    );
}

CutResultsGallery.propTypes = {
    cutResultsList: PropTypes.arrayOf(PropTypes.instanceOf(CutResult))
};

export default CutResultsGallery;