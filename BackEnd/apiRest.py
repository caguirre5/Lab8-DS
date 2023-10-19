from flask import Flask, request, jsonify
import joblib
import json

app = Flask(__name__)

# Cargar el modelo de Machine Learning al iniciar la API
model = joblib.load('modelo.pkl')

@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Parámetros de ejemplo para la predicción
        example_params = [5.1, 3.5, 1.4, 0.2]

        # Realizar la predicción utilizando el modelo
        prediction = model.predict([example_params])[0]  # Obtener el primer elemento (un número entero)

        # Crear un diccionario con la predicción
        response = {"prediction": int(prediction)}

        # Convertir el diccionario a formato JSON y devolverlo
        return json.dumps(response)

    except Exception as e:
        # Manejar errores, como datos incorrectos o problemas con el modelo
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
