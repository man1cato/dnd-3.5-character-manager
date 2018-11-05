import _ from 'lodash';

const convertTextToArray = (string) => _.compact(string.split(/\n/));
const dieRoll = (faces) => Math.floor((Math.random() * faces) + 1);


module.exports = {
    convertTextToArray,
    dieRoll
}