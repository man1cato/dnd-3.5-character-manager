import _ from 'lodash'
import axios from 'axios'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'


export const convertTextToArray = (string) => _.compact(string.split(/\n/))

export const findItemById = (storeItemArray, itemId) => storeItemArray.find((item) => item.id === itemId)

export const getSpecialAbilityIdsFromLevels = async (jobClassId, level) => {
    const filterFormula = `AND({Class ID}="${jobClassId}", {Level}=${level})`
    const res = await axios.get(`${baseUrl}/Levels?filterByFormula=${filterFormula}&api_key=${apiKey}`)
    const specialAbilityIds = res.data.records[0].fields["Special Abilities"] ? res.data.records[0].fields["Special Abilities"] : null
    return specialAbilityIds
}