import {Fragment} from "react";
import {useRoutes} from "react-router-dom";
import routers from "./routers";
const GetRoutes = ()=>{
    return useRoutes(routers)
}
function App() {
    return (
          <Fragment>
              <div>
                  <GetRoutes/>
              </div>
          </Fragment>
      );
}

export default App;
