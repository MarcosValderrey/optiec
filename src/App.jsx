import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css';
import Header from './components/common/Header';
import AboutPage from './components/pages/AboutPage';
import HomePage from './components/pages/HomePage';
import InstructionsPage from './components/pages/InstructionsPage';
import MaterialPage from './components/pages/MaterialPage';
import OptimizerPage from './components/pages/OptimizerPage';
import PlaquePage from './components/pages/PlaquePage';
import SettingsPage from './components/pages/SettingsPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <div>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/optimizer' element={<OptimizerPage />}/>
            <Route path='/optimizador' element={<OptimizerPage />}/>
            <Route path='/instructions' element={<InstructionsPage />}/>
            <Route path='/instrucciones' element={<InstructionsPage />}/>
            <Route path='/materials' element={<MaterialPage />}/>
            <Route path='/materiales' element={<MaterialPage />}/>
            <Route path='/plaques' element={<PlaquePage />}/>
            <Route path='/placas' element={<PlaquePage />}/>
            <Route path='/configuration' element={<SettingsPage />}/>
            <Route path='/configuracion' element={<SettingsPage />}/>
            <Route path='/details' element={<AboutPage />}/>
            <Route path='/detalles' element={<AboutPage />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
