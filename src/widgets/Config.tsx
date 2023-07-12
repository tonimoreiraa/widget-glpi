import { useRef, useState } from "react";
import api from "../services/api";

const Config = () => {
  const userInput = useRef<any>()
  const passwordInput = useRef<any>()
  const [error, setError] = useState()
  const [success, setSuccess] = useState<boolean>(false)
  async function signIn()
  {
    setError(undefined)
    const username = userInput.current?.value
    const password = passwordInput.current?.value
    try {
      const response = await api.get('/initSession', {
        headers: {
          Authorization: `Basic ` + btoa(`${username}:${password}`),
          'App-Token': import.meta.env.VITE_APP_GLPI_APP_TOKEN
        }
      })
      window.localStorage.setItem('@glpi-session-token', response.data.session_token)
      setSuccess(true)
      window.location.href = '/'
    } catch (e: any) {
      console.error(e)
      setError(e.response.data)
    }
  }

  return (
    <div className="flex items-center justify-center h-full bg-neutral-900 text-white">
      <div className="w-64 rounded p-8">
        <h2 className="text-xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            {!!error && <h1 className="text-red-500 text-center">{JSON.stringify(error)}</h1>}
            {!!success && <h1 className="text-green-500 text-center">Você conectou com sucesso!</h1>}
            <label htmlFor="username" className="block text-sm font-medium mb-1">Usuário</label>
            <input
              type="text"
              id="username"
              className="border border-neutral-400 rounded py-2 px-3 w-full bg-transparent"
              placeholder="seuusuarioglpi"
              ref={userInput}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              id="password"
              className="border border-neutral-400 rounded py-2 px-3 w-full bg-transparent"
              placeholder="••••••••"
              ref={passwordInput}
            />
          </div>
          <button
            className="bg-neutral-500 text-white rounded py-2 px-4 w-full"
            onClick={signIn}
          >
            Entrar
          </button>
      </div>
    </div>
  );
};

export default Config;