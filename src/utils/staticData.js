export const schools = [
   'Abjuration', 'Conjuration', 'Divination', 
   'Enchantment', 'Evocation', 'Illusion',  
   'Necromancy', 'Transmutation', 'Universal'
]

export const alignments = [
   'Lawful Good', 'Neutral Good', 'Chaotic Good', 
   'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 
   'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
]

export const abilities = {
   str: 'Strength',
   dex: 'Dexterity',
   con: 'Constitution',
   int: 'Intelligence',
   wis: 'Wisdom',
   cha: 'Charisma'
}

export const sizeMods = {
   Colossal: { size: -8, grapple: 16, hide: -16 },
   Gargantuan: { size: -4, grapple: 12, hide: -12 },
   Huge: { size: -2, grapple: 8, hide: -8 },
   Large: { size: -1, grapple: 4, hide: -4 },
   Medium: { size: 0, grapple: 0, hide: 0 },
   Small: { size: 1, grapple: -4, hide: 4 },
   Tiny: { size: 2, grapple: -8, hide: 8 },
   Diminutive: { size: 4, grapple: -12, hide: 12 },
   Fine: { size: 8, grapple: -16, hide: 16 }
}