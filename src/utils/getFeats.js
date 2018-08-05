import axios from 'axios';
import compareByName from './compareByName';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

export default async () => {
    let offset;
    let feats = [];

    do {
        const featsResponse = await axios.get(`${baseUrl}/Feats?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') );
        offset = featsResponse.data.offset;
        const featGroup = featsResponse.data.records.map((feat) =>  ({
            id: feat.id,
            name: feat.fields.Name,
            type: feat.fields.Type.join(", "),
            description: feat.fields.Description
        }));
        
        feats = feats.concat(featGroup);
    } while (!!offset);
    
    return feats.sort(compareByName);
};