import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/login" element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
