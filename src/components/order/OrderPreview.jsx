import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

import PlaqueList from '../../components/plaques/PlaqueList';
import Order from '../../models/Order';
import phrases from '../../utils/Phrases';


function OrderPreview({ order }) {
    // Render
    var render = null;

    if (order.plaques && order.plaques.length > 0) {
        render = <PlaqueList plaqueList={order.plaques}></PlaqueList>
    } else {
        render = <Alert key='components.order.OrderPreview.noPreview' variant='light'>
            {phrases.get('components.order.OrderPreview.noPreview')}
        </Alert>;
    }

    return render;
}

OrderPreview.propTypes = {
    order: PropTypes.instanceOf(Order)
};

export default OrderPreview;