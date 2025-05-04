import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Title from '../common/Title';
import PlaqueGallery from '../plaques/PlaqueGallery';
import PlaqueList from '../plaques/PlaqueList';
import phrases from '../../utils/Phrases';


function PlaquePage() {
    // Render
    return (
        <Container>
            <Row>
                <Title
                    title={phrases.get('components.pages.PlaquePage.title')}
                    subtitle={phrases.get('components.pages.PlaquePage.subtitle')}>
                </Title>
            </Row>
            <Row>
                <Col>
                    <PlaqueGallery></PlaqueGallery>
                </Col>
            </Row>
        </Container>
    );
}

export default PlaquePage;