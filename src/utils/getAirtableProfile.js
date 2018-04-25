import axios from 'axios';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

export default async (firebaseUID) => {
  const characterFilter = `{Firebase UID}="${firebaseUID}"`;
  const characterResponse = await axios.get(`${baseUrl}/Characters?api_key=${apiKey}&filterByFormula=${characterFilter}`);
  const characterId = characterResponse.data.records[0].id;
  const fields = characterResponse.data.records[0].fields;

  const skillsetFilter = `{Character ID}="${characterId}"`;
  const skillsetResponse = await axios.get(`${baseUrl}/Skillsets?api_key=${apiKey}&filterByFormula=${skillsetFilter}`);
  const skills = skillsetResponse.data.records.map((skill) => skill.fields["Skill (Rank)"]);


  return {
    id: characterId,
    fields:{
      name: fields.Name,
      height: fields.Height,
      weight: fields["Weight (lbs)"],
      gender: fields.Gender,
      size: fields.Size[0],
      race: fields["Race - Text"],
      class: fields.Class,
      deity: fields.Deity,
      alignment: fields.Alignment,
      school: fields["School/Discipline"],
      prohibitedSchools: fields["Prohibited Schools"].join(", "),
      languages: fields.Languages.join(", "),
      level: fields.Level[0],
      hp: fields.HP,
      xp: fields.XP,
      hd: fields["Hit Die"][0],
      feats: fields["Feats - Text"],
      specialAbilities: fields["Special Abilities - Text"],
      abilities: {
        str: {
          name: "STR",
          score: fields.STR,
          mod: fields["STR Mod"],
        },
        dex: {
          name: "DEX",
          score: fields.DEX,
          mod: fields["STR Mod"],
        },
        con: {
          name: "CON",
          score: fields.CON,
          mod: fields["CON Mod"],
        },
        int: {
          name: "INT",
          score: fields.INT,
          mod: fields["INT Mod"],
        },
        wis: {
          name: "WIS",
          score: fields.WIS,
          mod: fields["WIS Mod"],
        },
        cha: {
          name: "CHA",
          score: fields.CHA,
          mod: fields["CHA Mod"],
        },
      },
      skills
    }
  }
}
