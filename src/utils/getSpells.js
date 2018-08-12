import axios from 'axios';
import compareByName from './compareByName';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

export default async () => {
    let offset;
    let spells = [];
    do {
        const res = await axios.get(`${baseUrl}/Spells?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '')) ;
        offset = res.data.offset;
        const spellGroup = res.data.records.map((spell) =>  ({
            id: spell.id,
            name: spell.fields.Name,
            description: spell.fields.Description,
            school: spell.fields.School,
            components: spell.fields.Components.join(", "),
            castingTime: spell.fields["Casting Time"],
            range: spell.fields.Range,
            effectArea: spell.fields["Target, Effect, Area"],
            duration: spell.fields.Duration,
            savingThrow: spell.fields["Saving Throw"],
            spellResistance: spell.fields["Spell Resistance"]
        }));
        
        spells = spells.concat(spellGroup);
    } while (!!offset);
    
    return spells.sort(compareByName);
};