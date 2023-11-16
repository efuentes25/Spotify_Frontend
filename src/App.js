import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import PlaylistDisplay from './components/PlaylistDisplay';
import SearchBar from './components/SearchBar';
import MusicApp from './MusicApp';

function App() {
  return (
    <div>
      <MusicApp />
    </div>
  );
}


export default App;