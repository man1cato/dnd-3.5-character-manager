export default {
	id:'recnPKEA6sOWaOt57',
	fields: {
		name:'Istvyll Bannianea',
		alignment:'Lawful Evil',
		school:'Transmutation',
		prohibitedSchools: ['Illusion, Necromancy'],
		languages: ['Common', 'Elven', 'Draconic', 'Orc', 'Sylvan'],
		level:5,
		hp: {
			base: 32,
			mod: 6,
			damage: 10
		},
		xp: 10000,
		hd: 'D4',
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
		specialAbilities: ["rect54ikkC9SDLJ1x"],
		feats: ["recRjuAWe7oy6a7wY", "rec4KkfhKpetKIDqj", "recGkxwkqppy7EYmI"],
		skillSet:[
			{
				id: "recfbplSsRmzNs68J",
				name: "Appraise",
				ranks: 4
			},{
				id: "recoJ7dkAWtHAkj3v",
				name: "Balance",
				ranks: 3
			}, {
				id: "recHCeKVn3CB0HcNA",
				name: "Climb",
				ranks: 5
			}, {
				id: "recs2EXcqiCIfwO0w",
				name: "Conscentration",
				ranks: 9
			}
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
		},
		weaponSet: ["recOvuth9QArkI54l"],
		money: {
			pp: 0,
			gp: 1200,
			sp: 350,
			cp: 80
		},
		equipment: [{
			id: "recOvuth9QArkI54l",
			qty: 1
		}, {
			id: "recuMZnz4kks14Yku",
			qty: 1
		}, {
			id: "recSYqEwn9Uzr4mec",
			qty: 30
		}, {
			id: "rec35ieQLel7fW2Mo",
			qty: 2
		}],
		spellbook: [{
			spells: [{
				id: 123,
				level: 0,
				name: "Acid Splash",
				description: "Acid missile 1d3 damage",
				school: "Conj",
				mastered: false,
				prepared: 1,
				used: 0,
				remaining: 1
			}, {
				id: 456,
				level: 0,
				name: "Arcane Mark",
				description: "aomething",
				school: "Univ",
				mastered: true,
				prepared: 2,
				used: 1,
				remaining: 1
			}],
			spellsPerDay: 4
		},{
			spells: [{
				id: 678,
				level: 1,
				name: "Charm Person",
				description: "Make someone like you",
				school: "Ench",
				mastered: false,
				prepared: 1,
				used: 1,
				remaining: 0
			}],
			spellsPerDay: 3
		}],
		companion: {
			name: "Nyx",
			type: "Raven",
			hp: { 
				base: 16 
			},
			abilities: {
				str: 1,
				dex: 15,
				con: 10,
				int: 8,
				wis: 14,
				cha: 6
			},
			skillSet: [{
				name: "Hide",
				ranks: 10
			},{
				name: "Climb",
				ranks: 3
			}, {
				name: "Listen",
				ranks: 5
			}, {
				name: "Concentration",
				ranks: 9
			}, {
				name: "Spot",
				ranks: 5
			}],
			speed: {
				ground: 10,
				flight: 40,
			},
			initiative: {
				base: 2
			},
			ac: {
				base: 14,
				touch: 14,
				flat: 12
			},
			attack: "Claws +4 melee (1d2–5)",
			features: "Empathic Link, Share Spells, Improved Evasion, Deliver Touch Spells, Speak with Master",
			feats: ["recvzMqdCBIzd7z9n", "recVdnKmMFz54fNLF"],
			specialAbilities: ["recoVjIceMNsVyiqI", "recC7zmmkwPjM104d", "recD7wgtCKPM9k7X9", "recmKq1KJyCGILkHN"],
			benefit: "Master gains a +3 bonus on Appraise checks"
		}
	}
}
