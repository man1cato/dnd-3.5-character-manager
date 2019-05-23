import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import _ from 'lodash'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'

export default async () => {
    let offset
    let spells = []
    do {
        const res = await axios.get(`${baseUrl}/Spells?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '')) 
        offset = res.data.offset
        const spellGroup = res.data.records.map((spell) =>  ({
            id: spell.id,
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
        }))
        
        spells = spells.concat(spellGroup)
    } while (!!offset)

    return _.orderBy(spells, ['name'], ['asc'])
};