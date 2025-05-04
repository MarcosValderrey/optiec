import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Title from '../common/Title';
import phrases from '../../utils/Phrases';


function HomePage() {
    // State
    const navigate = useNavigate();

    // Events
    function onStartButtonClick(event) {
        var url = phrases.get('App.paths.optimizer');

        navigate(url);
    }

    // Render
    return (
        <Container>
            <Row>
                <Col>
                    <Title
                        title={phrases.get('components.pages.HomePage.title')}
                        subtitle={phrases.get('components.pages.HomePage.subtitle')}>
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant='primary' size='lg' onClick={onStartButtonClick}>
                        {phrases.get('components.pages.HomePage.start')}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;