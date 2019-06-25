import _ from 'lodash'


export const convertTextToArray = (string) => _.compact(string.split(/\n/))

export const findItemById = (storeItemArray, itemId) => storeItemArray.find((item) => item.id === itemId)

export const apiObjectToArray = (obj) => _.orderBy(_.keys(obj).map((id) => ({
	id,
	...obj[id]
})), ['name'], ['asc'])


export const rollDice = (dieFaces = 6, countDice = 1) => {
	let total = 0
	for (let i = 0; i < countDice; i++) {
		total += Math.floor((Math.random() * dieFaces) + 1)
	}
	return total
}

export const calcAbilityMod = (abilityScore) => Math.floor(abilityScore/2 - 5)

export const calSizeMod = (size) => ({
	Huge: -2,
	Large: -1,
	Medium: 0,
	Small: 1,
	TIny: 2
}[size])

export const calcSkillPoints = (jobClassName, intMod) => {
	if (_.includes(['Cleric', 'Fighter', 'Paladin', 'Sorcerer', 'Wizard'], jobClassName)) {
		return 2 + intMod
	}
	if (_.includes(['Barbarian', 'Druid', 'Monk'], jobClassName)) {
		return 4 + intMod
	}
	if (_.includes(['Bard', 'Ranger'], jobClassName)) {
		return 6 + intMod
	}
	if (jobClassName === 'Rogue') {
		return 8 + intMod
	}
}