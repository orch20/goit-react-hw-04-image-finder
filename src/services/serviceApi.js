const URL = 'https://pixabay.com/api/?';
const APIKEY = '28032736-ad36f6ce87d03da58a29c5b67';

export const imageService = async (searchQuery, page) => {
  return await fetch(
    `${URL}key=${APIKEY}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (!res.ok) {
      return Promise.reject(new Error(`No ${searchQuery} picture`));
    }
    return res.json();
  });
};
