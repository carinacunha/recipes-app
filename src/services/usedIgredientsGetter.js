const setMyUsedIgredients = (type, id) => {
  const inLocalProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inLocalProgress) {
    const inType = inLocalProgress[type];
    if (inType) {
      const inId = inType[id];
      if (inId) {
        return inId;
      }
    }
  }
};

export default setMyUsedIgredients;
