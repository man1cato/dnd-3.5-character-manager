import _ from 'lodash'


export const convertTextToArray = (string) => _.compact(string.split(/\n/))

export const findItemById = (storeItemArray, itemId) => storeItemArray.find((item) => item.id === itemId)

export const apiObjectToArray = (obj) => _.orderBy(Object.keys(obj).map((id) => ({
	id,
	...obj[id]
})), ['name'], ['asc'])