import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import { useSettings } from '../../context/SettingsContext';
import CutResultsGallery from '../cuts/CutResultsGallery';
import Order from '../../models/Order';
import phrases from '../../utils/Phrases';


function OrderResults({ order }) {
    // State
    const { settings, setSettings } = useSettings();
    const units = settings.units.value;
    const displayUnits = settings.displayUnits.value;

    var caption = null;
    if (order.optimized && order.optimized.cutResults) {
        if (order.optimized.cutResults.length > 1) {
            caption = phrases.get('components.order.OrderResults.usedPlaques.multiple', { count: order.optimized.cutResults.length });
        } else if (order.optimized.cutResults.length == 1) {
            caption = phrases.get('components.order.OrderResults.usedPlaques.one');
        }
    }

    // Render
    var render = null;
    if (order.optimized && order.optimized.cutResults.length > 0) {
        // Base header
        var baseHeader = phrases.get('components.order.OrderResults.width.units.no');
        if (displayUnits) {
            baseHeader = phrases.get('components.order.OrderResults.width.units.yes', { units: units });
        }

        // Height header
        var heightHeader = phrases.get('components.order.OrderResults.height.units.no');
        if (displayUnits) {
            heightHeader = phrases.get('components.order.OrderResults.height.units.yes', { units: units });
        }

        var details = <Table striped bordered responsive>
            <caption>{caption}</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th className='o-width-15em'>{phrases.get('components.order.OrderResults.plaque')}</th>
                    <th className='o-width-8em'>{baseHeader}</th>
                    <th className='o-width-8em'>{heightHeader}</th>
                    <th className='o-width-8em'>{phrases.get('components.order.OrderResults.pieces')}</th>
                    <th className='o-width-8em'>{phrases.get('components.order.OrderResults.leftovers')}</th>
                </tr>
            </thead>
            <tbody>
                {
                    order.optimized.cutResults.map((cutResult, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{cutResult.plaque.description}</td>
                            <td>{cutResult.width}</td>
                            <td>{cutResult.height}</td>
                            <td>{cutResult.cuts.length}</td>
                            <td>{cutResult.free.length}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>;

        var cutResultsGallery = <CutResultsGallery
            cutResultsList={order.optimized.cutResults}>
        </CutResultsGallery>;

        render = <>
            {details}
            {cutResultsGallery}
        </>;
    } else {
        render = <Alert key='components.order.OrderResults.noOptimization' variant='light'>
            {phrases.get('components.order.OrderResults.noOptimization')}
        </Alert>;
    }

    return render;
}

OrderResults.propTypes = {
    order: PropTypes.instanceOf(Order)
};

export default OrderResults;