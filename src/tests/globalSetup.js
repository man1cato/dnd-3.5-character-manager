import fs from 'fs'
import { getApi } from '../utils/getFirebaseData'


export default async () => {
   console.log('WRITING')
   api = await getApi()
   
   // const stream = fs.createWriteStream("src/tests/fixtures/api.json")
   fs.writeFile('src/tests/fixtures/api.json', JSON.stringify(api), (err) => {
      if (err) throw err
      console.log('WRITTEN!')
   })

}

// writeApi()