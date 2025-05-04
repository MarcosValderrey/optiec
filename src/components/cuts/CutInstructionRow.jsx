import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';

import { useSettings } from '../../context/SettingsContext';
import CutInstruction from '../../models/CutInstruction';
import Plaque from '../../models/Plaque';
import phrases from '../../utils/Phrases';


function CutInstructionRow({ cut, selectedPlaques, onUpdateCut, onAddCut, onRemoveCut }) {
    // State
    const { settings, setSettings } = useSettings();

    // Events
    function onSelectMaterial(eventKey) {
        var selected = selectedPlaques.find((p) => p.id == eventKey);
        if (!selected) {
            return;
        }

        onUpdateCut(cut.id, 'plaque', selected);
    };

    // Render
    var materialDropdown = null;
    var selectedMaterial = null;
    if (selectedPlaques) {
        if (cut.plaque) {
            selectedMaterial = cut.plaque.description;
        }

        materialDropdown = <Dropdown className='w-100' onSelect={(eventKey) => onSelectMaterial(eventKey)}>
            <Dropdown.Toggle className='w-100'>{selectedMaterial}</Dropdown.Toggle>
            <Dropdown.Menu className='w-100'>
                {
                    selectedPlaques.map((plaque) => (
                        <Dropdown.Item
                            key={plaque.id}
                            eventKey={plaque.id}
                            className='w-100'>
                            {plaque.description}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>;
    }

    return (
        <tr key={cut.id} className='align-middle'>

            {/* ID */}
            <td>{cut.id}</td>

            {/* Name */}
            <td>
                <Form.Control
                    type='text'
                    value={cut.name}
                    size='sm'
                    onChange={(event) => onUpdateCut(cut.id, 'name', event.target.value)}
                    required>
                </Form.Control>
            </td>

            {/* Quantity */}
            <td>
                <Form.Control
                    type='number'
                    value={cut.quantity}
                    size='sm'
                    onChange={(event) => onUpdateCut(cut.id, 'quantity', event.target.value)}
                    required
                    min={1}>
                </Form.Control>
            </td>

            {/* Base */}
            <td>
                <Form.Control
                    type='number'
                    value={cut.base}
                    size='sm'
                    onChange={(event) => onUpdateCut(cut.id, 'base', event.target.value)}
                    required
                    min={settings.minCut.value}>
                </Form.Control>
            </td>

            {/* Height */}
            <td>
                <Form.Control
                    type='number'
                    value={cut.height}
                    size='sm'
                    onChange={(event) => onUpdateCut(cut.id, 'height', event.target.value)}
                    required
                    min={settings.minCut.value}>
                </Form.Control>
            </td>

            {/* Material */}
            <td>
                {materialDropdown}
            </td>

            {/* Orientation */}
            {/*
            <td>
                <Form.Control type='number' size='sm'></Form.Control>
            </td>
            */}

            {/* Actions */}
            <td>
                <div className='d-flex gap-2'>
                    {/* Add new cut */}
                    <Button
                        variant='success'
                        className='flex-fill'
                        title={phrases.get('components.cuts.CutInstructionRow.add')}
                        onClick={onAddCut}>
                        <i className='bi bi-plus-circle'></i>
                    </Button>

                    {/* Delete cut */}
                    <Button
                        variant='danger'
                        className='flex-fill'
                        title={phrases.get('components.cuts.CutInstructionRow.delete')}
                        onClick={() => onRemoveCut(cut.id)}>
                        <i className='bi bi-trash'></i>
                    </Button>
                </div>
            </td>
        </tr>
    );
}

CutInstructionRow.propTypes = {
    cut: PropTypes.instanceOf(CutInstruction).isRequired,
    selectedPlaques: PropTypes.arrayOf(PropTypes.instanceOf(Plaque)),
    onAddCut: PropTypes.func,
    onRemoveCut: PropTypes.func,
    index: PropTypes.number
};

export default CutInstructionRow;