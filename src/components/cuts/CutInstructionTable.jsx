import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import { useSettings } from '../../context/SettingsContext';
import DeleteModal from '../common/DeleteModal';
import ErrorAlert from '../common/ErrorAlert';
import SuccessModal from '../common/SuccessModal';
import CutInstructionRow from './CutInstructionRow';
import CutInstruction from '../../models/CutInstruction';
import Order from '../../models/Order';
import Plaque from '../../models/Plaque';
import phrases from '../../utils/Phrases';


function CutInstructionTable({ order, onAddCut, onRemoveCut, onUpdateCut, onReset, onOptimize }) {
    // State
    const { settings, setSettings } = useSettings();
    const [ validated, setValidated ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ showValidationErrors, setShowValidationErrors ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ showSuccessModal, setShowSuccessModal ] = useState(false);
    const units = settings.units.value;
    const displayUnits = settings.displayUnits.value;

    // Events
    function onOrderDelete(event) {
        setShowDeleteModal(true);
    }

    function onOrderDeleteCancel(event) {
        setShowDeleteModal(false);
    }

    function onOrderDeleteConfirm(event) {
        onReset();
        setShowDeleteModal(false);
    }

    function onOrderSubmitSuccess(event) {
        setShowSuccessModal(false);
    }

    function onOrderSubmit(event) {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        var validationErrors = [];

        // Check there is at least one plaque selected
        if (order.plaques.length === 0) {
            validationErrors.push(phrases.get('components.cuts.CutInstructionTable.errors.missingPlaques'));
        }

        // Check all cuts have a plaque assigned
        if (order.cuts) {
            if (order.cuts.find((c) => !c.plaque)) {
                validationErrors.push(phrases.get('components.cuts.CutInstructionTable.errors.missingMaterials'));
            }
        }

        // Native HTML form validations
        if (!form.checkValidity()) {
            setValidated(true);
            validationErrors.push(phrases.get('components.cuts.CutInstructionTable.errors.missingValues'));
        }

        // Optimizer custom validations
        if (validationErrors.length > 0) {
            setShowValidationErrors(true);
            setErrors(validationErrors);
            return;
        }

        // All fields and rules are valid at this point
        onOptimize();
        setValidated(true);
        setShowSuccessModal(true);
        setShowValidationErrors(false);
        setErrors([]);
    }

    // Base header
    var baseHeader = phrases.get('components.cuts.CutInstructionTable.base.units.no');
    if (displayUnits) {
        baseHeader = phrases.get('components.cuts.CutInstructionTable.base.units.yes', { units: units });
    }

    // Height header
    var heightHeader = phrases.get('components.cuts.CutInstructionTable.height.units.no');
    if (displayUnits) {
        heightHeader = phrases.get('components.cuts.CutInstructionTable.height.units.yes', { units: units });
    }

    // Render
    return (
        <Form noValidate validated={validated} onSubmit={onOrderSubmit}>
            <Table striped bordered responsive>
                <caption>{phrases.get('components.cuts.CutInstructionTable.caption')}</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className='o-width-15em'>{phrases.get('components.cuts.CutInstructionTable.name')}</th>
                        <th className='o-width-8em'>{phrases.get('components.cuts.CutInstructionTable.quantity')}</th>
                        <th className='o-width-8em'>{baseHeader}</th>
                        <th className='o-width-8em'>{heightHeader}</th>
                        <th>{phrases.get('components.cuts.CutInstructionTable.material')}</th>
                        {/* <th>{phrases.get('components.cuts.CutInstructionTable.orientation')}</th> */}
                        <th>{phrases.get('components.cuts.CutInstructionTable.actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.cuts.map((cut) => (
                            <CutInstructionRow
                                key={cut.id}
                                cut={cut}
                                selectedPlaques={order.plaques}
                                onUpdateCut={onUpdateCut}
                                onAddCut={onAddCut}
                                onRemoveCut={onRemoveCut}>
                            </CutInstructionRow>
                        ))
                    }
                </tbody>
            </Table>

            {/* Error alert messages */}
            <ErrorAlert
                title={phrases.get('components.cuts.CutInstructionTable.errors.title')}
                show={showValidationErrors}
                errors={errors}>
            </ErrorAlert>

            <div className='d-flex gap-2 mb-2'>
                {/* Clear button */}
                <Button className='flex-fill' variant='danger' type='button' onClick={onOrderDelete}>
                    <i className='bi bi-trash'></i>
                </Button>

                {/* Optimize button */}
                <Button className='flex-fill' type='submit'>{phrases.get('components.cuts.CutInstructionTable.optimize')}</Button>
            </div>

            {/* Delete all cuts modal */}
            <DeleteModal
                title={phrases.get('components.cuts.CutInstructionTable.delete.title')}
                subtitle={phrases.get('components.cuts.CutInstructionTable.delete.subtitle')}
                show={showDeleteModal}
                onCancel={onOrderDeleteCancel}
                onDelete={onOrderDeleteConfirm}>
            </DeleteModal>

            {/* Success message modal */}
            <SuccessModal
                title={phrases.get('components.cuts.CutInstructionTable.success.title')}
                subtitle={phrases.get('components.cuts.CutInstructionTable.success.subtitle')}
                show={showSuccessModal}
                onAccept={onOrderSubmitSuccess}>
            </SuccessModal>

        </Form>
    );
}

CutInstructionTable.propTypes = {
    order: PropTypes.instanceOf(Order).isRequired,
    onAddCut: PropTypes.func.isRequired,
    onRemoveCut: PropTypes.func.isRequired,
    onUpdateCut: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onOptimize: PropTypes.func.isRequired
};

export default CutInstructionTable;