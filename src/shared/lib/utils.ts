export const getFormattedDate = (inputDate: string) => {
  const dateParts = inputDate.split("-");

  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  // Create a new Date object using UTC timezone
  const date = new Date(Date.UTC(year, month, day));

  // Format the date in UTC
  const formattedDate = date.toLocaleDateString("ru-RU", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};




export function slugify(text:string) {
  return text
    .toLowerCase() // Приводим к нижнему регистру
    .replace(/[\s:.,?!]+/g, '-') // Заменяем пробелы, двоеточия, запятые, точки, вопросительные и восклицательные знаки на дефисы
    .replace(/[^\w-]+/g, '')     // Удаляем все символы, кроме букв, цифр и дефиса
    .replace(/--+/g, '-')        // Заменяем несколько дефисов подряд на один
    .replace(/^-+/, '')         // Удаляем дефисы в начале строки
    .replace(/-+$/, '');         // Удаляем дефисы в конце строки
}