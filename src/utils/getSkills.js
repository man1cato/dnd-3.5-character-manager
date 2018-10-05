import axios from 'axios';
import _ from 'lodash';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

export default async () => {
    let offset;
    let skills = [];

    do {
        const res = await axios.get(`${baseUrl}/Skills?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') );
        offset = res.data.offset;
        const skillGroup = res.data.records.map((skill) =>  ({
            id: skill.id,
            name: skill.fields.Name,
            keyAbility: skill.fields["Key Ability"],
            description: skill.fields.Description,
            notes: skill.fields.Notes
        }));
        
        skills = skills.concat(skillGroup);
    } while (!!offset);
    
    return _.orderBy(skills, ['name'], ['asc']);
};