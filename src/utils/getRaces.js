import axios from 'axios';
import _ from 'lodash';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

export default async () => {
    let offset;
    let races = [];

    do {
        const res = await axios.get(`${baseUrl}/Races?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '') );
        offset = res.data.offset;
        const raceGroup = res.data.records.map((race) =>  ({
            id: race.id,
            name: race.fields.Name,
            size: race.fields.Size,
            speed: race.fields['Speed (ft/rnd)'],
            racialBonuses: race.fields['Racial Bonuses'],
            defaultLanguages: race.fields['Languages (Default)'] && race.fields['Languages (Default)'].join(', '),
            bonusLanguages: race.fields['Languages (Bonus)'] && race.fields['Languages (Bonus)'].join(', '),
            abilityMods: {
                str: race.fields['STR Mod'],
                dex: race.fields['DEX Mod'],
                con: race.fields['CON Mod'],
                int: race.fields['INT Mod'],
                wis: race.fields['WIS Mod'],
                cha: race.fields['CHA Mod']
            },
            specialAbilities: race.fields['Special Abilities']
        }));
        
        races = races.concat(raceGroup);
    } while (!!offset);
    
    return _.orderBy(races,['name'],['asc']);
};