import React from "react";
import {
    Routes,
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Info from "./Info";
import Draw from "./Draw"
import LoadImage from "./LoadImage"
import Detection from "./Detection";
import ImageDetection from "./ImageDetection";

const NavBarComponent = () => {
    return (
        <Router>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Shared Augmentation</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/Detection">
                                Detection
                            </Nav.Link>
                            <Nav.Link as={Link} to="/Draw">
                                Draw
                            </Nav.Link>
                            <Nav.Link as={Link} to="/LoadImage">
                                Load Image
                            </Nav.Link>
                            <Nav.Link as={Link} to="/ImageDetection">
                                Image Detection
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Info />} />
                    <Route path="/Detection" element={<Detection />} />
                    <Route path="/Draw" element={<Draw />} />
                    <Route path="/LoadImage" element={<LoadImage />} />
                    <Route path="/ImageDetection" element={<ImageDetection />} />
                </Routes>
            </div>
        </Router>
    );
}

export default NavBarComponent;