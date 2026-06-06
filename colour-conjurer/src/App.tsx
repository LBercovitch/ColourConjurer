import ImageDropzone from './components/ImageDropzone';
import Header from './components/Header';

import { ColourProvider } from './components/ColourContext';

function App() {

  return (
    <ColourProvider>
      <Header />
      <ImageDropzone />
    </ColourProvider>
  )
}

export default App;
