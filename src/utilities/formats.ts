export const formatDate = ({ value }:any) => {
  if (!value) return "";
  const date = new Date(value);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return day + "-" + month + "-" + year;
};

export const formatDateReverse = ({ value }:any) => {
  if (!value) return "---";
  const date = new Date(value);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return year + "-" + month + "-" + day;
};

export const formatDateComplete = ({ value }:any) => {
  if (!value) return "---";
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const date = new Date(value);
  const dia = date.getDate();
  const mes = date.getMonth();
  const yyy = date.getFullYear();
  const fecha_formateada = dia + " de " + meses[mes] + " de " + yyy;

  return fecha_formateada;
};

export const formatHour = ({ value }:any) => {
  if (!value) return "---";
  const date = new Date(value);
  const hour = date.getUTCHours().toString().padStart(2, "0");
  const min = date.getUTCMinutes().toString().padStart(2, "0");
  let temp = "am";
  if (hour >= '12') {
    temp = "pm";
  }

  return `${hour}:${min} ${temp}`;
};

export const formatHourMinSec = ({ value }:any) => {
  if (!value) return "---";
  const date = new Date(value);
  const horaCompleta = date.toLocaleTimeString();

  return horaCompleta;
};

export const formatCurrency = ({
  value,
  no_white_space = false,
  parseInt = false,
  parseFloat = false,
  toFixed = false,
}:any) => {
  const dollar_sign = no_white_space ? "$" : "$ ";
  let value_formated = parseInt
    ? Number.parseInt(value, 10)
    : parseFloat && toFixed
    ? Number.parseFloat(value).toFixed(4)
    : parseFloat
    ? Number.parseFloat(value)
    : value;

  return value
    ? dollar_sign + new Intl.NumberFormat().format(value_formated)
    : "";
};

export const truncateNumber = ({ value, positions = 0 }:any) => {
  let s = value.toString();

  // let l = s.length
  let decimalLength = s.indexOf(".") + 1;
  let numStr = s.substr(0, decimalLength + positions);

  return Number(numStr);
};

export const formatCurrencyVariable = ({
  value = 0,
  decimals = 4,
  no_white_space = false,
}) => {
  const USD = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
  });
  if (no_white_space) return USD;

  return USD.replace("$", "$ ");
};

export const formatCurrencyVariableType = ({
  value = 0,
  decimals = 4,
  no_white_space = false,
  type = "",
}) => {
  let USD = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
  });
  if (type === "Pesos") type = "MXN";
  if (type === "Dolares") type = "USD";
  USD = USD + " " + type;
  if (no_white_space) return USD;

  return USD.replace("$", "$ ");
};
