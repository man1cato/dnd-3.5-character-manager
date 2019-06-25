export default {
	id:'recnPKEA6sOWaOt57',
	name:'Istvyll Bannianea',
	gender: 'Male',
	age: 141,
	height: `5'2"`,
	weight: 97,
	race: 'recOadObhQKOMa7f2',
	jobClass: 'recBCWC99ohXXKqwL',
	alignment:'Lawful Evil',
	school:'Transmutation',
	prohibitedSchools: ['Illusion, Necromancy'],
	languages: ['Common', 'Elven', 'Draconic', 'Orc', 'Sylvan'],
	level:5,
	iconUrl: 'images/elf.svg',
	hp: {
		base: 32,
		mod: 6,
		damage: 10
	},
	xp: 10000,
	abilities: {
		str: {
			score:14
		},
		dex: {
			score:18
		},
		con: {
			score:16
		},
		int: {
			score:20
		},
		wis: {
			score:14
		},
		cha: {
			score:11
		}
	},
	specialAbilities: ["rect54ikkC9SDLJ1x"],
	feats: ["recRjuAWe7oy6a7wY", "rec4KkfhKpetKIDqj", "recGkxwkqppy7EYmI"],
	skillSet: [
		{
			id: "recfbplSsRmzNs68J",
			ranks: 4
		},{
			id: "recoJ7dkAWtHAkj3v",
			ranks: 3
		}, {
			id: "recHCeKVn3CB0HcNA",
			ranks: 5
		}, {
			id: "recs2EXcqiCIfwO0w",
			ranks: 9
		}
	],
	skillPoints: 12,
	saves: {
		fortitude: {
			base: 1
		},
		reflex: {
			base: 1
		},
		will: {
			base: 4
		}
	},
	attacks: {
		melee: {
			base: 4
		},
		ranged: {
			base: 6
		},
		grapple: {
			base: 4
		}
	},
	ac: {
		base: 14,
		flat: 10,
		touch: 14
	},
	speed: 30,
	initiative: {
		base: 2
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
	equipped: {
		shield: 'recZBZ5DTJuo8Uaea',
		weapons: [
			'recAaHr4qEcbytOpu',
			'rec0JezjbAvUiWr8A',
			'recWQ2ml4RhoLtvik'
		]
	},
	spellbook: [{
		spells: [{
			id: "rec8IQeYmBr3f1BMC",
			level: 0,
			mastered: false,
			prepared: 1,
			used: 0,
			remaining: 1
		}, {
			id: "recwpeRoCsea4vidW",
			level: 0,
			mastered: true,
			prepared: 2,
			used: 1,
			remaining: 1
		}],
		spellsPerDay: 4
	},{
		spells: [{
			id: "recRhVs0ahtQZpbXx",
			level: 1,
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
