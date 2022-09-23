const fetchApi = async (url) => {
  const respose = await fetch(url);
  const data = await respose.json();

  return data;
};

export default fetchApi;
