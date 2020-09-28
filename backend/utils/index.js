const getFormattedDate = date => date && new Date(date).toISOString();

const prepareDataBeforeResponse = task => {
    const { _id: id, dateEnd, ...restData } = task;
    return {
        id: id.toString(),
        dateEnd: getFormattedDate(dateEnd),
        ...restData
    };
};

const replaceMultipleSpaces = val => typeof val === "string" ? val.replace(/\s\s+/g, ' ').trim() : val;

module.exports = { getFormattedDate, prepareDataBeforeResponse, replaceMultipleSpaces };