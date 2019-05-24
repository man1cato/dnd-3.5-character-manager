import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import _ from 'lodash'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'


const getLevels = async (jobClassId) => {
	try {
		const levelRes = await axios.get(`${baseUrl}/Levels?filterByFormula={Class ID}="${jobClassId}"&api_key=${apiKey}`)
		
		const levelRecords = levelRes.data.records
		let levels = {}
		for (let i = 0; i < levelRecords.length; i++) {
			levels[levelRecords[i].fields.Level] = {
				saves: {
					fortitude: levelRecords[i].fields['Fortitude'],
					reflex: levelRecords[i].fields['Reflex'],
					will: levelRecords[i].fields['Will']
				},
				bab: _.compact([ levelRecords[i].fields['BAB 1'], levelRecords[i].fields['BAB 2'], levelRecords[i].fields['BAB 3'], levelRecords[i].fields['BAB 4'] ]),
				xp: levelRecords[i].fields['XP Required'],
				specialAbilities: !!levelRecords[i].fields['Special Abilities'] ? levelRecords[i].fields['Special Abilities'] : null,
				spellsPerDay:  _.compact([ 
					levelRecords[i].fields['SPD 0'], levelRecords[i].fields['SPD 1'], levelRecords[i].fields['SPD 2'], levelRecords[i].fields['SPD 3'], levelRecords[i].fields['SPD 4'], 
					levelRecords[i].fields['SPD 5'], levelRecords[i].fields['SPD 6'], levelRecords[i].fields['SPD 7'], levelRecords[i].fields['SPD 8'], levelRecords[i].fields['SPD 9'] 
				])
			}
		}
		return levels
	} catch (e) {
		console.error(e)
	}
}

export default async () => {
	try {
		let offset
		let jobClasses = []
	
		do {
			const classRes = await axios.get(`${baseUrl}/Classes?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') )
			offset = classRes.data.offset

			const jobClassGroup = classRes.data.records.map((jobClass) => ({
				id: jobClass.id,
				name: jobClass.fields.Name,
				hitDie: jobClass.fields['Hit Die'],
				proficiencies: jobClass.fields['Proficiencies'] ? jobClass.fields['Proficiencies'].join(', ') : 'None',
				skills: jobClass.fields.Skills || []
			}))

			for (let i = 0; i < jobClassGroup.length; i++) {
				jobClassGroup[i].levels = await getLevels(jobClassGroup[i].id)
			}
			
			jobClasses = jobClasses.concat(jobClassGroup)
		} while (!!offset)
		
		return _.orderBy(jobClasses, ['name'], ['asc'])
	} catch (e) {
		console.error(e)
	}
}