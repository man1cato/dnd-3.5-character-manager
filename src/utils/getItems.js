import axios from 'axios';
import compareByName from './compareByName';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

export default async () => {
    let offset;
    let items = [];
    do {
        const itemsResponse = await axios.get(`${baseUrl}/Items?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '')) ;
        offset = itemsResponse.data.offset;
        const itemGroup = itemsResponse.data.records.map((item) =>  ({
            id: item.id,
            name: item.fields.Name,
            cost: item.fields.Cost,
            weight: item.fields["Weight (lbs)"],
            category: item.fields.Category,
            weaponType: item.fields["Weapon Type"],
            encumbrance: item.fields.Encumbrance,
            damageType: item.fields["Damage Type"] && item.fields["Damage Type"].join(" / "),
            damageS: item.fields["Damage (S)"],
            damageM: item.fields["Damage (M)"],
            critical: item.fields.Critical,
            range: item.fields.Range,
            armorBonus: item.fields["Armor Bonus"],
            maxDexBonus: item.fields["Max DEX Bonus"]
        }));
        
        items = items.concat(itemGroup);
    } while (!!offset);
    
    return items.sort(compareByName);
};