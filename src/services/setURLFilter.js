const setURLFilter = (pathname, URL_FILTER_DRINKS, URL_FILTER_FOODS, name) => {
  let URL_CATEGORY = '';
  // switch (pathname) {
  // case '/drinks': {
  //   URL_CATEGORY = URL_FILTER_DRINKS + name;
  //   console.log('entrei');
  //   break;
  // }
  // default: {
  //   URL_CATEGORY = URL_FILTER_FOODS + name;
  //   return URL_CATEGORY;
  // }
  // }
  if (pathname === '/drinks') {
    URL_CATEGORY = URL_FILTER_DRINKS + name;
  }
  if (pathname === '/meals') {
    URL_CATEGORY = URL_FILTER_FOODS + name;
  }
  return URL_CATEGORY;
};

export default setURLFilter;
