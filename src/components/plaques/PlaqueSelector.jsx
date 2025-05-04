import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Plaque from '../../models/Plaque';
import PlaqueService from '../../services/PlaqueService';
import PlaqueCard from './PlaqueCard';


function PlaqueSelector({ selectedPlaques, onPlaqueSelect, onPlaqueDeselect }) {
    // State
    let plaqueList = PlaqueService.getActivePlaques();
    let plaqueGallery = null;
    if (plaqueList.length > 0) {
        plaqueGallery = plaqueList.map((plaque) => (
            <Col key={plaque.id}>
                <PlaqueCard
                    key={plaque.id}
                    plaque={plaque}
                    selectable={true}
                    selected={selectedPlaques.find((p) => p.id === plaque.id)}
                    onPlaqueSelect={onPlaqueSelect}
                    onPlaqueDeselect={onPlaqueDeselect}
                    >
                </PlaqueCard>
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

PlaqueSelector.propTypes = {
    selectedPlaques: PropTypes.arrayOf(PropTypes.instanceOf(Plaque)),
    onPlaqueSelect: PropTypes.func,
    onPlaqueDeselect: PropTypes.func
};

export default PlaqueSelector;