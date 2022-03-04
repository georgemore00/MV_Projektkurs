import React from "react";
import "./App.css";
import NavbarComponent from "./Components/NavbarComponent";

class App extends React.Component {
    render() {
        return (
            <>
                <div className="App">
                    <NavbarComponent></NavbarComponent>
                </div>
            </>
        );
    }
}
export default App;