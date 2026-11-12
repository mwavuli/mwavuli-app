import { isPersona } from '@mwavuli/personas';
import { Route, Routes, useParams } from 'react-router';
import { Chrome } from './Chrome';
import { NotFound } from './NotFound';
import { PersonaHost } from './PersonaHost';
import { Picker } from './Picker';

function PersonaRoute() {
  const { persona } = useParams();
  return isPersona(persona) ? <PersonaHost persona={persona} /> : <NotFound />;
}

export function App() {
  return (
    <Chrome>
      <Routes>
        <Route index element={<Picker />} />
        <Route path=":persona/*" element={<PersonaRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Chrome>
  );
}
