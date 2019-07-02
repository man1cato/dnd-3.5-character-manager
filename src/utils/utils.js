import _ from 'lodash'


export const convertTextToArray = (string) => _.compact(string.split(/\n/))

export const convertInputValue = (value) => {
	value = Number(value)
	if (value === '' || isNaN(value)) { return 0 }
	if (value === 0) { return '' }
	return value
}

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

export const calcSizeMod = (size) => ({
	Colossal: -8,
	Gargantuan: -4,
	Huge: -2,
	Large: -1,
	Medium: 0,
	Small: 1,
	Tiny: 2,
	Diminutive: 4,
	Fine: 8
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

export const calcBaseMeleeBonus = (baseAttackBonus, strScore, size) => baseAttackBonus + calcAbilityMod(strScore) + calcSizeMod(size)
export const calcBaseRangedBonus = (baseAttackBonus, dexScore, size) => baseAttackBonus + calcAbilityMod(dexScore) + calcSizeMod(size)
export const calcBaseGrappleBonus = (baseAttackBonus, strScore, size) => {
	const specialSizeMod = {
		Colossal: 16,
		Gargantuan: 12,
		Huge: 8,
		Large: 4,
		Medium: 0,
		Small: -4,
		Tiny: -8,
		Diminutive: -12,
		Fine: -16
	}[size]
	return baseAttackBonus + calcAbilityMod(strScore) + specialSizeMod
} 

export const calcTotalMoney = ({ pp, gp, sp, cp }) => Number((pp * 10 + gp + sp / 10 + cp / 100).toFixed(2))
