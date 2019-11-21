
/**
 * Hreinsa börn úr elementi
 *
 * @param {object} element Element sem á að hreinsa börn úr
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Búa til element og aukalega setja börn ef send með
 *
 * @param {string} name Nafn á element
 * @param  {...any} children Börn fyrir element
 */
export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
* Skilar tölu af handahófi á bilinu [min, max]
*/
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Skilar random dagsetningu frá 16. júní 1995 til dagsins í dag á
 * forminu YYYY--MM--DD.
 */
export function randomDate() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const year = randomNumber(1995, currentYear);
  let month;
  if (year === currentYear) {
    month = randomNumber(1, currentMonth);
  } else if (year === 1995) {
    month = randomNumber(6, 12);
  } else {
    month = randomNumber(1, 12);
  }

  let day;
  if (month === currentMonth && year === currentYear) {
    day = randomNumber(1, currentDay);
  } else if (year === 1995 && month === 6) {
    day = randomNumber(16, 30);
  } else if (month === 1 || month === 3 || month === 5 || month === 7
    || month === 8 || month === 10 || month === 12) {
    day = randomNumber(1, 31);
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    day = randomNumber(1, 30);
  } else {
    day = randomNumber(1, 28);
  }
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${year}-${month}-${day}`;
}
