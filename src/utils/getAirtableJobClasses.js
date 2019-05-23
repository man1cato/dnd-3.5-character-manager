import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import _ from 'lodash'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'

export default async () => {
	try {
		let offset
		let jobClasses = []
	
		do {
			const res = await axios.get(`${baseUrl}/Classes?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') )
			offset = res.data.offset
			const jobClassGroup = res.data.records.map((jobClass) =>  ({
				id: jobClass.id,
				name: jobClass.fields.Name,
				hitDie: jobClass.fields['Hit Die'],
				proficiencies: jobClass.fields['Proficiencies'] ? jobClass.fields['Proficiencies'].join(', ') : 'None',
				skills: jobClass.fields.Skills || []
			}))
			
			jobClasses = jobClasses.concat(jobClassGroup)
		} while (!!offset)
		
		return _.orderBy(jobClasses, ['name'], ['asc'])
	} catch (e) {
		console.error(e)
	}
}