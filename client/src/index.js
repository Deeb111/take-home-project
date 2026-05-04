const React = require("React");
const ReactDOM = require("react-dom/client");
const {BrowserRouter} = require("react-router-dom");
const App = require("./App.js");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);