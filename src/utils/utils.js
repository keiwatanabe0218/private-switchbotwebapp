// 8桁の日付YYYYMMDDをDate型に変換
const strToDate = (date) => {
    if (date.length === 8) {
      const year = date.substr(0, 4);
      const month = date.substr(4, 2) - 1;
      const day = date.substr(6, 2);
      return new Date(year, month, day);
    } else {
      return new Date("");
    }
  };

export { strToDate };