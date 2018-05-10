export default {
  id:'recnPKEA6sOWaOt57',
  fields: {
    name:'Istvyll Bannianea',
    alignment:'Lawful Evil',
    school:'Transmutation',
    prohibitedSchools:'Illusion, Necromancy',
    languages:'Common, Elven, Draconic, Orc, Sylvan',
    level:5,
    hp: {
      base: 32,
      mod: 6,
      damage: 10
    },
    xp:10000,
    hd:'D4',
    abilities:{
      str:{
        name:'STR',
        score:14,
        mod:2
      },
      dex:{
        name:'DEX',
        score:18,
        mod:2
      },
      con:{
        name:'CON',
        score:16,
        mod:3
      },
      int:{
        name:'INT',
        score:20,
        mod:5
      },
      wis:{
        name:'WIS',
        score:14,
        mod:2
      },
      cha:{
        name:'CHA',
        score:11,
        mod:0
      }
    },
    skills:[
      'Hide (4)',
      'Climb (3)',
      'Listen (5)',
      'Decipher Script (10)',
      'Escape Artist (4)',
      'Sense Motive (5)',
      'Knowledge (Arcana) (11)',
      'Use Rope (4)',
      'Survival (2)',
      'Swim (2)',
      'Appraise (8)',
      'Spellcraft (12)',
      'Heal (2)',
      'Balance (4)',
      'Search (10)',
      'Ride (4)',
      'Concentration (9)',
      'Craft (Trapmaking) (12)',
      'Jump (2)',
      'Forgery (5)',
      'Knowledge (Arch. & Eng.) (10)',
      'Craft (Sculpting) (13)',
      'Spot (4)'
    ],
    saves: {
      fortitude: {
        name: "Fortitude",
        base: 4
      },
      reflex: {
        name: "Reflex",
        base: 5
      },
      will: {
        name: "Will",
        base: 6
      }
    },
    attacks: {
      melee: {
        name: "Melee",
        base: 4
      },
      ranged: {
        name: "Ranged",
        base: 6
      },
      grapple: {
        name: "Grapple",
        base: 4
      }
    },
    ac: {
      base: 14,
      flat: 10,
      touch: 14
    },
    speed: 30,
    bab: [4, 3, 2, 1],
    initiative: {
      base: 2,
      mod: 1
    }
  }
}
