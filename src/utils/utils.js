import _ from 'lodash';


const convertTextToArray = (string) => _.compact(string.split(/\n/));

module.exports = {
    convertTextToArray
}