const getTodayDate = ({ addYear = 0, addMonth = 0, addDate = 0 } = {}) => {
    const d = new Date();
    return (d.getFullYear() + addYear) + '-' + ((d.getMonth() + 1 + addMonth) < 10 ? '0' + (d.getMonth() + 1 + addMonth) : (d.getMonth() + 1 + addMonth)) + '-' + ((d.getDate() + addDate) < 10 ? '0' + (d.getDate() + addDate) : (d.getDate() + addDate));
}

const getDateDayDiff = ({ referenceDate, dateToCompare }) => {
    return ((((referenceDate - dateToCompare) / 1000) / 60) / 60) / 24
}
export {
    getTodayDate,
    getDateDayDiff
}