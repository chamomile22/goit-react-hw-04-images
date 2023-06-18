const KEY = '35161843-21529f4993e16b6a6e96a015e';
export const perPage = 12;

export const getImages = (value, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('Woops, something went wrong :('));
  });
};
