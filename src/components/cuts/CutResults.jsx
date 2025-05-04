import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Stage, Layer, Rect as KonvaRect, Image as KonvaImage } from 'react-konva';

import CutResult from '../../models/CutResult';
import useUnits from '../../utils/Units';


function CutResults({ cutResults, x = 0, y = 0 }) {
    // State
    const [ image, setImage ] = useState(null);
    const imageRef = useRef();
    const units = useUnits();
    const stageWidth = units.mmToPx(cutResults.width);
    const stageHeight = units.mmToPx(cutResults.height);

    useEffect(() => {
        const img = new window.Image();
        const material = cutResults.plaque.material;

        img.src = material.image;
        img.onload = () => setImage(img);
    }, []);

    // Render
    var plaque = null;
    if (image) {
        plaque = <KonvaImage
            key={1}
            x={units.mmToPx(x)}
            y={units.mmToPx(y)}
            width={units.mmToPx(cutResults.width)}
            height={units.mmToPx(cutResults.height)}
            image={image}
            ref={imageRef}>
        </KonvaImage>;
    }

    var free = null;
    if (cutResults && cutResults.free && cutResults.free.length > 0) {
        free = cutResults.free.map((freeSpace, index) => (
            <KonvaRect
                key={index}
                x={units.mmToPx(freeSpace.x)}
                y={units.mmToPx(freeSpace.y)}
                width={units.mmToPx(freeSpace.width)}
                height={units.mmToPx(freeSpace.height)}
                stroke="rgba(127, 127, 127, 0.5)"
                strokeWidth={2}
                fill="rgba(127, 127, 127, 0.5)"
                dash={[12, 6]}>
            </KonvaRect>
        ));
    }

    var cuts = null;
    if (cutResults && cutResults.cuts && cutResults.cuts.length > 0) {
        cuts = cutResults.cuts.map((cut, index) => (
            <KonvaRect
                key={index}
                x={units.mmToPx(cut.x)}
                y={units.mmToPx(cut.y)}
                width={units.mmToPx(cut.width)}
                height={units.mmToPx(cut.height)}
                stroke="#000000"
                strokeWidth={2}
                fill="transparent">
            </KonvaRect>
        ));
    }

    var render = <Stage width={stageWidth} height={stageHeight}>
        <Layer>
            {plaque}
            {free}
            {cuts}
        </Layer>
    </Stage>;

    return render;
}

CutResults.propTypes = {
    cutResults: PropTypes.instanceOf(CutResult)
};

export default CutResults;