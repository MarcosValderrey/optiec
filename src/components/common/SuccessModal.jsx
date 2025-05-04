import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import phrases from '../../utils/Phrases';


function SuccessModal({ title, subtitle, show, onAccept }) {
    // Render
    return (
        <Modal show={show} onHide={onAccept}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{subtitle}</Modal.Body>
            <Modal.Footer>
                {/* Accept button */}
                <Button variant='primary' onClick={onAccept}>
                    {phrases.get('components.common.SuccessModal.accept')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

SuccessModal.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired
};

export default SuccessModal;