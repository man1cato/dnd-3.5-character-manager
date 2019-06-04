import fs from 'fs'
import getApi from '../utils/getFirebaseData'

export default async () => {
   const api = await getApi()
   
   fs.writeFile('src/tests/fixtures/api.json', JSON.stringify(api), (err) => {
      if (err) throw err
   })

}