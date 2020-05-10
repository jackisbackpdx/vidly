function getDate() {
    let date = new Date();
    let currentDate = date.getDate();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let fullDate = `${currentMonth}/${currentDate}/${currentYear}`;
    let nextWeek = `${currentMonth}/${currentDate + 7}/${currentYear}`;
    return {
        fullDate: fullDate,
        nextWeek: nextWeek,
    };
}

exports.getDate = getDate;