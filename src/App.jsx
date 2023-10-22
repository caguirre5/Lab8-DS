import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    area: 100,
    rooms: 3,
    bathroom: 2,
    parking_spaces: 1,
    floor: 4,
    animal_acept: 0,
    animal_not_acept: 1,
    furniture_furnished: 0,
    furniture_not_furnished: 1,
    city_Belo_Horizonte: 1,
    city_Campinas: 0,
    city_Porto_Alegre: 0,
    city_Rio_de_Janeiro: 0,
    city_Sao_Paulo: 0,
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
      setFormData({ ...formData, [name]: inputValue, animal_not_acept: inputValue === 1 ? 0 : 1 });
    } else if (name === 'furnitureFurnished') {
      setFormData({ ...formData, [name]: inputValue, furniture_not_furnished: inputValue === 1 ? 0 : 1 });
    } else if (name == 'selectedCity') {
      if (value == 'Belo Horizonte') {
        setFormData({ ...formData, city_Belo_Horizonte: 1, city_Campinas:  0, city_Porto_Alegre : 0, city_Rio_de_Janeiro : 0, city_Sao_Paulo : 0 });
      } else if (value == 'Campinas') {
        setFormData({ ...formData, city_Belo_Horizonte: 0, city_Campinas:  1, city_Porto_Alegre : 0, city_Rio_de_Janeiro : 0, city_Sao_Paulo : 0 });
      } else if (value == 'Porto Alegre') {
        setFormData({ ...formData, city_Belo_Horizonte: 0, city_Campinas:  0, city_Porto_Alegre : 1, city_Rio_de_Janeiro : 0, city_Sao_Paulo : 0 });
      } else if (value == 'Rio de Janeiro') {
        setFormData({ ...formData, city_Belo_Horizonte: 0, city_Campinas:  0, city_Porto_Alegre : 0, city_Rio_de_Janeiro : 1, city_Sao_Paulo : 0 });
      } else {
        setFormData({ ...formData, cityBeloHorizonte: 0, city_Campinas:  0, city_Porto_Alegre : 0, city_Rio_de_Janeiro : 0, city_Sao_Paulo : 1 });
      }

    } else {
      setFormData({ ...formData, [name]: Number(inputValue) });
    }
  };

  return (
    <div>
      <h2>Cotizador de Rentas</h2>
      <div className='container'>
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
                  name="parking_spaces"
                  value={formData.parking_spaces}
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
              <label className='checkbox_input'>
                Animal permitido:
                <input
                  type="checkbox"
                  name="animalAcept"
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label className='checkbox_input'>
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
                  value={formData.city_Belo_Horizonte}
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
            <label>Impuesto HOA (R$):</label>
            <span>{formData.hoa}</span>
          </div>
          <div>
            <label>Renta parcial (R$):</label>
            <span>{formData.rentAmount}</span>
          </div>
          <div>
            <label>Impuesto sobre bienes inmuebles (R$):</label>
            <span>{formData.propertyTax}</span>
          </div>
          <div>
            <label>Seguro contra incendios (R$):</label>
            <span>{formData.fireInsurance}</span>
          </div>
          <div>
            <label>Renta total (R$):</label>
            <span>{formData.total}</span>
          </div>
          <h3>Visualización de los datos</h3>
          <div className='graphs'>
            <img src="assets/tendencias_alquiler.png" alt="Mi Imagen1" />
            <img src="assets/correlacion_total.png" alt="Mi Imagen2" />
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default App
