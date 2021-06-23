export const parseCurrency = (num: number) =>
  num.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP'
  })
