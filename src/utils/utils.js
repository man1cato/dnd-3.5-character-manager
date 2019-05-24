import _ from 'lodash'
import axios from 'axios'

const apiKey = process.env.AIRTABLE_API_KEY
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL'


export const convertTextToArray = (string) => _.compact(string.split(/\n/))

export const findItemById = (storeItemArray, itemId) => storeItemArray.find((item) => item.id === itemId)
