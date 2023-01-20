import { ICurrencyFormatter } from '../interfaces/utilsInterfaces';

export const fechaYHoraActual = () => {
  const diaActual = new Date().getDate();
  const mesActual = new Date().getMonth();
  const anioActual = new Date().getFullYear();
  const horaActual = new Date().getHours();
  const minutosActual = new Date().getMinutes();
  const segundosActual = new Date().getSeconds();

  return `${diaActual}/${mesActual}/${anioActual} ${horaActual}:${minutosActual}:${segundosActual}`;
}

export function currencyFormatter({ currency, value }: ICurrencyFormatter) {
  const formatter = new Intl.NumberFormat('en-ES', {
    style: 'currency',
    minimumFractionDigits: 0,
    currency,
  });
  return formatter.format(value);
}

export const exportDataToJSON = (data: {}) => {


  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement('a');
  link.href = jsonString;
  link.download = `order_de_compra_${fechaYHoraActual()}.json`;

  link.click();
};
