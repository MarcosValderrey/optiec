import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import Plaque from '../../models/Plaque';
import phrases from '../../utils/Phrases';


function PlaqueCard({ plaque, selectable, selected, onPlaqueSelect, onPlaqueDeselect }) {
    // State
    const [ border, setBorder ] = useState(null);

    // Events
    function onClickPlaqueSelect(event) {
        setBorder('success');

        if (onPlaqueSelect) {
            onPlaqueSelect(plaque);
        }
    }

    function onClickPlaqueDeselect(event) {
        setBorder(null);

        if (onPlaqueDeselect) {
            onPlaqueDeselect(plaque);
        }
    }

    // Render
    var selectButton = null;
    if (selectable && !selected) {
        selectButton = <Button
            variant='light'
            onClick={onClickPlaqueSelect}
            title={phrases.get('components.plaques.PlaqueCard.select')}>
            <i className='bi bi-check2'></i>
        </Button>;
    }

    var deselectButton = null;
    if (selectable && selected) {
        deselectButton = <Button
            variant='success'
            onClick={onClickPlaqueDeselect}
            title={phrases.get('components.plaques.PlaqueCard.deselect')}>
            <i className='bi bi-check2'></i>
        </Button>;
    }

    var actionButtons = null;
    if (selectButton || deselectButton) {
        actionButtons = <div className='d-grid'>
            {selectButton}
            {deselectButton}
        </div>
    }

    var cardFooter = null;
    if (selectable) {
        var footerText = '';
        if (selected) {
            footerText = phrases.get('components.plaques.PlaqueCard.inUse');
        } else {
            footerText = phrases.get('components.plaques.PlaqueCard.available');
        }

        cardFooter = <Card.Footer>
            <small className='text-muted'>{footerText}</small>
        </Card.Footer>;
    }

    return (
        <Card key={plaque.id} border={border}>
            <Card.Img variant='top' src={plaque.material.image}></Card.Img>
            <Card.Body>
                <Card.Title>{plaque.description}</Card.Title>

                <Table hover>
                    <thead>
                        <tr>
                            <th colSpan={2}>{phrases.get('components.plaques.PlaqueCard.details')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{phrases.get('components.plaques.PlaqueCard.base')}</td>
                            <td>{plaque.base}</td>
                        </tr>
                        <tr>
                            <td>{phrases.get('components.plaques.PlaqueCard.height')}</td>
                            <td>{plaque.height}</td>
                        </tr>
                        <tr>
                            <td>{phrases.get('components.plaques.PlaqueCard.thickness')}</td>
                            <td>{plaque.thickness}</td>
                        </tr>
                    </tbody>
                </Table>

                {actionButtons}

            </Card.Body>

            {cardFooter}
        </Card>
    );
}

PlaqueCard.propTypes = {
    plaque: PropTypes.instanceOf(Plaque).isRequired,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onPlaqueSelect: PropTypes.func,
    onPlaqueDeselect: PropTypes.func
};

export default PlaqueCard;