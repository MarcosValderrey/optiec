import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import phrases from '../../utils/Phrases';


function Header() {
    // Render
    return (
        <Navbar expand='lg' className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href='/'>
                    <img src='images/logos/iec.png' alt='IEC' height={64} className='d-inline-block' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='optiec-navbar-nav'></Navbar.Toggle>
                <Navbar.Collapse id='optiec-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href={phrases.get('App.paths.optimizer')}>{phrases.get('components.common.Header.optimizer')}</Nav.Link>
                        <Nav.Link href={phrases.get('App.paths.instructions')}>{phrases.get('components.common.Header.instructions')}</Nav.Link>
                        <Nav.Link href={phrases.get('App.paths.materials')}>{phrases.get('components.common.Header.materials')}</Nav.Link>
                        <Nav.Link href={phrases.get('App.paths.plaques')}>{phrases.get('components.common.Header.plaques')}</Nav.Link>
                        <Nav.Link href={phrases.get('App.paths.configuration')}>{phrases.get('components.common.Header.configuration')}</Nav.Link>
                        <Nav.Link href={phrases.get('App.paths.details')}>{phrases.get('components.common.Header.about')}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
