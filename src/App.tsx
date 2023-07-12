import WidgetButton from "./components/WidgetButton"
import TicketsCount from "./widgets/TicketsCount"
import { Route, BrowserRouter, Routes, NavLink } from "react-router-dom"
import TicketsNew from "./widgets/TicketsNew"
import { IoSettings } from 'react-icons/io5'
import Config from "./widgets/Config"

function Widgets()
{
  return <div className="bg-neutral-900 w-screen h-screen text-white p-6">
    <div className="flex justify-between items-center">
      <h1 className="font-semibold text-lg">Selecionar widget</h1>
      <NavLink to="/config">
        <IoSettings size={24} className="bg-neutral-700 rounded-lg p-1" />
      </NavLink>
    </div>
    <div className="grid grid-cols-2 mt-3 gap-3 text-center font-bold items-center">
      <WidgetButton title="Contagem de chamados" route="/widgets/tickets-count" />
      <WidgetButton title="Novos chamados" route="/widgets/tickets-new" />
      <div className="text-center">{import.meta.env.VITE_APP_GLPI_URL}</div>
    </div>
  </div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/widgets/tickets-count" element={<TicketsCount />}  />
        <Route path="/widgets/tickets-new" element={<TicketsNew />}  />
        <Route path="/config" element={<Config />}  />
        <Route path="*" element={<Widgets />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
