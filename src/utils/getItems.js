import axios from 'axios';
import _ from 'lodash';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

export default async () => {
    let offset;
    let items = [];
    do {
        const res = await axios.get(`${baseUrl}/Items?api_key=${apiKey}` + (!!offset && `&offset=${offset}` || '')) ;
        offset = res.data.offset;
        const itemGroup = res.data.records.map((item) =>  ({
            id: item.id,
            name: item.fields.Name,
            value: item.fields["Value (gp)"],
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
    
    return _.orderBy(items, ['name'], ['asc']);
};