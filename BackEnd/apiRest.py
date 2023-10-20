from flask import Flask, request, jsonify
import joblib
import json
import pandas as pd

app = Flask(__name__)

# Cargar el modelo de Machine Learning al iniciar la API
model = joblib.load('modelo.pkl')

@app.route('/', methods=['GET'])
def predict():
    try:
        # Define los nuevos datos como un DataFrame de Pandas
        nuevos_datos = pd.DataFrame({
            "area": [100],
            "rooms": [3],
            "bathroom": [2],
            "parking spaces": [1],
            "floor": [4],
            "animal_acept": [1],
            "animal_not acept": [0],
            "furniture_furnished": [1],
            "furniture_not furnished": [0],
            "city_Belo Horizonte": [0],
            "city_Campinas": [0],
            "city_Porto Alegre": [1],
            "city_Rio de Janeiro": [0],
            "city_São Paulo": [0]
        })
        # Convierte tus nuevos datos a un arreglo de NumPy
        nuevos_datos_array = nuevos_datos.values

        # Realizar la predicción utilizando el modelo
        prediction = model.predict(nuevos_datos_array)[0]  # Obtener el primer elemento (un número entero)

        # Obtener el primer valor del array
        hoa = prediction[0]
        rent_amount = prediction[1]
        property_tax = prediction[2]
        fire_insurance = prediction[3]
        total_rent = prediction[4]

        # Crear un diccionario con la predicción
        response = {
            "hoa (R$)": round(float(hoa), 2),
            "rent amount (R$)": round(float(rent_amount),2),
            "property tax (R$)": round(float(property_tax),2),
            "fire insurance (R$)": round(float(fire_insurance),2),
            "total (R$)": round(float(total_rent),2),
        }

        # Convertir el diccionario a formato JSON y devolverlo
        return json.dumps(response)

    except Exception as e:
        # Manejar errores, como datos incorrectos o problemas con el modelo
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
