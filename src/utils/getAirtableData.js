import axios from 'axios'
import _ from 'lodash'
import { convertTextToArray } from './utils' 
import dotenv from 'dotenv'
dotenv.config({ path: './config/dev.env' })

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'


export const getFeats = async () => {
	try {
		let offset
		let feats = {}

		do {
			const res = await axios.get(`${baseUrl}/Feats?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') )
			offset = res.data.offset
			res.data.records.forEach((feat) => {
				feats[feat.id] = {
					name: feat.fields.Name,
					types: feat.fields.Types || null,
					description: feat.fields.Description || null,
					prerequisites: {
						level: feat.fields['Prereq. Level'] || null,
						class: feat.fields['Prereq. Class'] || null,
						feats: feat.fields['Prereq. Feats'] || null
					} || null
				}
			})			
		} while (!!offset)
		
		return feats
	} catch (e) {
		console.error(e)
	}
}


export const getItems = async () => {
	try {
		let offset
		let items = {}
		do {
			const res = await axios.get(`${baseUrl}/Items?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || ''))
			offset = res.data.offset
			res.data.records.forEach((item) => {
				items[item.id] = {
					name: item.fields.Name,
					value: item.fields["Value (gp)"] || '',
					weight: item.fields["Weight (lbs)"] || '',
					category: item.fields.Category || null,
					weaponType: item.fields["Weapon Type"] || null,
					encumbrance: item.fields.Encumbrance || null,
					damageType: item.fields["Damage Type"] ? item.fields["Damage Type"].join(" / ") : [],
					damageS: item.fields["Damage (S)"] || null,
					damageM: item.fields["Damage (M)"] || null,
					critical: item.fields.Critical || null,
					range: item.fields.Range || null,
					armorBonus: item.fields["Armor Bonus"] || null,
					maxDexBonus: item.fields["Max DEX Bonus"] || null
				}
			})
		} while (!!offset)
		
		return items
	} catch (e) {
		console.error(e)
	}
}


const getLevels = async (jobClassId) => {
	try {
		const levelRes = await axios.get(`${baseUrl}/Levels?filterByFormula={Class ID}="${jobClassId}"&api_key=${apiKey}`)
		
		const levelRecords = levelRes.data.records
		let levels = {}
		for (let i = 0; i < levelRecords.length; i++) {
			const levelRecord = levelRecords[i].fields 
			levels[levelRecord.Level] = {
				saves: {
					fortitude: levelRecord['Fortitude'],
					reflex: levelRecord['Reflex'],
					will: levelRecord['Will']
				},
				baseAttackBonuses: _.compact([ levelRecord['BAB 1'], levelRecord['BAB 2'], levelRecord['BAB 3'], levelRecord['BAB 4'] ]),
				xp: levelRecord['XP Required'],
				specialAbilities: !!levelRecord['Special Abilities'] ? levelRecord['Special Abilities'] : null,
				spellsPerDay:  _.compact([ 
					levelRecord['SPD 0'], levelRecord['SPD 1'], levelRecord['SPD 2'], levelRecord['SPD 3'], levelRecord['SPD 4'], 
					levelRecord['SPD 5'], levelRecord['SPD 6'], levelRecord['SPD 7'], levelRecord['SPD 8'], levelRecord['SPD 9'] 
				])
			}
		}
		return levels
	} catch (e) {
		console.error(e)
	}
}

export const getJobClasses = async () => {
	try {
		let offset
		let jobClasses = {}
	
		do {
			const classRes = await axios.get(`${baseUrl}/Classes?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') )
			offset = classRes.data.offset

			const jobClassGroup = classRes.data.records
			
			for (let i = 0; i < jobClassGroup.length; i++) {
				const jobClass = jobClassGroup[i] 
				jobClasses[jobClass.id] = {
					name: jobClass.fields.Name,
					hitDie: jobClass.fields['Hit Die'],
					proficiencies: jobClass.fields['Proficiencies'] || [],
					skills: jobClass.fields.Skills || [],
					levels: await getLevels(jobClass.id)
				}
			}
		} while (!!offset)
		
		return jobClasses
	} catch (e) {
		console.error(e)
	}
}


export const getRaces = async () => {
	try {
		let offset
		let races = {}
		do {
			const res = await axios.get(`${baseUrl}/Races?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') )
			offset = res.data.offset
			res.data.records.forEach((race) =>  {
				races[race.id] = {
					name: race.fields.Name,
					size: race.fields.Size,
					speed: race.fields['Speed (ft/rnd)'],
					racialBonuses: race.fields['Racial Bonuses'] ? convertTextToArray(race.fields['Racial Bonuses']) : null,
					defaultLanguages: race.fields['Languages (Default)'],
					bonusLanguages: race.fields['Languages (Bonus)'],
					abilityMods: {
						str: race.fields['STR Mod'],
						dex: race.fields['DEX Mod'],
						con: race.fields['CON Mod'],
						int: race.fields['INT Mod'],
						wis: race.fields['WIS Mod'],
						cha: race.fields['CHA Mod']
					},
					specialAbilities: race.fields['Special Abilities'] || [],
					favoredClass:  race.fields['Favored Class'] ? race.fields['Favored Class'][0] : null,
					iconUrl: race.fields['Icon URL']
				}
			})
			
		} while (!!offset)
		
		return races
	} catch (e) {
		console.error(e)
	}
}


export const getSkills = async () => {
   let offset
   let skills = {}
   do {
		const res = await axios.get(`${baseUrl}/Skills?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') )
		offset = res.data.offset
		res.data.records.forEach((skill) => {
			skills[skill.id] = {
				name: skill.fields.Name,
				keyAbility: skill.fields["Key Ability"] || null,
				description: skill.fields.Description || "",
				notes: skill.fields.Notes || ""
			}
		})
   } while (!!offset)
   
   return skills
}


export const getSpecialAbilities = async () => {
   let offset
   let specialAbilities = {}
   do {
		const res = await axios.get(`${baseUrl}/Special Abilities?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || ''))
		offset = res.data.offset
		res.data.records.forEach((specialAbility) => {
			specialAbilities[specialAbility.id] = {
				name: specialAbility.fields.Name,
				type: specialAbility.fields.Type ? specialAbility.fields.Type.join(", ") : null,
				description: specialAbility.fields.Description				
			}
		})
   } while (!!offset)
   
   return specialAbilities
}


export const getSpells =  async () => {
   let offset
   let spells = {}
   do {
		const res = await axios.get(`${baseUrl}/Spells?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '')) 
		offset = res.data.offset
		res.data.records.forEach((spell) => {
			spells[spell.id] = {
				name: spell.fields.Name,
				description: spell.fields.Description || "",
				school: spell.fields.School || null,
				components: spell.fields.Components.join(", ") || null,
				castingTime: spell.fields["Casting Time"] || null,
				range: spell.fields.Range || null,
				effectArea: spell.fields["Target, Effect, Area"] || null,
				duration: spell.fields.Duration || null,
				savingThrow: spell.fields["Saving Throw"] || null,
				spellResistance: spell.fields["Spell Resistance"] || null
			}
		})
   } while (!!offset)

   return spells
}