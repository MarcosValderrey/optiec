import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import phrases from '../../utils/Phrases';


function DeleteModal({ title, subtitle, show, onCancel, onDelete }) {
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
                    {phrases.get('components.common.DeleteModal.cancel')}
                </Button>

                {/* Delete button */}
                <Button variant='danger' onClick={onDelete}>
                    {phrases.get('components.common.DeleteModal.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

DeleteModal.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default DeleteModal;