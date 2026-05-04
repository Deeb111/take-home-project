const React = require("React");
const {Routes, Route} = require("react-router-dom");

function App(){
    return(
        <Routes>
            <Route path = "/" element={<></>}/>
        </Routes>
    )
}
module.exports = App;