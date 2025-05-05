import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Title from '../common/Title';
import { useSettings } from '../../context/SettingsContext';
import { useSession } from '../../context/SessionContext';
import DateUtils from '../../utils/Dates';
import phrases from '../../utils/Phrases';


function SettingsPage() {
    // State
    const { settings, setSettings } = useSettings();
    const { session, setSession } = useSession();

    // Events
    function onSelectUnit(eventKey) {

        /*
        setSettings(prev => ({
            ...prev,
            unit: eventKey
        }));

        updateSettings({
            unit: eventKey
        });
        */

        console.log('settings before update');
        console.log(settings);

        /*
        var newSettings = settings.clone().update('units', eventKey);

        console.log('new settings');
        console.log(newSettings);

        setSettings(newSettings);

        console.log('settings after update');
        console.log(settings);
        */
    };

    // Render
    return (
        <Container>
            <Row>
                <Col>
                    <Title
                        title={phrases.get('components.pages.SettingsPage.title')}
                        subtitle={phrases.get('components.pages.SettingsPage.subtitle')}>
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered responsive>
                        <thead>
                            <tr>
                                <th className='w-50'>{phrases.get('components.pages.SettingsPage.table.description')}</th>
                                <th>{phrases.get('components.pages.SettingsPage.table.value')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Minimum Cut Distance */}
                            <tr>
                                <td>{phrases.get(settings.minCut.phrase)}</td>
                                <td>{settings.minCut.value}</td>
                            </tr>

                            {/* Conversion factor from mm to pixels */}
                            <tr>
                                <td>{phrases.get(settings.mmToPx.phrase)}</td>
                                <td>{settings.mmToPx.value}</td>
                            </tr>

                            {/* Units */}
                            <tr>
                                <td>{phrases.get(settings.units.phrase)}</td>
                                <td>{settings.units.value}</td>
                            </tr>

                            {/*
                            <tr>
                                <td>{settings.units.description}</td>
                                <td>
                                    <DropdownButton
                                        id='units-dropdown'
                                        title={settings.units.value}
                                        onSelect={onSelectUnit}>
                                        <Dropdown.Item eventKey='m'>m</Dropdown.Item>
                                        <Dropdown.Item eventKey='cm'>cm</Dropdown.Item>
                                        <Dropdown.Item eventKey='mm'>mm</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                            */}

                            {/* Display units */}
                            <tr>
                                <td>{phrases.get(settings.displayUnits.phrase)}</td>
                                <td>
                                    {
                                        settings.displayUnits.value ? phrases.get('models.Booleans.yes') : phrases.get('models.Booleans.no')
                                    }
                                </td>
                            </tr>

                            {/* Language */}
                            <tr>
                                <td>{phrases.get(settings.language.phrase)}</td>
                                <td>{settings.language.value}</td>
                            </tr>

                            {/* Last update */}
                            <tr>
                                <td>{phrases.get(settings.lastUpdate.phrase)}</td>
                                <td>{DateUtils.formatDateTime(settings.lastUpdate.value)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default SettingsPage;