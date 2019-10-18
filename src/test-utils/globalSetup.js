import fs from 'fs'
import getApi from '../utils/getApi'

export default async () => {
   const api = await getApi()
   
   fs.writeFile('src/test-utils/fixtures/api.json', JSON.stringify(api), (err) => {
      if (err) throw err
   })
}