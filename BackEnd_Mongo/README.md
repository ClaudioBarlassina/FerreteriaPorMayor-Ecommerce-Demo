
# 🚀 Backend generado automáticamente

API REST generada desde JSON.

---

## ⚙️ Instalación

```
npm install
```

---

## 🚀 Ejecutar

```
node app.js
```

---

## 📦 Endpoints


## 📦 0

### Endpoint base
```
/api/0
```

### 🔍 Ejemplos de uso

#### Obtener todos
```
GET /api/productos
```

#### Filtrar dinámico
```
GET /api/0?0=valor
```

#### Filtrar múltiple
```
GET /api/0?0=valor&1=valor
```

#### Paginación
```
GET /api/0?page=1&limit=10
```

#### Obtener por ID
```
GET /api/0/:id
```

#### Crear
```
POST /api/0
```

#### Actualizar
```
PUT /api/0/:id
```

#### Eliminar
```
DELETE /api/0/:id
```


---

## ⚙️ Variables de entorno

Crear archivo .env:

```
MONGO_URI=mongodb+srv://claubarlassina_db_user:ZvMYTJdHNd3w2ejR@cluster0.a7ywekv.mongodb.net
DB_NAME=test
COLLECTION=products
```

---

## 💡 Notas

- Los filtros son dinámicos según el modelo
- La búsqueda es case insensitive
- Soporta múltiples modelos

---

🔥 Generado por tu Backend Agent
