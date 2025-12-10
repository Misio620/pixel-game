import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { QuizScreen } from './pages/QuizScreen';
import { ResultScreen } from './pages/ResultScreen';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<QuizScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
