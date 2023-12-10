import React, { useContext, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../App';

const AppNav = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const { authenticated, setAuthenticated } = useContext(UserContext);

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	return (
		<Navbar className="app-nav" bg="dark" variant="dark" expand="lg" style={{ paddingInline: '5rem' }}>
			<Navbar.Brand href="/">DSeven</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/play">Play</Nav.Link>
					<Nav.Link href="/albumSearch">Album Search</Nav.Link>
					<Nav.Link href="/create">Create</Nav.Link>
				</Nav>
				<Nav>
					<Dropdown show={showDropdown} onToggle={toggleDropdown} >
						<Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: '#13c313' }}>
							<FontAwesomeIcon icon={faUser} />
						</Dropdown.Toggle>

						<Dropdown.Menu align="right">
							{/* <Dropdown.Item href="#profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#settings">Settings</Dropdown.Item>
              <Dropdown.Divider /> */}
							{!authenticated && <Dropdown.Item href="/login">Login</Dropdown.Item>}
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default AppNav;
