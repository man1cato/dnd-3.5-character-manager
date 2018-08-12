import axios from 'axios';
import compareByName from './compareByName';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseUrl = 'https://api.airtable.com/v0/appK7TZeddGqjGUDL';

class Ability {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.mod = Math.floor(score/2 - 5);
    this.tempScore = "";
    this.tempMod = "";
  }
}

const mapSkills = (skillset) => skillset.map((skill) => ({
  id: skill.fields["Skill ID"],
  name: skill.fields.Name || "",
  ranks: skill.fields["Total Ranks"] || 0
})).sort(compareByName);


export default async (firebaseUID) => {
  const characterFilter = `{Firebase UID}="${firebaseUID}"`;
  const characterResponse = await axios.get(`${baseUrl}/Characters?api_key=${apiKey}&filterByFormula=${characterFilter}`);
  const characterId = characterResponse.data.records[0].id;
  const fields = characterResponse.data.records[0].fields;
  const ownerFilter = `{Owner ID}="${characterId}"`;

  const characterSkillsetResponse = await axios.get(`${baseUrl}/Skillsets?api_key=${apiKey}&filterByFormula=${ownerFilter}`);
  const characterSkillSet = mapSkills(characterSkillsetResponse.data.records);

  const level = fields.Level[0];
  const xp = fields.XP;
  const nextLevelXp = level*(level+1)*500;
  const abilities = {
    str: new Ability("STR", fields.STR),
    dex: new Ability("DEX", fields.DEX),
    con: new Ability("CON", fields.CON),
    int: new Ability("INT", fields.INT),
    wis: new Ability("WIS", fields.WIS),
    cha: new Ability("CHA", fields.CHA)
  };
  
  const equipmentResponse = await axios.get(`${baseUrl}/Equipment?api_key=${apiKey}&filterByFormula=${ownerFilter}`);
  const equipment = equipmentResponse.data.records.map((item) => {
    const qty = item.fields.Qty;
    const unitValue = item.fields["Unit Value"] ? item.fields["Unit Value"][0] : 0;
    const unitWeight = item.fields["Unit Weight (lbs)"] ? item.fields["Unit Weight (lbs)"][0] : 0;
    return {
      id: item.fields["Item ID"][0],
      name: item.fields.Name,
      qty,
      unitValue,
      unitWeight,
      category: item.fields.Category[0],
      totalValue: Number((qty*unitValue).toFixed(2)),
      totalWeight: Number((qty*unitWeight).toFixed(2))
    }
  }).sort(compareByName);


  const spellbookResponse = await axios.get(`${baseUrl}/Spellbooks?api_key=${apiKey}&filterByFormula=${ownerFilter}`);
  const spells = spellbookResponse.data.records.map((spell) => {
    const prepared = spell.fields.Prepared || 0;
    const used = spell.fields.Used || 0;
    return {
      id: spell.fields["Spell ID"][0],
      level: Number(spell.fields.Level),
      name: spell.fields.Name.replace(/"/g,""),
      description: spell.fields.Description[0],
      school: spell.fields.School[0],
      mastered: spell.fields["Mastered?"] || false,
      prepared,
      used,
      remaining: prepared - used
    }
  }).sort(compareByName);
  let spellsPerDay = [fields["SPD 0"][0], fields["SPD 1"][0], fields["SPD 2"][0], fields["SPD 3"][0], fields["SPD 4"][0], fields["SPD 5"][0], fields["SPD 6"][0], fields["SPD 7"][0], fields["SPD 8"][0], fields["SPD 9"][0]];
  spellsPerDay = spellsPerDay.filter((spd) => spd > 0);
  let spellbook = spellsPerDay.map((spd, level) => ({
    spells: spells.filter((spell) => spell.level == level),
    spellsPerDay: fields[`SPD ${level}`][0]
  }));
  for (let i = 0; i < spellbook.length; i++) {
    spellbook[i].total = spellbook[i].spells.map((spell) => spell.prepared).reduce((total, num) => total + num);
  }

  const companionResponse = await axios.get(`${baseUrl}/Companions?api_key=${apiKey}&filterByFormula=${ownerFilter}`);
  const companionFields = companionResponse.data.records[0].fields;
  const companionSkillsetResponse = await axios.get(`${baseUrl}/Skillsets?api_key=${apiKey}&filterByFormula={Companion ID}="${companionFields['Companion ID']}"`);
  const companionSkillSet = mapSkills(companionSkillsetResponse.data.records);
  const companionAbilities = {
    str: new Ability("STR", companionFields.STR[0]),
    dex: new Ability("DEX", companionFields.DEX[0]),
    con: new Ability("CON", companionFields.CON[0]),
    int: new Ability("INT", companionFields.INT),
    wis: new Ability("WIS", companionFields.WIS[0]),
    cha: new Ability("CHA", companionFields.CHA[0])
  }
  const companion = {
    name: companionFields.Name,
    type: companionFields['Animal Type'],
    hp: { 
      base: companionFields.HP 
    },
    abilities: companionAbilities,
    skillSet: companionSkillSet,
    speed: {
      ground: companionFields['Speed (ground)'],
      flight: companionFields['Speed (flight)'],
    },
    initiative: {
      base: companionFields.Initiative[0]
    },
    ac: {
      base: companionFields['AC'],
      touch: companionFields['AC Touch'],
      flat: companionFields['AC Flat']
    },
    saves: {
      fortitude: {
        name: "Fortitude",
        base: Number(companionFields["Fort Base"]) + companionAbilities.con.mod
      },
      reflex: {
        name: "Reflex",
        base: Number(companionFields["Ref Base"]) + companionAbilities.dex.mod
      },
      will: {
        name: "Will",
        base: Number(companionFields["Will Base"]) + companionAbilities.wis.mod
      }
    },
    attack: companionFields.Attack[0],
    feats: companionFields.Feats,
    specialAbilities: companionFields['Special Abilities'],
    benefit: companionFields['Owner Benefit']
  }
  
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
      hp: { 
        base: fields.HP 
      },
      hd: fields["Hit Die"][0],
      feats: fields.Feats,
      specialAbilities: fields["Special Abilities"],
      abilities,
      skillSet: characterSkillSet,
      saves: {
        fortitude: {
          name: "Fortitude",
          base: Number(fields["Fort Base"]) + abilities.con.mod
        },
        reflex: {
          name: "Reflex",
          base: Number(fields["Ref Base"]) + abilities.dex.mod
        },
        will: {
          name: "Will",
          base: Number(fields["Will Base"]) + abilities.wis.mod
        }
      },
      bab: [
        fields["BAB 1"][0],
        fields["BAB 2"][0],
        fields["BAB 3"][0],
        fields["BAB 4"][0]
      ],
      attacks: {        
        melee: {
          name:"Melee",
          base: fields.Melee
        },
        ranged: {
          name: "Ranged",
          base: fields.Ranged
        },
        grapple: {
          name: "Grapple",
          base: fields.Grapple
        }
      },
      ac: {
        base: fields["AC - Base"],
        flat: fields["AC - Flat"],
        touch: fields["AC - Touch"]
      },
      speed: fields.Speed[0],
      initiative: {
        base: fields["STR Mod"]
      },      
      weaponSet: equipment.filter((item) => item.category === "Weapon").map((weapon) => weapon.id),
      money: {
        pp: equipment.find((item) => item.name === "Platinum Piece") ? equipment.find((item) => item.name === "Platinum Piece").qty : 0,
        gp: equipment.find((item) => item.name === "Gold Piece") ? equipment.find((item) => item.name === "Gold Piece").qty : 0,
        sp: equipment.find((item) => item.name === "Silver Piece") ? equipment.find((item) => item.name === "Silver Piece").qty : 0,
        cp: equipment.find((item) => item.name === "Copper Piece") ? equipment.find((item) => item.name === "Copper Piece").qty : 0
      },
      equipment: equipment.filter((item) => item.category !== "Money"),
      spellbook,
      companion
    }
  }
}
