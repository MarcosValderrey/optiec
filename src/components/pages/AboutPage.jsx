import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Title from '../common/Title';
import packageJSON from '../../../package.json';
import DateUtils from '../../utils/Dates';
import phrases from '../../utils/Phrases';


function AboutPage() {
    // State
    const title = 'Detalles';
    const subtitle = 'Información general del producto';

    // Render
    return (
        <Container>
            <Row>
                <Col>
                    <Title title={phrases.get('components.pages.AboutPage.title')} subtitle={phrases.get('components.pages.AboutPage.subtitle')}></Title>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th className='w-50'>{phrases.get('components.pages.AboutPage.table.description')}</th>
                                <th>{phrases.get('components.pages.AboutPage.table.value')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Software product name */}
                            <tr>
                                <td>{phrases.get('components.pages.AboutPage.table.product')}</td>
                                <td>{packageJSON.name}</td>
                            </tr>

                            {/* Software version */}
                            <tr>
                                <td>{phrases.get('components.pages.AboutPage.table.version')}</td>
                                <td>{packageJSON.version}</td>
                            </tr>

                            {/* Author */}
                            <tr>
                                <td>{phrases.get('components.pages.AboutPage.table.author')}</td>
                                <td>{packageJSON.author}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutPage;