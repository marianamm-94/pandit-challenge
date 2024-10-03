import './App.css';
import Topbar from './Components/Topbar';
import MovieTable from './Components/MovieTable';

function App() {
  return (
    <>
      <Topbar />
      <div>
        <h1 className="App-title">Movie ranking</h1>
        <MovieTable />
      </div>
        
    </>
  );
}

export default App;
