import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';


function ErrorAlert({ title, show, errors }) {
    // Render
    var render = null;
    if (show && errors) {
        render = <Alert variant='danger'>
            <Alert.Heading>{title}</Alert.Heading>
            <ListGroup as='ol' numbered>
                {
                    errors.map((error, index) => (
                        <ListGroup.Item key={index} as='li' variant='danger'>{error}</ListGroup.Item>
                    ))
                }
            </ListGroup>
        </Alert>;
    }

    return render;
}

ErrorAlert.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string)
};

export default ErrorAlert;