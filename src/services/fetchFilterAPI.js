import fetchApi from './fetchApi';

const ONZE = 11;

const fetchFilterAPI = async (URL_CATEGORY, currKey) => {
  const request = await fetchApi(URL_CATEGORY);
  return request[currKey]?.filter((e, i) => i <= ONZE);
};

export default fetchFilterAPI;
