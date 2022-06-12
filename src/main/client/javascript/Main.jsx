import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../css/Main.css';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            text: "none"
        }
    }

    render() {
        return (
            <div id="main">
                <h1>{this.state.text}</h1>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />
            </div>
        );
    }

    componentDidMount() {
        const httpGetAsync = (callback) => {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    callback(xmlHttp.responseText);
                }
            }
            xmlHttp.open("GET", "/api/page/Home", true);
            xmlHttp.send(null);
        }

        httpGetAsync(text => {
            
        });
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('react-mountpoint')
);

/**
{{  }} is a template.
[[  ]] is an external image.
*/