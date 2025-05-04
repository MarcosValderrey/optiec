import { useEffect, useRef, useState } from 'react';

import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';

import MaterialService from '../../services/MaterialService';
import PlaqueService from '../../services/PlaqueService';
import useUnits from '../../utils/Units';


function CutPreview({ cut, x = 0, y = 0, view = 'front' }) {
    // State
    const [ image, setImage ] = useState(null);
    const imageRef = useRef();
    const units = useUnits();

    /*
    useEffect(() => {
        const img = new window.Image();
        img.src = material.image;
        img.onload = () => setImage(img);
    }, []);
    */

    function getWidth() {
        var width = 0;

        switch (view) {
            case 'front':
                width = units.mmToPx(cut.base);
                break;
            case 'top':
                width = units.mmToPx(cut.base);
                break;
            case 'left':
                // width = units.mmToPx(cut.thickness);
                width = units.mmToPx(18);
                break;
            case 'right':
                // width = units.mmToPx(cut.thickness);
                width = units.mmToPx(18);
                break;
            case 'rear':
                width = units.mmToPx(cut.base);
                break;
        }

        return width;
    }

    function getHeight() {
        var height = 0;

        switch (view) {
            case 'front':
                height = units.mmToPx(cut.height);
                break;
            case 'top':
                // height = units.mmToPx(cut.thickness);
                height = units.mmToPx(18);
                break;
            case 'left':
                height = units.mmToPx(cut.height);
                break;
            case 'right':
                height = units.mmToPx(cut.height);
                break;
            case 'rear':
                height = units.mmToPx(cut.height);
                break;
        }

        return height;
    }
    return (
        <Rect
            key={cut.id}
            x={x}
            y={y}
            width={getWidth()}
            height={getHeight()}
            stroke="#000000"
            strokeWidth={2}
            fill="transparent">
        </Rect>
    );
}

export default CutPreview;