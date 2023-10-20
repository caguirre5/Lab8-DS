import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <aside>
        <form onSubmit={{}}>
          <div>
            <label>
              Área:
              <input
                type="number"
                name="area"
              />
            </label>
          </div>
          <div>
            <label>
              Habitaciones:
              <input
                type="number"
                name="rooms"
              />
            </label>
          </div>
          <div>
            <label>
              Baños:
              <input
                type="number"
                name="bathroom"
              />
            </label>
          </div>
          <div>
            <label>
              Plazas de Aparcamiento:
              <input
                type="number"
                name="parkingSpaces"
              />
            </label>
          </div>
          <div>
            <label>
              Piso:
              <input
                type="number"
                name="floor"
              />
            </label>
          </div>
          <div>
            <label>
              Animal permitido:
              <input
                type="checkbox"
                name="animalAcept"
              />
            </label>
          </div>
          <div>
            <label>
              Amueblado:
              <input
                type="checkbox"
                name="furnitureFurnished"
              />
            </label>
          </div>
          <div>
            <label>
              Ciudad:
              <select
                name="selectedCity"
              >
                <option value="Belo Horizonte">Belo Horizonte</option>
                <option value="Campinas">Campinas</option>
                <option value="Porto Alegre">Porto Alegre</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="São Paulo">São Paulo</option>
              </select>
            </label>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </aside>
    </>
  )
}

export default App
