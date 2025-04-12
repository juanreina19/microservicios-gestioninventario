
# 📦 Inventario Distribuido con Microservicios

Este sistema permite gestionar productos y calcular automáticamente el valor total del inventario de cada uno. Está dividido en dos microservicios independientes, que se comunican entre sí mediante HTTP. Toda la arquitectura está contenerizada y orquestada con Docker Compose.

---

## 🧱 Arquitectura del Sistema

### 1. **Producto Service** (Node.js + Express)
Responsable de:
- Registrar productos.
- Consultar y actualizar productos.
- Enviar precio y cantidad al microservicio de cálculo para obtener el `valor_total`.

### 2. **Cálculo Service** (Python + Flask)
Encargado de:
- Recibir precio y cantidad.
- Calcular `valor_total = precio × cantidad`.
- Devolverlo al producto-service.

---
## 🚀 Cómo ejecutar el sistema

1. **Clonar el repositorio**

```bash
git clone [<URL-del-repo>](https://github.com/juanreina19/microservicios-gestioninventario)
cd <nombre-carpeta>
```

2. **Construir e iniciar los contenedores**

```bash
docker-compose up --build
```

Esto iniciará:
- `producto-service` en el puerto `3000`
- `calculo-service` en el puerto `5000`

---

## 📡 Endpoints disponibles

### Producto Service (`http://localhost:3000/productos`)

- **GET /**  
  Obtener todos los productos registrados.

- **POST /**  
  Registrar un nuevo producto.  
  **Ejemplo JSON:**
  ```json
  {
    "codigo": "P001",
    "nombre": "Mouse Gamer",
    "precio": 100,
    "cantidad": 5
  }
  ```

- **PUT /:codigo**  
  Actualizar precio o cantidad de un producto.  
  **Ejemplo JSON:**
  ```json
  {
    "precio": 120,
    "cantidad": 6
  }
  ```

---

### Cálculo Service (`http://localhost:5000/calcular`)

- **POST /**  
  Calcula el valor total.  
  **Ejemplo JSON:**
  ```json
  {
    "precio": 100,
    "cantidad": 5
  }
  ```

  **Respuesta:**
  ```json
  {
    "valor_total": 500
  }
  ```

---

## ⚙️ Tecnologías usadas

- **Node.js + Express** (servicio de productos)
- **Python + Flask** (servicio de cálculo)
- **Docker + Docker Compose** (contenedorización y orquestación)
- **JSON** como almacenamiento simulado

---

## ✅ Requisitos funcionales cumplidos

- Registro, actualización y consulta de productos.
- Cálculo automático del valor total al registrar/editar.
- Separación clara de responsabilidades (cada microservicio cumple su rol).
- Comunicación entre servicios vía HTTP.
- Persistencia simulada con archivo JSON.
- Contenerización con Docker y orquestación con Docker Compose.

---

## 🛠 Mantenimiento

- Para reiniciar servicios:
  ```bash
  docker-compose down
  docker-compose up --build
  ```

- Para ver logs en tiempo real:
  ```bash
  docker-compose logs -f
  ```


