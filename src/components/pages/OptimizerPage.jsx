import React, { useReducer, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Title from '../common/Title';
import WarningModal from '../common/WarningModal';
import { useSettings } from '../../context/SettingsContext';
import CutInstructionTable from '../../components/cuts/CutInstructionTable';
import PlaqueSelector from '../../components/plaques/PlaqueSelector';
import OrderPreview from '../order/OrderPreview';
import OrderResults from '../order/OrderResults';
import OrderService from '../../services/OrderService';
import factory from '../../utils/Factory';
import phrases from '../../utils/Phrases';


function OptimizerPage() {
    // Reducers
    // const [ order, dispatch ] = useReducer(orderReducer, factory.exampleOrder());
    const [ order, dispatch ] = useReducer(orderReducer, factory.initialOrder());

    // State
    const { settings, setSettings } = useSettings();
    const [ plaques, setPlaques ] = useState(factory.initialPlaques());
    // const [ plaques, setPlaques ] = useState(factory.examplePlaques());
    const [ showRemoveCutWarning, setShowRemoveCutWarning ] = useState(false);

    // Events
    function onPlaqueSelect(plaque) {
        dispatch({
            type: 'add-plaque',
            payload: plaque
        });
    }

    function onPlaqueDeselect(plaque) {
        var found = !!order.cuts.find((c) => {
            if (!c.plaque) {
                return false;
            }

            return c.plaque.id == plaque.id;
        });

        if (found) {
            setShowRemoveCutWarning(true);
            return;
        }

        dispatch({
            type: 'remove-plaque',
            payload: {
                id: plaque.id
            }
        });
    }

    function onPlaqueDeselectCancel(event) {
        setShowRemoveCutWarning(false);
    }

    function onAddCut(event) {
        dispatch({
            type: 'add-cut',
            payload: {}
        });
    };

    function onRemoveCut(index) {
        dispatch({
            type: 'remove-cut',
            payload: {
                id: index
            }
        });
    };

    function onUpdateCut(id, field, value) {
        dispatch({
            type: 'update-cut',
            payload: {
                id: id,
                field: field,
                value: value
            }
        });
    };

    function onReset() {
        dispatch({
            type: 'reset',
            payload: {}
        });
    }

    function onOptimize() {
        dispatch({
            type: 'optimize',
            payload: {}
        });
    };

    console.log(order);

    var titles = {};
    if (order && order.plaques) {
        titles['1'] = phrases.get('components.pages.OptimizerPage.steps.1.title', { count: order.plaques.length });
    }
    if (order && order.cuts) {
        titles['2'] = phrases.get('components.pages.OptimizerPage.steps.2.title', { count: order.cuts.length });
    }
    titles['3'] = phrases.get('components.pages.OptimizerPage.steps.3.title');
    titles['4'] = phrases.get('components.pages.OptimizerPage.steps.4.title.none');
    if (order && order.optimized && order.optimized.cutResults) {
        titles['4'] = phrases.get('components.pages.OptimizerPage.steps.4.title.positive', { count: order.optimized.cutResults.length });
    }

    // Render
    return (
        <Container>
            <Row>
                <Col>
                    <Title
                        title={phrases.get('components.pages.OptimizerPage.title')}
                        subtitle={phrases.get('components.pages.OptimizerPage.subtitle')}>
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs defaultActiveKey='1' className='mb-3'>
                        {/* Step 1: Select plaques to cut */}
                        <Tab eventKey='1' title={titles['1']}>
                            <PlaqueSelector
                                selectedPlaques={order.plaques}
                                onPlaqueSelect={onPlaqueSelect}
                                onPlaqueDeselect={onPlaqueDeselect}>
                            </PlaqueSelector>
                        </Tab>

                        {/* Step 2: Instruct cuts over plaques */}
                        <Tab eventKey='2' title={titles['2']}>
                            <CutInstructionTable
                                order={order}
                                plaques={plaques}
                                onAddCut={onAddCut}
                                onRemoveCut={onRemoveCut}
                                onUpdateCut={onUpdateCut}
                                onReset={onReset}
                                onOptimize={onOptimize}>
                            </CutInstructionTable>
                        </Tab>

                        {/* Step 3: Preview section */}
                        <Tab eventKey='3' title={titles['3']}>
                            <OrderPreview key={order.id} order={order}></OrderPreview>
                        </Tab>

                        {/* Step 4: Results section */}
                        <Tab eventKey='4' title={titles['4']}>
                            <OrderResults key={order.id} order={order}></OrderResults>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Col>
                    <WarningModal
                        title={phrases.get('components.pages.OptimizerPage.steps.1.warning.title')}
                        subtitle={phrases.get('components.pages.OptimizerPage.steps.1.warning.subtitle')}
                        show={showRemoveCutWarning}
                        onCancel={onPlaqueDeselectCancel}>
                    </WarningModal>
                </Col>
            </Row>
        </Container>
    );
};

/**
 * Process order action.
 * 
 * @param {Order} order Current order to process.
 * @param {Object} action Action to process.
 * @returns {Order} Updated order.
 */
function orderReducer(order, action) {
    var newOrder = order.clone();
    var payload = action.payload;

    switch (action.type) {
        case 'add-plaque':
            return newOrder.addPlaque(payload);

        case 'remove-plaque':
            return newOrder.removePlaque(payload.id);

        case 'add-cut':
            return newOrder.addCut();

        case 'remove-cut':
            return newOrder.removeCut(payload.id);

        case 'update-cut':
            const id = payload.id;
            const field = payload.field;
            const value = payload.value;

            return newOrder.updateCut(id, field, value);

        case 'reset':
            return newOrder.reset();

        case 'optimize':
            newOrder = OrderService.optimize(newOrder);
    }

    return newOrder;
};

export default OptimizerPage;