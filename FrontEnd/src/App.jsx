import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    area: 100,
    rooms: 3,
    bathroom: 2,
    parkingSpaces: 1,
    floor: 4,
    animalAcept: 0,
    animalNotAcept: 1,
    furnitureFurnished: 0,
    furnitureNotFurnished: 1,
    selectedCity: 'Belo Horizonte',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Serializar los datos del formulario en un objeto JSON
    const data = {
      area: formData.area,
      rooms: formData.rooms,
      bathroom: formData.bathroom,
      parkingSpaces: formData.parkingSpaces,
      floor: formData.floor,
      animal_acept: formData.animalAcept,
      animal_not_acept: formData.animalNotAcept,
      furniture_furnished: formData.furnitureFurnished,
      furniture_not_furnished: formData.furnitureNotFurnished,
      selectedCity: formData.selectedCity,
    };
    console.log(data)

    // Realizar la solicitud al servidor Flask
    // try {
    //   const response = await fetch('https://caguirre5.pythonanywhere.com/', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     // Convierte los datos en una cadena JSON antes de enviarlos
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     // Manejar la respuesta del servidor
    //     const result = await response.json();
    //     // Hacer algo con los resultados (por ejemplo, mostrarlos en la interfaz de usuario)
    //     console.log(result);
    //   } else {
    //     // Manejar errores en la respuesta
    //     console.error('Error al obtener los datos del servidor');
    //   }
    // } catch (error) {
    //   console.error('Error de red:', error);
    // }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    // Verificar si el checkbox es "animalAcept" o "furnitureFurnished" y actualizar el valor opuesto.
    if (name === 'animalAcept') {
      setFormData({ ...formData, [name]: inputValue, animalNotAcept: inputValue === 1 ? 0 : 1 });
    } else if (name === 'furnitureFurnished') {
      setFormData({ ...formData, [name]: inputValue, furnitureNotFurnished: inputValue === 1 ? 0 : 1 });
    } else {
      setFormData({ ...formData, [name]: inputValue });
    }
  };

  return (
    <>
      <aside>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Área:
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Habitaciones:
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Baños:
              <input
                type="number"
                name="bathroom"
                value={formData.bathroom}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Plazas de Aparcamiento:
              <input
                type="number"
                name="parkingSpaces"
                value={formData.parkingSpaces}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Piso:
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Animal permitido:
              <input
                type="checkbox"
                name="animalAcept"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Amueblado:
              <input
                type="checkbox"
                name="furnitureFurnished"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Ciudad:
              <select
                name="selectedCity"
                value={formData.selectedCity}
                onChange={handleInputChange}
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
