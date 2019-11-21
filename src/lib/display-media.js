// todo vísa í rétta hluti með import
import { el } from './helpers';
import getRandomImage from './nasa-api';
import { load, save } from './storage';


// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let video; // myndband á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.
let counter = 0;

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  const promise = getRandomImage();
  promise
    .then((data) => {
      if (image) {
        image[2].parentNode.removeChild(image[2]);
        image[3].parentNode.removeChild(image[3]);
        if (image[0] === 'video') {
          video.classList.remove('apod__video--active');
        }
      }
      image = [data.media_type, data.url,
        document.createTextNode(data.explanation),
        document.createTextNode(data.title)];
      text.appendChild(image[2]);
      title.appendChild(image[3]);
      if (image[0] === 'video') {
        img.removeAttribute('src');
        img.removeAttribute('alt');
        video.classList.add('apod__video--active');
        video.setAttribute('src', image[1]);
      } else {
        video.removeAttribute('src');
        img.setAttribute('src', data.url);
        img.setAttribute('alt', '');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image[0], image[1], image[2].nodeValue, image[3].nodeValue);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  apod.getElementsByClassName('button').forEach((button) => {
    if (button.id === 'new-image-button') {
      button.addEventListener('click', getNewImage);
    } else if (button.id === 'save-image-button') {
      button.addEventListener('click', saveCurrentImage);
    }
  });
  title = apod.getElementsByClassName('apod__title')[0]; /* eslint-disable-line */
  text = apod.getElementsByClassName('apod__text')[0]; /* eslint-disable-line */
  img = apod.getElementsByClassName('apod__image')[0]; /* eslint-disable-line */
  video = apod.getElementsByClassName('apod__video')[0]; /* eslint-disable-line */
  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const favorites = document.querySelector('.favorites');
  const images = load();
  const parsedImages = JSON.parse(images);
  parsedImages.forEach((data) => {
    const header = el('h2');
    header.appendChild(document.createTextNode(data.title));
    header.classList.add('favorites__title');
    let div;
    if (data.type === 'image') {
      const picture = el('img');
      picture.setAttribute('src', data.mediaUrl);
      picture.setAttribute('alt', '');
      picture.classList.add('favorites__image');
      div = el('div', header, picture);
    } else {
      const movie = el('iframe');
      movie.setAttribute('src', data.mediaUrl);
      movie.setAttribute('xml', 'lang');
      movie.setAttribute('frameborder', 0);
      movie.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      movie.setAttribute('allowfullscreen', '');
      movie.classList.add('favorites__video');
      div = el('div', header, movie);
    }
    div.classList.add('favorites__favorite');
    favorites.appendChild(div);
  });
}
