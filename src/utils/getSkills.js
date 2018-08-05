import axios from 'axios';
import compareByName from './compareByName';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

export default async () => {
    let offset;
    let skills = [];

    do {
        const skillsResponse = await axios.get(`${baseUrl}/Skills?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') );
        offset = skillsResponse.data.offset;
        const skillGroup = skillsResponse.data.records.map((skill) =>  ({
            id: skill.id,
            name: skill.fields.Name,
            keyAbility: skill.fields["Key Ability"],
            description: skill.fields.Description,
            notes: skill.fields.Notes
        }));
        
        skills = skills.concat(skillGroup);
    } while (!!offset);
    
    return skills.sort(compareByName);
};