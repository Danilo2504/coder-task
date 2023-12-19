const viewsConverter = (totalViews) => {
  const thousand = 1000;
  const million = 1000000;

  if (totalViews >= million) {
    const stringViews = (totalViews / million).toString().split(".");

    if (stringViews.length === 1) {
      return stringViews[0] + " M";
    } else {
      return stringViews[0] + "." + stringViews[1].substring(0, 1) + " M";
    }
  }

  if (totalViews >= thousand) {
    const stringViews = (totalViews / thousand).toString().split(".");
    return stringViews[0] + "k";
  }

  if (totalViews < thousand) {
    return totalViews.toString();
  }
};

const getIntervalFromDate = (date) => {
  return moment(date).locale("es").fromNow();
};
