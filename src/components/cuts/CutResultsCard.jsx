import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import CutResults from '../cuts/CutResults';
import phrases from '../../utils/Phrases';


function CutResultsCard({ index, cutResults }) {
    // Render
    var cardFooter = null;
    var footerText = '';
    if (cutResults) {
        footerText = index + '. ' + cutResults.plaque.description;
        cardFooter = <Card.Footer>
            <small className='text-muted'>{footerText}</small>
        </Card.Footer>;
    }

    return (
        <Card key={cutResults.id}>
            <Card.Body>
                <div className='d-flex justify-content-center'>
                    <CutResults key={cutResults.id} cutResults={cutResults}></CutResults>
                </div>
            </Card.Body>

            {cardFooter}
        </Card>
    );
}

CutResultsCard.propTypes = {
    index: PropTypes.number.isRequired,
    cutResults: PropTypes.instanceOf(CutResults).isRequired
};

export default CutResultsCard;