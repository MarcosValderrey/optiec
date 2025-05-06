import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Stage, Layer, Rect as KonvaRect, Image as KonvaImage } from 'react-konva';

import CutResult from '../../models/CutResult';
import useUnits from '../../utils/Units';


function CutResults({ cutResults, x = 0, y = 0 }) {
    // State
    const [ deviceSize, setDeviceSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [ image, setImage ] = useState(null);
    const imageRef = useRef();
    const units = useUnits();
    const stageWidth = Math.round(deviceSize.width * 0.75);
    const stageHeight = deviceSize.width * (cutResults.height / cutResults.width);
    const stageScaleX = stageWidth / cutResults.width;
    const stageScaleY = stageHeight / cutResults.height;

    // Keep track of resizing
    useEffect(
        () => {
            const updateDeviceSize = () => {
                setDeviceSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }

            window.addEventListener('resize', updateDeviceSize);

            return () => window.removeEventListener('resize', updateDeviceSize);
        },
        []
    );

    // Load plaque material image
    useEffect(
        () => {
            const img = new window.Image();
            const material = cutResults.plaque.material;
            img.src = material.image;
            img.onload = () => setImage(img);
        },
        []
    );

    // Render
    var plaque = null;
    if (image) {
        plaque = <KonvaImage
            key={1}
            x={x}
            y={y}
            width={stageWidth}
            height={stageHeight}
            image={image}
            ref={imageRef}>
        </KonvaImage>;
    }

    var free = null;
    if (cutResults && cutResults.free && cutResults.free.length > 0) {
        free = cutResults.free.map((freeSpace, index) => (
            <KonvaRect
                key={index}
                x={freeSpace.x * stageScaleX}
                y={freeSpace.y * stageScaleY}
                width={freeSpace.width * stageScaleX}
                height={freeSpace.height * stageScaleY}
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
                x={cut.x * stageScaleX}
                y={cut.y * stageScaleY}
                width={cut.width * stageScaleX}
                height={cut.height * stageScaleY}
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
    cutResults: PropTypes.instanceOf(CutResult),
    x: PropTypes.number,
    y: PropTypes.number
};

export default CutResults;