import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import _ from 'lodash'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'

export default async () => {
	try {
		let offset
		let feats = []

		do {
			const res = await axios.get(`${baseUrl}/Feats?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') )
			offset = res.data.offset
			const featGroup = res.data.records.map((feat) =>  ({
				id: feat.id,
				name: feat.fields.Name,
				type: feat.fields.Type.join(", ") || null,
				description: feat.fields.Description || null
			}));
			
			feats = feats.concat(featGroup)
		} while (!!offset)
		
		return _.orderBy(feats, ['name'], ['asc'])
	} catch (e) {
		console.error(e)
	}
}