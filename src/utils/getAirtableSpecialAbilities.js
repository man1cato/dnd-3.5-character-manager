import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import _ from 'lodash'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'

export default async () => {
    let offset
    let specialAbilities = []
    do {
        const res = await axios.get(`${baseUrl}/Special Abilities?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || ''))
        offset = res.data.offset
        const specialAbilityGroup = res.data.records.map((specialAbility) =>  ({
            id: specialAbility.id,
            name: specialAbility.fields.Name,
            type: specialAbility.fields.Type ? specialAbility.fields.Type.join(", ") : null,
            description: specialAbility.fields.Description
        }))
        
        specialAbilities = specialAbilities.concat(specialAbilityGroup)
    } while (!!offset)
    
    return _.orderBy(specialAbilities, ['name'], ['asc'])
};

export const getSpecialAbilityIdsFromLevels = async (jobClassId, level) => {
    const filterFormula = `AND({Class ID}="${jobClassId}", {Level}=${level})`
    const res = await axios.get(`${baseUrl}/Levels?filterByFormula=${filterFormula}&api_key=${apiKey}`)
    const specialAbilityIds = res.data.records[0].fields["Special Abilities"] ? res.data.records[0].fields["Special Abilities"] : null
    return specialAbilityIds
};