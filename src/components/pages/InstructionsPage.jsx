import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

import Title from '../common/Title';
import phrases from '../../utils/Phrases';


function InstructionsPage() {
    // Render
    return (
        <Container>
            <Row>
                <Col>
                    <Title
                        title={phrases.get('components.pages.InstructionsPage.title')}
                        subtitle={phrases.get('components.pages.InstructionsPage.subtitle')}>
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup as='ol' numbered>
                        <ListGroup.Item as='li'>{phrases.get('components.pages.InstructionsPage.bullets.1')}</ListGroup.Item>
                        <ListGroup.Item as='li'>{phrases.get('components.pages.InstructionsPage.bullets.2')}</ListGroup.Item>
                        <ListGroup.Item as='li'>{phrases.get('components.pages.InstructionsPage.bullets.3')}</ListGroup.Item>
                        <ListGroup.Item as='li'>{phrases.get('components.pages.InstructionsPage.bullets.4')}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default InstructionsPage;