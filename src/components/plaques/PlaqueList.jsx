import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

import { useSettings } from '../../context/SettingsContext';
import Plaque from '../../models/Plaque';
import phrases from '../../utils/Phrases';


function PlaqueList({ plaqueList }) {
    // State
    const { settings, setSettings } = useSettings();
    const units = settings.units.value;
    const displayUnits = settings.displayUnits.value;

    var caption = null;
    if (plaqueList) {
        if (plaqueList.length > 1) {
            caption = phrases.get('components.plaques.PlaqueList.selectedPlaques.multiple', { count: plaqueList.length });
        } else if (plaqueList.length === 1) {
            caption = phrases.get('components.plaques.PlaqueList.selectedPlaques.one');
        }
    }

    // Render
    let render = null;
    if (plaqueList.length > 0) {
        // Thickness header
        var thicknessHeader = phrases.get('components.plaques.PlaqueList.thickness.units.no');
        if (displayUnits) {
            thicknessHeader = phrases.get('components.plaques.PlaqueList.thickness.units.yes', { units: units });
        }

        // Base header
        var baseHeader = phrases.get('components.plaques.PlaqueList.base.units.no');
        if (displayUnits) {
            baseHeader = phrases.get('components.plaques.PlaqueList.base.units.yes', { units: units });
        }

        // Height header
        var heightHeader = phrases.get('components.plaques.PlaqueList.height.units.no');
        if (displayUnits) {
            heightHeader = phrases.get('components.plaques.PlaqueList.height.units.yes', { units: units });
        }

        render = <Table striped bordered responsive>
            <caption>{caption}</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th className='o-width-15em'>{phrases.get('components.plaques.PlaqueList.description')}</th>
                    <th className='o-width-8em'>{phrases.get('components.plaques.PlaqueList.brand')}</th>
                    <th className='o-width-8em'>{thicknessHeader}</th>
                    <th className='o-width-8em'>{baseHeader}</th>
                    <th className='o-width-8em'>{heightHeader}</th>
                </tr>
            </thead>
            <tbody>
                {
                    plaqueList.map((plaque, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{plaque.description}</td>
                            <td>{plaque.brand}</td>
                            <td>{plaque.thickness}</td>
                            <td>{plaque.base}</td>
                            <td>{plaque.height}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    }

    return render;
}

PlaqueList.propTypes = {
    plaqueList: PropTypes.arrayOf(PropTypes.instanceOf(Plaque))
};

export default PlaqueList;