# Importar las bibliotecas necesarias
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

# Cargar un conjunto de datos de ejemplo (en este caso, Iris)
data = datasets.load_iris()
X = data.data
y = data.target

# Dividir los datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear un modelo de regresión logística (ejemplo simple)
model = LogisticRegression(max_iter=1000)

# Entrenar el modelo
model.fit(X_train, y_train)

# Evaluar el modelo
accuracy = model.score(X_test, y_test)
print(f"Precisión del modelo: {accuracy}")

# Guardar el modelo en un archivo
joblib.dump(model, 'modelo.pkl')

# Datos de entrada para hacer una predicción
nuevos_datos = [5.1, 3.5, 1.4, 0.2]

# Realizar la predicción utilizando el modelo
prediccion = model.predict([nuevos_datos])

# El resultado será la clase predicha (0, 1 o 2) en función de las características proporcionadas
print(f"Clase predicha: {prediccion[0]}")
