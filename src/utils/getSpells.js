import axios from 'axios';
import compareByName from './compareByName';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

const spellObject = (spell) => ({
    id: spell.id,
    name: spell.fields.Name,
    description: spell.fields.Description,
    school: spell.fields.School,
    components: spell.fields.Components.toString(),
    castingTime: spell.fields["Casting Time"],
    range: spell.fields.Range,
    effectArea: spell.fields["Target, Effect, Area"],
    duration: spell.fields.Duration,
    savingThrow: spell.fields["Saving Throw"],
    spellResistance: spell.fields["Spell Resistance"]
});


export default async () => {
    let spellsResponse = await axios.get(`${baseUrl}/Spells?api_key=${apiKey}`);
    let spells = spellsResponse.data.records.map((spell) =>  spellObject(spell) );
    let offset = spellsResponse.data.offset;
    let spellGroup;

    while (!!offset) {
        spellsResponse = await axios.get(`${baseUrl}/Spells?api_key=${apiKey}&offset=${offset}`);
        offset = spellsResponse.data.offset;
        spellGroup = spellsResponse.data.records.map((spell) =>  spellObject(spell) );
        
        spells = spells.concat(spellGroup);
    }
    
    return spells.sort(compareByName);
};