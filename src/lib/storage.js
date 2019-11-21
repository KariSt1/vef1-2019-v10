/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const array = [];
  if (window.localStorage.getItem(LOCALSTORAGE_KEY)) {
    return window.localStorage.getItem(LOCALSTORAGE_KEY);
  }
  return array;
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  let images = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
  if (!images) {
    images = [];
  }
  const image = { /* eslint-disable-line */
    'type': type, /* eslint-disable-line */
    'mediaUrl': mediaUrl, /* eslint-disable-line */
    'text': text, /* eslint-disable-line */
    'title': title /* eslint-disable-line */
  }; /* eslint-disable-line */
  images.push(image);
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(images));
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
