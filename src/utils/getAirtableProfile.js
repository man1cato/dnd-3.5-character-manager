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
  const skills = skillsetResponse.data.records.sort((a,b) => {
    if (a.fields["Skill - Text"] > b.fields["Skill - Text"]) {
      return 1
    }
    return 0
  }).map((skill) => ({
    name: skill.fields["Skill - Text"],
    ranks: skill.fields["Total Ranks"]
  }));

  const level = fields.Level[0];
  const xp = fields.XP;
  const nextLevelXp = level*(level+1)*500;

  return {
    id: characterId,
    fields:{
      iconUrl: fields.Icon[0].url,
      name: fields.Name,
      age: fields.Age,
      height: fields.Height,
      weight: fields["Weight (lbs)"],
      gender: fields.Gender,
      size: fields.Size[0],
      race: fields["Race - Text"],
      class: fields.Class,
      deity: fields.Deity || "None",
      alignment: fields.Alignment,
      school: fields["School/Discipline"] || "N/A",
      prohibitedSchools: fields["Prohibited Schools"].join(", ") || "N/A",
      languages: fields.Languages.join(", "),
      level,
      xp,
      toNextLevel: nextLevelXp-xp,
      hp: fields.HP,
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
      skills,
      fort: fields.Fortitude,
      ref: fields.Reflex,
      will: fields.Will,
      ac: fields.AC
    }
  }
}
