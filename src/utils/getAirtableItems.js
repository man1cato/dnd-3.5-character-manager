import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import _ from 'lodash'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'

export default async () => {
	try {
		let offset;
		let items = [];
		do {
			const res = await axios.get(`${baseUrl}/Items?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || ''))
			offset = res.data.offset
			const itemGroup = res.data.records.map((item) =>  ({
				id: item.id,
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
			}))
			
			items = items.concat(itemGroup)
		} while (!!offset)
		
		return _.orderBy(items, ['name'], ['asc'])
	} catch (e) {
		console.error(e)
	}
}