# Habi Pizza
Este proyecto es una app para registrar ordenes de pizzas, como una aproximación al clean architecture y el domain driven design. El objetivo de hacerlo de esta manera es tener un código altamente cohesionado y altamente desacoplado, lo que lo hace facil de mantener, de testear y de extender; además que permite migrar de tecnologías de base de datos, UI, y cualquier sistema externo sin tener que reescribir el core de la aplicación, que contiene la lógica de negocio.

## Estructura

```
- context
    - buyer
        - domain
        - use-cases
    - ingredient
        - domain
        - infraestructure
        - use-cases
    - pizza
        - domain
        - use-cases
    - sales
        - domain
        - infraestructure
        - use-cases
    - shared
        - interfaces
        - value-objects
- frontend
    - componentns
    - helpers
- server
 - db.json
 - server.js
```

## Stack
- NextJS como framework frontend
- React Hook Forms. Es una librería sencilla y muy poderosa para el manejo de formularios.
- JSON Server. Una librería muy útil para crear un servidor de NodeJS con base en un archivo JSON en el disco local. Esta es la base de datos del proyecto.

**Nota:** Dado que el proyecto no es de una gran magnitud, no se utilizó Redux. El estado de la aplicación está manejado directamente en los componentes, o en la base de datos cuando se necesita persistir. El añadir Redux a este proyecto podría constituir más desventajas que ventajas, puesto que es código extra para hacer una función que ReactJS tiene incorporada y que por el momento funciona bastante bien.

> A good architecture allow major decisions to be deferred. A good architecture maximizes the mumber of decisions not made. - Robert C. Martin.

## Pasos para ejecutar en local
1. Clonar el repositorio
```
$ SSH: git clone git@github.com:CalaoJuanPablo/habi-pizza.git
$ HTTPS: git clone https://github.com/CalaoJuanPablo/habi-pizza.git
```

2. Ir al directorio del proyecto e instalar paquetes
```
cd habi-pizza
npm install
```

3. Levantar el servidor de backend
```
npm run start:server
```

4. Levantar el servidor de frontend
```
npm run dev
```

5. El proyecto se estará ejecutando en `localhost:3000`