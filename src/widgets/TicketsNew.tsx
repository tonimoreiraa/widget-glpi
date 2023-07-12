import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { glpiSessionToken } from "../services/api";

const priorities: any = {
    1: { name: 'Prioridade Muito Baixa', color: 'text-sky-500' },
    2: { name: 'Prioridade Baixa', color: 'text-green-500' },
    3: { name: 'Prioridade Média', color: 'text-yellow-500' },
    4: { name: 'Prioridade Alta', color: 'text-orange-500' },
    5: { name: 'Prioridade Muita Alta', color: 'text-red-500' },
    6: { name: 'Prioridade Urgente', color: 'text-purple-500' }
};

function TicketsNew() {
  var options = {
    method: 'GET',
    url: 'https://suporte.itentecnologia.com.br/apirest.php/Ticket',
    headers: {'Session-Token': glpiSessionToken}
  };

  const {data, refetch} = useQuery('@tickets', async () => (await axios.request(options)).data)

  useEffect(() => {
    setInterval(() => {
        refetch()
    }, 10000)
  }, [])

  return (
    <div className="bg-neutral-800 w-screen h-screen text-white p-6 overflow-y-auto">
      <div className="hidden bg-sky-500 bg-green-500 bg-yellow-500 bg-orange-500 bg-red-500 bg-purple-500"></div>
      <h1 className="font-semibold text-lg">Novos chamados</h1>
      {data && <div className="grid grid-cols-1 mt-3 gap-y-3">
        {data.sort((x: any, y: any) => x.priority - y.priority).reverse().map((ticket: any) => <NavLink to={"https://suporte.itentecnologia.com.br/front/ticket.form.php?id=" + ticket.id} target="_blank" key={ticket.id} className="flex flex-row justify-between items-center border-b border-neutral-700 pb-2">
            <div>
                <h1 className="font-bold text-sm">{ticket.name}</h1>
                <h2 className="font-semibold text-neutral-400 text-xs">{ticket.name}</h2>
            </div>
            <div className="flex flex-row gap-x-2 items-center">
                <div className={`w-3 h-3 rounded-full ${priorities[ticket.priority].color.replace('text', 'bg')}`}></div>
                <h2 className={`${priorities[ticket.priority].color} text-sm`}>{priorities[ticket.priority].name}</h2>
            </div>
        </NavLink>)}
      </div>}
    </div>
  )
}

export default TicketsNew
