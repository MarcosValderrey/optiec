import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Title from '../common/Title';
import { useSettings } from '../../context/SettingsContext';
import MaterialGallery from '../materials/MaterialGallery';
import phrases from '../../utils/Phrases';


function MaterialPage() {
    // State
    const { settings, setSettings } = useSettings();

    // Render
    return (
        <Container>
            <Row>
                <Col>
                    <Title
                        title={phrases.get('components.pages.MaterialPage.title')}
                        subtitle={phrases.get('components.pages.MaterialPage.subtitle')}>
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col>
                    <MaterialGallery></MaterialGallery>
                </Col>
            </Row>
        </Container>
    );
}

export default MaterialPage;