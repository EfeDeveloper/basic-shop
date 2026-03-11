import { ICurrencyFormatter } from '../interfaces/utilsInterfaces';

export const fechaYHoraActual = (): string => {
  const now = new Date();
  const date = now.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const time = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  return `${date} ${time}`;
};

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
