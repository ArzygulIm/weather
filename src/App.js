import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Main from "./Main/Main";

const App = () => {
    return (
        <div>
          <Routes>
              <Route exact path={'/'} element={<Main/>}/>
          </Routes>
        </div>
    );
};

export default App;