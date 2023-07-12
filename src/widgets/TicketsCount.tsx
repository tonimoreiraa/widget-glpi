import axios from "axios";
import { useQuery } from "react-query";
import { glpiSessionToken } from "../services/api";

function TicketsCount() {
  var options = {
    method: 'GET',
    url: 'https://suporte.itentecnologia.com.br/apirest.php/Ticket',
    headers: {'Session-Token': glpiSessionToken}
  };

  const {data} = useQuery('@tickets', async () => (await axios.request(options)).data, {cacheTime: 10000})

  return (
    <div className="bg-neutral-900 w-screen h-screen text-white p-6">
      <h1 className="font-semibold text-lg">Resumo de chamados</h1>
      {data && <div className="grid grid-cols-3 mt-3 gap-3">
        <div className="text-left">
          <h1 className="text-5xl font-bold">{data.length}</h1>
          <h2 className="font-semibold">Todos abertos</h2>
        </div>
        <div className="text-left text-green-400">
          <h1 className="text-5xl font-bold">{data.filter((ticket: any) => ticket.status == 1).length}</h1>
          <h2 className="font-semibold">Abertos agora</h2>
        </div>
        <div className="text-left text-yellow-400">
          <h1 className="text-5xl font-bold">{data.filter((ticket: any) => ticket.status == 4).length}</h1>
          <h2 className="font-semibold">Pendentes</h2>
        </div>
        <div className="text-left text-sky-400">
          <h1 className="text-5xl font-bold">{data.filter((ticket: any) => ticket.status == 2).length}</h1>
          <h2 className="font-semibold">Processando (você)</h2>
        </div>
        <div className="text-left text-red-400">
          <h1 className="text-5xl font-bold">{data.filter((ticket: any) => ticket.status == 3).length}</h1>
          <h2 className="font-semibold">Processando (planejado)</h2>
        </div>
        <div className="text-left text-purple-500">
          <h1 className="text-5xl font-bold">{data.filter((ticket: any) => ticket.status == 5).length}</h1>
          <h2 className="font-semibold">Fechados</h2>
        </div>
      </div>}
    </div>
  )
}

export default TicketsCount
