import { useEffect, useRef, useState } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import { Stage, Layer, Rect as KonvaRect, Image as KonvaImage } from 'react-konva';

import PlaqueService from '../../services/PlaqueService';
import useUnits from '../../utils/Units';


function PlaquePreview({ plaque, x = 0, y = 0 }) {
    // State
    const [ image, setImage ] = useState(null);
    const imageRef = useRef();
    const units = useUnits();
    const width = units.mmToPx(plaque.base);
    const height = units.mmToPx(plaque.height);

    useEffect(() => {
        const img = new window.Image();
        img.src = plaque.material.image;
        img.onload = () => setImage(img);
    }, []);

    // Render
    var render = null;
    if (image) {
        render = <KonvaImage
            key={plaque.id}
            x={x}
            y={y}
            width={width}
            height={height}
            image={image}
            ref={imageRef}>
        </KonvaImage>;
    } else {
        render = <KonvaRect
            key={plaque.id}
            x={x}
            y={y}
            width={width}
            height={height}
            stroke="#000000"
            strokeWidth={2}>
        </KonvaRect>;
    }

    return render;
}

export default PlaquePreview;