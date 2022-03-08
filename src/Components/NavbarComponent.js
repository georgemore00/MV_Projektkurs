import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { render } from "react-dom";
import Detection from "./DetectionComponent";
import ImageLoadComponent from "./ImageLoadComponent"
import GetImageComponentfrom from "./GetImageComponent"
import {
    Routes,
    BrowserRouter as Router,
    Route,
    Link,
    Outlet,
} from "react-router-dom";

export default class NavbarComponent extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">Navbar</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/Detect">
                                    Detection
                                </Nav.Link>
                                <Nav.Link as={Link} to="/LoadImage">
                                    Calibrate
                                </Nav.Link>
                                <Nav.Link as={Link} to="/GetImage">
                                    GetImage
                                </Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        <Route path="/Detect" element={<Detection />} />
                        <Route path="/LoadImage" element={<ImageLoadComponent />} />
                        <Route path="/GetImage" element={<GetImageComponentfrom />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}