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
    cityBeloHorizonte: 1,
    cityCampinas: 0,
    cityPortoAlegre: 0,
    cityRiodeJaneiro: 0,
    citySãoPaulo: 0,
    hoa: 0, // Valor inicial
    rentAmount: 0, // Valor inicial
    propertyTax: 0, // Valor inicial
    fireInsurance: 0, // Valor inicial
    total: 0, // Valor inicial
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construye la URL con los valores de formData
    const url = new URL('https://caguirre5.pythonanywhere.com');
    Object.entries(formData).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        // Actualiza el estado con los resultados
        setFormData({
          ...formData,
          hoa: result["hoa (R$)"],
          rentAmount: result["rent amount (R$)"],
          propertyTax: result["property tax (R$)"],
          fireInsurance: result["fire insurance (R$)"],
          total: result["total (R$)"],
        });
      } else {
        console.error('Error al obtener los datos del servidor');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    // Verificar si el checkbox es "animalAcept" o "furnitureFurnished" y actualizar el valor opuesto.
    if (name === 'animalAcept') {
      setFormData({ ...formData, [name]: inputValue, animalNotAcept: inputValue === 1 ? 0 : 1 });
    } else if (name === 'furnitureFurnished') {
      setFormData({ ...formData, [name]: inputValue, furnitureNotFurnished: inputValue === 1 ? 0 : 1 });
    } else if (name == 'selectedCity') {
      if (value == 'Belo Horizonte') {
        setFormData({ ...formData, cityBeloHorizonte: 1, cityCampinas:  0, cityPortoAlegre : 0, cityRiodeJaneiro : 0, citySãoPaulo : 0 });
      } else if (value == 'Campinas') {
        setFormData({ ...formData, cityBeloHorizonte: 0, cityCampinas:  1, cityPortoAlegre : 0, cityRiodeJaneiro : 0, citySãoPaulo : 0 });
      } else if (value == 'Porto Alegre') {
        setFormData({ ...formData, cityBeloHorizonte: 0, cityCampinas:  0, cityPortoAlegre : 1, cityRiodeJaneiro : 0, citySãoPaulo : 0 });
      } else if (value == 'Rio de Janeiro') {
        setFormData({ ...formData, cityBeloHorizonte: 0, cityCampinas:  0, cityPortoAlegre : 0, cityRiodeJaneiro : 1, citySãoPaulo : 0 });
      } else {
        setFormData({ ...formData, cityBeloHorizonte: 0, cityCampinas:  0, cityPortoAlegre : 0, cityRiodeJaneiro : 0, citySãoPaulo : 1 });
      }

    } else {
      setFormData({ ...formData, [name]: Number(inputValue) });
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
      <div className="result">
        <div>
          <label>hoa (R$):</label>
          <span>{formData.hoa}</span>
        </div>
        <div>
          <label>rent amount (R$):</label>
          <span>{formData.rentAmount}</span>
        </div>
        <div>
          <label>property tax (R$):</label>
          <span>{formData.propertyTax}</span>
        </div>
        <div>
          <label>fire insurance (R$):</label>
          <span>{formData.fireInsurance}</span>
        </div>
        <div>
          <label>total (R$):</label>
          <span>{formData.total}</span>
        </div>
      </div>
    </>
  )
}

export default App
