import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import PlaqueList from '../../components/plaques/PlaqueList';
import Order from '../../models/Order';


function OrderPreview({ order }) {
    // Render
    var render = null;

    if (order.plaques) {
        render = <PlaqueList plaqueList={order.plaques}></PlaqueList>
    }

    return render;
}

OrderPreview.propTypes = {
    order: PropTypes.instanceOf(Order)
};

export default OrderPreview;