import axios from 'axios';
const apiKey = '19817444-e2944238b0133b6bab479e2af';
const fetchImg = ({ searchQuery = '', currentPage = 1 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.images);
};

export default { fetchImg };
