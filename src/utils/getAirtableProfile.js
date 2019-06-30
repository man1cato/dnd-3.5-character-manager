import axios from 'axios'
import _ from 'lodash'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'

class Ability {
	constructor(score) {
		this.score = score		
		this.tempScore = 0
	}
}

const mapSkills = (skillset) => _.sortBy(skillset.map((skill) => ({
	id: skill.fields["Skill ID"][0],
	name: skill.fields.Name,
	ranks: skill.fields["Total Ranks"] || 0
})), ['name'])


export default async (firebaseUID) => {
	const characterFilter = `{Firebase UID}="${firebaseUID}"`
	const characterResponse = await axios.get(`${baseUrl}/Characters?api_key=${apiKey}&filterByFormula=${characterFilter}`)
	const characterId = characterResponse.data.records[0].id
	const fields = characterResponse.data.records[0].fields
	const ownerFilter = `{Owner ID}="${characterId}"`

	const characterSkillsetResponse = await axios.get(`${baseUrl}/Skillsets?api_key=${apiKey}&filterByFormula=${ownerFilter}`)
	const characterSkillSet = mapSkills(characterSkillsetResponse.data.records)

	const level = fields.Level[0]
	const xp = fields.XP
	const abilities = {
		str: new Ability(fields.STR),
		dex: new Ability(fields.DEX),
		con: new Ability(fields.CON),
		int: new Ability(fields.INT),
		wis: new Ability(fields.WIS),
		cha: new Ability(fields.CHA)
	}
	
	const equipmentResponse = await axios.get(`${baseUrl}/Equipment?api_key=${apiKey}&filterByFormula=${ownerFilter}`)
	const equipment = _.sortBy(equipmentResponse.data.records.map((item) => ({
		id: item.fields["Item ID"][0],
		name: item.fields.Name,
		category: item.fields.Category[0],
		qty: item.fields.Qty
	})), ['name'])

	const spellbookResponse = await axios.get(`${baseUrl}/Spellbooks?api_key=${apiKey}&filterByFormula=${ownerFilter}`)
	const spells = _.sortBy(spellbookResponse.data.records.map((spell) => {
		const prepared = spell.fields.Prepared || 0;
		const used = spell.fields.Used || 0;
		return {
			id: spell.fields["Spell ID"][0],
			name: spell.fields.Name,
			level: Number(spell.fields.Level),
			mastered: spell.fields["Mastered?"] || false,
			prepared,
			used,
			remaining: prepared - used
		}
	}), ['name'])
	
	const spellbook = _.map(Array(level + 1), (val, level) => spells.filter((spell) => spell.level === level)) 

	const companionResponse = await axios.get(`${baseUrl}/Companions?api_key=${apiKey}&filterByFormula=${ownerFilter}`)
	const companionFields = companionResponse.data.records[0].fields;
	const companionSkillsetResponse = await axios.get(`${baseUrl}/Skillsets?api_key=${apiKey}&filterByFormula={Companion ID}="${companionFields['Companion ID']}"`)
	const companionSkillSet = mapSkills(companionSkillsetResponse.data.records)
	const companionAbilities = {
		str: new Ability(companionFields.STR[0]),
		dex: new Ability(companionFields.DEX[0]),
		con: new Ability(companionFields.CON[0]),
		int: new Ability(companionFields.INT),
		wis: new Ability(companionFields.WIS[0]),
		cha: new Ability(companionFields.CHA[0])
	}
	const companion = {
		name: companionFields.Name,
		type: companionFields['Animal Type'][0],
		hp: { 
			base: companionFields.HP
		},
		abilities: companionAbilities,
		skillSet: companionSkillSet,
		speed: {
			ground: companionFields['Speed (ground)'][0],
			flight: companionFields['Speed (flight)'][0],
		},
		initiative: {
			base: companionFields.Initiative[0]
		},
		ac: {
			base: companionFields['AC Base'][0],
			touch: companionFields['AC Touch'][0],
			flat: companionFields['AC Flat'][0]
		},
		attack: companionFields.Attack[0],
		feats: companionFields.Feats,
		specialAbilities: companionFields['Special Abilities'],
		benefit: companionFields['Owner Benefit']
	}
  
	return {
		id: characterId,
		fields: {
			iconUrl: fields["Icon URL"][0],
			name: fields.Name,
			age: fields.Age,
			height: fields.Height,
			weight: fields["Weight (lbs)"],
			gender: fields.Gender,
			race: fields["Race ID"][0],
			jobClass: fields["Class ID"][0],
			deity: fields.Deity || "None",
			alignment: fields.Alignment,
			school: fields["School/Discipline"] || null,
			prohibitedSchools: fields["Prohibited Schools"] || null,
			languages: fields.Languages,
			level,
			xp,
			hp: { 
				base: fields.HP 
			},
			feats: fields.Feats,
			specialAbilities: fields["Special Abilities"],
			abilities,
			skillSet: characterSkillSet,
			ac: {
				base: fields["AC - Base"],
				flat: fields["AC - Flat"],
				touch: fields["AC - Touch"]
			},
			money: {
				pp: equipment.find((item) => item.name === "Platinum Piece") ? equipment.find((item) => item.name === "Platinum Piece").qty : 0,
				gp: equipment.find((item) => item.name === "Gold Piece") ? equipment.find((item) => item.name === "Gold Piece").qty : 0,
				sp: equipment.find((item) => item.name === "Silver Piece") ? equipment.find((item) => item.name === "Silver Piece").qty : 0,
				cp: equipment.find((item) => item.name === "Copper Piece") ? equipment.find((item) => item.name === "Copper Piece").qty : 0
			},
			equipment: equipment.filter((item) => item.category !== "Money").map((item) => ({
				id: item.id,
				qty: item.qty
			})),
			equipped: {
				armor: null,
				shield: equipment.filter((item) => item.category === "Shield")[0].id,
				weapons: equipment.filter((item) => item.category === "Weapon").map((weapon) => weapon.id)
			},
			spellbook,
			companion
		}
	}
}
