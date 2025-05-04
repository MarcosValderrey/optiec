import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import phrases from '../../utils/Phrases';


function WarningModal({ title, subtitle, show, onCancel }) {
    // Render
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{subtitle}</Modal.Body>
            <Modal.Footer>
                {/* Cancel button */}
                <Button variant='secondary' onClick={onCancel}>
                    {phrases.get('components.common.WarningModal.cancel')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

WarningModal.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default WarningModal;