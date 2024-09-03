
import { useRoutes } from "react-router-dom";
import routes from './routes/routes';

function App() {
  const pages = useRoutes(routes);


  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: 'scroll',
        overflowX: 'hidden'
      }}
    >

      {pages}

    </div>
  );
}

export default App
