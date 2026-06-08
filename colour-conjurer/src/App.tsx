import ImageDropzone from './components/ImageDropzone';
import Header from './components/Header';
import ColourPalette from './components/ColourPalette';

import { ColourProvider } from './components/ColourContext';

function App() {

  return (
    <ColourProvider>
      <Header />
      <div className='responsive-width grid grid-cols-5'>
        <ImageDropzone />
        <ColourPalette />
      </div>
    </ColourProvider>
  )
}

export default App;
