# Habi Pizza
Este proyecto es una app para registrar ordenes de pizzas, como una aproximación al clean architecture y el domain driven design. El objetivo de hacerlo de esta manera es tener un código altamente cohesionado y altamente desacoplado, lo que lo hace facil de mantener, de testear y de extender; además que permite migrar de tecnología sin perder el core que contiene la lógica de negocio.

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