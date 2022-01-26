import PropTypes from "prop-types";

export const getImages = (queryApi, requestPage) => {
  const baseURL = "https://pixabay.com/api/";
  const IMAGES_API_KEY = "24390496-f177996fbfc0d62e3e8be5e3c";
  const url = `${baseURL}?q=${queryApi}&page=${requestPage}&key=${IMAGES_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw Promise.reject(new Error(`Nothing found for ${queryApi}`));
  });
};

getImages.propTypes = {
  queryApi: PropTypes.string,
  requestPage: PropTypes.number,
};
