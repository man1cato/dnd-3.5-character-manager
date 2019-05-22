import _ from 'lodash';

const convertTextToArray = (string) => _.compact(string.split(/\n/));
const findItemById = (storeItemArray, itemId) => storeItemArray.find((item) => item.id === itemId)

module.exports = {
    convertTextToArray,
    findItemById
}