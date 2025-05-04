import React from 'react';

import MaterialService from '../../services/MaterialService';


function MaterialList() {
    let materialsList = MaterialService.getAllActiveMaterials();
    let materialsTable = null;
    if (materialsList.length > 0) {
        materialsTable = <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {
                    materialsList.map((material, index) => (
                        <tr key={index}>
                            <td>{material.description}</td>
                            <td>{<img src={material.image} alt={material.name} /> }</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    }

    // Render
    return (
        <div className="p-4">
            <h1>Materials ({materialsList.length})</h1>
            {materialsTable}
        </div>
    );
}

export default MaterialList;