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
        render = <Table striped bordered>
            <caption>{caption}</caption>
            <thead>
                <tr>
                    <th className='o-width-2'>#</th>
                    <th>{phrases.get('components.plaques.PlaqueList.description')}</th>
                    <th>{phrases.get('components.plaques.PlaqueList.brand')}</th>
                    <th>{phrases.get('components.plaques.PlaqueList.thickness', { units: units })}</th>
                    <th>{phrases.get('components.plaques.PlaqueList.base', { units: units })}</th>
                    <th>{phrases.get('components.plaques.PlaqueList.height', { units: units })}</th>
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