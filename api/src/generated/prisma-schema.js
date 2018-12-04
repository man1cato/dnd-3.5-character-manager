module.exports = {
        typeDefs: /* GraphQL */ `type AbilityScores {
  str: Int
  dex: Int
  con: Int
  int: Int
  wis: Int
  cha: Int
}

type AbilityScoresConnection {
  pageInfo: PageInfo!
  edges: [AbilityScoresEdge]!
  aggregate: AggregateAbilityScores!
}

input AbilityScoresCreateInput {
  str: Int
  dex: Int
  con: Int
  int: Int
  wis: Int
  cha: Int
}

input AbilityScoresCreateOneInput {
  create: AbilityScoresCreateInput
}

type AbilityScoresEdge {
  node: AbilityScores!
  cursor: String!
}

enum AbilityScoresOrderByInput {
  str_ASC
  str_DESC
  dex_ASC
  dex_DESC
  con_ASC
  con_DESC
  int_ASC
  int_DESC
  wis_ASC
  wis_DESC
  cha_ASC
  cha_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AbilityScoresPreviousValues {
  str: Int
  dex: Int
  con: Int
  int: Int
  wis: Int
  cha: Int
}

type AbilityScoresSubscriptionPayload {
  mutation: MutationType!
  node: AbilityScores
  updatedFields: [String!]
  previousValues: AbilityScoresPreviousValues
}

input AbilityScoresSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AbilityScoresWhereInput
  AND: [AbilityScoresSubscriptionWhereInput!]
  OR: [AbilityScoresSubscriptionWhereInput!]
  NOT: [AbilityScoresSubscriptionWhereInput!]
}

input AbilityScoresUpdateDataInput {
  str: Int
  dex: Int
  con: Int
  int: Int
  wis: Int
  cha: Int
}

input AbilityScoresUpdateManyMutationInput {
  str: Int
  dex: Int
  con: Int
  int: Int
  wis: Int
  cha: Int
}

input AbilityScoresUpdateOneInput {
  create: AbilityScoresCreateInput
  update: AbilityScoresUpdateDataInput
  upsert: AbilityScoresUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
}

input AbilityScoresUpsertNestedInput {
  update: AbilityScoresUpdateDataInput!
  create: AbilityScoresCreateInput!
}

input AbilityScoresWhereInput {
  str: Int
  str_not: Int
  str_in: [Int!]
  str_not_in: [Int!]
  str_lt: Int
  str_lte: Int
  str_gt: Int
  str_gte: Int
  dex: Int
  dex_not: Int
  dex_in: [Int!]
  dex_not_in: [Int!]
  dex_lt: Int
  dex_lte: Int
  dex_gt: Int
  dex_gte: Int
  con: Int
  con_not: Int
  con_in: [Int!]
  con_not_in: [Int!]
  con_lt: Int
  con_lte: Int
  con_gt: Int
  con_gte: Int
  int: Int
  int_not: Int
  int_in: [Int!]
  int_not_in: [Int!]
  int_lt: Int
  int_lte: Int
  int_gt: Int
  int_gte: Int
  wis: Int
  wis_not: Int
  wis_in: [Int!]
  wis_not_in: [Int!]
  wis_lt: Int
  wis_lte: Int
  wis_gt: Int
  wis_gte: Int
  cha: Int
  cha_not: Int
  cha_in: [Int!]
  cha_not_in: [Int!]
  cha_lt: Int
  cha_lte: Int
  cha_gt: Int
  cha_gte: Int
  AND: [AbilityScoresWhereInput!]
  OR: [AbilityScoresWhereInput!]
  NOT: [AbilityScoresWhereInput!]
}

type AggregateAbilityScores {
  count: Int!
}

type AggregateCharacter {
  count: Int!
}

type AggregateClass {
  count: Int!
}

type AggregateRace {
  count: Int!
}

type AggregateUser {
  count: Int!
}

enum Alignment {
  Lawful_Good
  Neutral_Good
  Chaotic_Good
  Lawful_Neutral
  True_Neutral
  Chaotic_Neutral
  Lawful_Evil
  Neutral_Evil
  Chaotic_Evil
}

type BatchPayload {
  count: Long!
}

type Character {
  id: ID!
  name: String!
  race: Race!
  gender: Gender!
  age: Int!
  height: Int!
  weight: Int!
  alignment: Alignment!
  class: Class!
  deity: String
  owner: User!
}

type CharacterConnection {
  pageInfo: PageInfo!
  edges: [CharacterEdge]!
  aggregate: AggregateCharacter!
}

input CharacterCreateInput {
  name: String!
  race: RaceCreateOneWithoutCharactersInput!
  gender: Gender!
  age: Int!
  height: Int!
  weight: Int!
  alignment: Alignment!
  class: ClassCreateOneWithoutCharactersInput!
  deity: String
  owner: UserCreateOneWithoutCharactersInput!
}

input CharacterCreateManyWithoutClassInput {
  create: [CharacterCreateWithoutClassInput!]
  connect: [CharacterWhereUniqueInput!]
}

input CharacterCreateManyWithoutOwnerInput {
  create: [CharacterCreateWithoutOwnerInput!]
  connect: [CharacterWhereUniqueInput!]
}

input CharacterCreateManyWithoutRaceInput {
  create: [CharacterCreateWithoutRaceInput!]
  connect: [CharacterWhereUniqueInput!]
}

input CharacterCreateWithoutClassInput {
  name: String!
  race: RaceCreateOneWithoutCharactersInput!
  gender: Gender!
  age: Int!
  height: Int!
  weight: Int!
  alignment: Alignment!
  deity: String
  owner: UserCreateOneWithoutCharactersInput!
}

input CharacterCreateWithoutOwnerInput {
  name: String!
  race: RaceCreateOneWithoutCharactersInput!
  gender: Gender!
  age: Int!
  height: Int!
  weight: Int!
  alignment: Alignment!
  class: ClassCreateOneWithoutCharactersInput!
  deity: String
}

input CharacterCreateWithoutRaceInput {
  name: String!
  gender: Gender!
  age: Int!
  height: Int!
  weight: Int!
  alignment: Alignment!
  class: ClassCreateOneWithoutCharactersInput!
  deity: String
  owner: UserCreateOneWithoutCharactersInput!
}

type CharacterEdge {
  node: Character!
  cursor: String!
}

enum CharacterOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  gender_ASC
  gender_DESC
  age_ASC
  age_DESC
  height_ASC
  height_DESC
  weight_ASC
  weight_DESC
  alignment_ASC
  alignment_DESC
  deity_ASC
  deity_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CharacterPreviousValues {
  id: ID!
  name: String!
  gender: Gender!
  age: Int!
  height: Int!
  weight: Int!
  alignment: Alignment!
  deity: String
}

type CharacterSubscriptionPayload {
  mutation: MutationType!
  node: Character
  updatedFields: [String!]
  previousValues: CharacterPreviousValues
}

input CharacterSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CharacterWhereInput
  AND: [CharacterSubscriptionWhereInput!]
  OR: [CharacterSubscriptionWhereInput!]
  NOT: [CharacterSubscriptionWhereInput!]
}

input CharacterUpdateInput {
  name: String
  race: RaceUpdateOneRequiredWithoutCharactersInput
  gender: Gender
  age: Int
  height: Int
  weight: Int
  alignment: Alignment
  class: ClassUpdateOneRequiredWithoutCharactersInput
  deity: String
  owner: UserUpdateOneRequiredWithoutCharactersInput
}

input CharacterUpdateManyMutationInput {
  name: String
  gender: Gender
  age: Int
  height: Int
  weight: Int
  alignment: Alignment
  deity: String
}

input CharacterUpdateManyWithoutClassInput {
  create: [CharacterCreateWithoutClassInput!]
  delete: [CharacterWhereUniqueInput!]
  connect: [CharacterWhereUniqueInput!]
  disconnect: [CharacterWhereUniqueInput!]
  update: [CharacterUpdateWithWhereUniqueWithoutClassInput!]
  upsert: [CharacterUpsertWithWhereUniqueWithoutClassInput!]
}

input CharacterUpdateManyWithoutOwnerInput {
  create: [CharacterCreateWithoutOwnerInput!]
  delete: [CharacterWhereUniqueInput!]
  connect: [CharacterWhereUniqueInput!]
  disconnect: [CharacterWhereUniqueInput!]
  update: [CharacterUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [CharacterUpsertWithWhereUniqueWithoutOwnerInput!]
}

input CharacterUpdateManyWithoutRaceInput {
  create: [CharacterCreateWithoutRaceInput!]
  delete: [CharacterWhereUniqueInput!]
  connect: [CharacterWhereUniqueInput!]
  disconnect: [CharacterWhereUniqueInput!]
  update: [CharacterUpdateWithWhereUniqueWithoutRaceInput!]
  upsert: [CharacterUpsertWithWhereUniqueWithoutRaceInput!]
}

input CharacterUpdateWithoutClassDataInput {
  name: String
  race: RaceUpdateOneRequiredWithoutCharactersInput
  gender: Gender
  age: Int
  height: Int
  weight: Int
  alignment: Alignment
  deity: String
  owner: UserUpdateOneRequiredWithoutCharactersInput
}

input CharacterUpdateWithoutOwnerDataInput {
  name: String
  race: RaceUpdateOneRequiredWithoutCharactersInput
  gender: Gender
  age: Int
  height: Int
  weight: Int
  alignment: Alignment
  class: ClassUpdateOneRequiredWithoutCharactersInput
  deity: String
}

input CharacterUpdateWithoutRaceDataInput {
  name: String
  gender: Gender
  age: Int
  height: Int
  weight: Int
  alignment: Alignment
  class: ClassUpdateOneRequiredWithoutCharactersInput
  deity: String
  owner: UserUpdateOneRequiredWithoutCharactersInput
}

input CharacterUpdateWithWhereUniqueWithoutClassInput {
  where: CharacterWhereUniqueInput!
  data: CharacterUpdateWithoutClassDataInput!
}

input CharacterUpdateWithWhereUniqueWithoutOwnerInput {
  where: CharacterWhereUniqueInput!
  data: CharacterUpdateWithoutOwnerDataInput!
}

input CharacterUpdateWithWhereUniqueWithoutRaceInput {
  where: CharacterWhereUniqueInput!
  data: CharacterUpdateWithoutRaceDataInput!
}

input CharacterUpsertWithWhereUniqueWithoutClassInput {
  where: CharacterWhereUniqueInput!
  update: CharacterUpdateWithoutClassDataInput!
  create: CharacterCreateWithoutClassInput!
}

input CharacterUpsertWithWhereUniqueWithoutOwnerInput {
  where: CharacterWhereUniqueInput!
  update: CharacterUpdateWithoutOwnerDataInput!
  create: CharacterCreateWithoutOwnerInput!
}

input CharacterUpsertWithWhereUniqueWithoutRaceInput {
  where: CharacterWhereUniqueInput!
  update: CharacterUpdateWithoutRaceDataInput!
  create: CharacterCreateWithoutRaceInput!
}

input CharacterWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  race: RaceWhereInput
  gender: Gender
  gender_not: Gender
  gender_in: [Gender!]
  gender_not_in: [Gender!]
  age: Int
  age_not: Int
  age_in: [Int!]
  age_not_in: [Int!]
  age_lt: Int
  age_lte: Int
  age_gt: Int
  age_gte: Int
  height: Int
  height_not: Int
  height_in: [Int!]
  height_not_in: [Int!]
  height_lt: Int
  height_lte: Int
  height_gt: Int
  height_gte: Int
  weight: Int
  weight_not: Int
  weight_in: [Int!]
  weight_not_in: [Int!]
  weight_lt: Int
  weight_lte: Int
  weight_gt: Int
  weight_gte: Int
  alignment: Alignment
  alignment_not: Alignment
  alignment_in: [Alignment!]
  alignment_not_in: [Alignment!]
  class: ClassWhereInput
  deity: String
  deity_not: String
  deity_in: [String!]
  deity_not_in: [String!]
  deity_lt: String
  deity_lte: String
  deity_gt: String
  deity_gte: String
  deity_contains: String
  deity_not_contains: String
  deity_starts_with: String
  deity_not_starts_with: String
  deity_ends_with: String
  deity_not_ends_with: String
  owner: UserWhereInput
  AND: [CharacterWhereInput!]
  OR: [CharacterWhereInput!]
  NOT: [CharacterWhereInput!]
}

input CharacterWhereUniqueInput {
  id: ID
}

type Class {
  id: ID!
  name: String!
  hitDie: HitDie!
  favoredRaces(where: RaceWhereInput, orderBy: RaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Race!]
  characters(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Character!]
}

type ClassConnection {
  pageInfo: PageInfo!
  edges: [ClassEdge]!
  aggregate: AggregateClass!
}

input ClassCreateInput {
  name: String!
  hitDie: HitDie!
  favoredRaces: RaceCreateManyWithoutFavoredClassInput
  characters: CharacterCreateManyWithoutClassInput
}

input ClassCreateOneWithoutCharactersInput {
  create: ClassCreateWithoutCharactersInput
  connect: ClassWhereUniqueInput
}

input ClassCreateOneWithoutFavoredRacesInput {
  create: ClassCreateWithoutFavoredRacesInput
  connect: ClassWhereUniqueInput
}

input ClassCreateWithoutCharactersInput {
  name: String!
  hitDie: HitDie!
  favoredRaces: RaceCreateManyWithoutFavoredClassInput
}

input ClassCreateWithoutFavoredRacesInput {
  name: String!
  hitDie: HitDie!
  characters: CharacterCreateManyWithoutClassInput
}

type ClassEdge {
  node: Class!
  cursor: String!
}

enum ClassOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  hitDie_ASC
  hitDie_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ClassPreviousValues {
  id: ID!
  name: String!
  hitDie: HitDie!
}

type ClassSubscriptionPayload {
  mutation: MutationType!
  node: Class
  updatedFields: [String!]
  previousValues: ClassPreviousValues
}

input ClassSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ClassWhereInput
  AND: [ClassSubscriptionWhereInput!]
  OR: [ClassSubscriptionWhereInput!]
  NOT: [ClassSubscriptionWhereInput!]
}

input ClassUpdateInput {
  name: String
  hitDie: HitDie
  favoredRaces: RaceUpdateManyWithoutFavoredClassInput
  characters: CharacterUpdateManyWithoutClassInput
}

input ClassUpdateManyMutationInput {
  name: String
  hitDie: HitDie
}

input ClassUpdateOneRequiredWithoutCharactersInput {
  create: ClassCreateWithoutCharactersInput
  update: ClassUpdateWithoutCharactersDataInput
  upsert: ClassUpsertWithoutCharactersInput
  connect: ClassWhereUniqueInput
}

input ClassUpdateOneWithoutFavoredRacesInput {
  create: ClassCreateWithoutFavoredRacesInput
  update: ClassUpdateWithoutFavoredRacesDataInput
  upsert: ClassUpsertWithoutFavoredRacesInput
  delete: Boolean
  disconnect: Boolean
  connect: ClassWhereUniqueInput
}

input ClassUpdateWithoutCharactersDataInput {
  name: String
  hitDie: HitDie
  favoredRaces: RaceUpdateManyWithoutFavoredClassInput
}

input ClassUpdateWithoutFavoredRacesDataInput {
  name: String
  hitDie: HitDie
  characters: CharacterUpdateManyWithoutClassInput
}

input ClassUpsertWithoutCharactersInput {
  update: ClassUpdateWithoutCharactersDataInput!
  create: ClassCreateWithoutCharactersInput!
}

input ClassUpsertWithoutFavoredRacesInput {
  update: ClassUpdateWithoutFavoredRacesDataInput!
  create: ClassCreateWithoutFavoredRacesInput!
}

input ClassWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  hitDie: HitDie
  hitDie_not: HitDie
  hitDie_in: [HitDie!]
  hitDie_not_in: [HitDie!]
  favoredRaces_every: RaceWhereInput
  favoredRaces_some: RaceWhereInput
  favoredRaces_none: RaceWhereInput
  characters_every: CharacterWhereInput
  characters_some: CharacterWhereInput
  characters_none: CharacterWhereInput
  AND: [ClassWhereInput!]
  OR: [ClassWhereInput!]
  NOT: [ClassWhereInput!]
}

input ClassWhereUniqueInput {
  id: ID
  name: String
}

scalar DateTime

enum Gender {
  Male
  Female
  Non_Binary
}

enum HitDie {
  D4
  D6
  D8
  D10
  D12
}

enum Language {
  Common
  Abyssal
  Draconic
  Dwarven
  Elven
  Giant
  Gnoll
  Gnome
  Goblin
  Orc
  Halfling
  Sylvan
  Undercommon
  Terran
}

scalar Long

type Mutation {
  createAbilityScores(data: AbilityScoresCreateInput!): AbilityScores!
  updateManyAbilityScoreses(data: AbilityScoresUpdateManyMutationInput!, where: AbilityScoresWhereInput): BatchPayload!
  deleteManyAbilityScoreses(where: AbilityScoresWhereInput): BatchPayload!
  createCharacter(data: CharacterCreateInput!): Character!
  updateCharacter(data: CharacterUpdateInput!, where: CharacterWhereUniqueInput!): Character
  updateManyCharacters(data: CharacterUpdateManyMutationInput!, where: CharacterWhereInput): BatchPayload!
  upsertCharacter(where: CharacterWhereUniqueInput!, create: CharacterCreateInput!, update: CharacterUpdateInput!): Character!
  deleteCharacter(where: CharacterWhereUniqueInput!): Character
  deleteManyCharacters(where: CharacterWhereInput): BatchPayload!
  createClass(data: ClassCreateInput!): Class!
  updateClass(data: ClassUpdateInput!, where: ClassWhereUniqueInput!): Class
  updateManyClasses(data: ClassUpdateManyMutationInput!, where: ClassWhereInput): BatchPayload!
  upsertClass(where: ClassWhereUniqueInput!, create: ClassCreateInput!, update: ClassUpdateInput!): Class!
  deleteClass(where: ClassWhereUniqueInput!): Class
  deleteManyClasses(where: ClassWhereInput): BatchPayload!
  createRace(data: RaceCreateInput!): Race!
  updateRace(data: RaceUpdateInput!, where: RaceWhereUniqueInput!): Race
  updateManyRaces(data: RaceUpdateManyMutationInput!, where: RaceWhereInput): BatchPayload!
  upsertRace(where: RaceWhereUniqueInput!, create: RaceCreateInput!, update: RaceUpdateInput!): Race!
  deleteRace(where: RaceWhereUniqueInput!): Race
  deleteManyRaces(where: RaceWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  abilityScoreses(where: AbilityScoresWhereInput, orderBy: AbilityScoresOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AbilityScores]!
  abilityScoresesConnection(where: AbilityScoresWhereInput, orderBy: AbilityScoresOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AbilityScoresConnection!
  character(where: CharacterWhereUniqueInput!): Character
  characters(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Character]!
  charactersConnection(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CharacterConnection!
  class(where: ClassWhereUniqueInput!): Class
  classes(where: ClassWhereInput, orderBy: ClassOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Class]!
  classesConnection(where: ClassWhereInput, orderBy: ClassOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ClassConnection!
  race(where: RaceWhereUniqueInput!): Race
  races(where: RaceWhereInput, orderBy: RaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Race]!
  racesConnection(where: RaceWhereInput, orderBy: RaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RaceConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Race {
  id: ID!
  name: String!
  size: Size!
  speed: Int!
  defaultLanguages: [Language!]!
  bonusLanguages: [Language!]!
  abilityMods: AbilityScores
  racialBonuses: [String!]!
  favoredClass: Class
  characters(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Character!]
}

type RaceConnection {
  pageInfo: PageInfo!
  edges: [RaceEdge]!
  aggregate: AggregateRace!
}

input RaceCreatebonusLanguagesInput {
  set: [Language!]
}

input RaceCreatedefaultLanguagesInput {
  set: [Language!]
}

input RaceCreateInput {
  name: String!
  size: Size!
  speed: Int!
  defaultLanguages: RaceCreatedefaultLanguagesInput
  bonusLanguages: RaceCreatebonusLanguagesInput
  abilityMods: AbilityScoresCreateOneInput
  racialBonuses: RaceCreateracialBonusesInput
  favoredClass: ClassCreateOneWithoutFavoredRacesInput
  characters: CharacterCreateManyWithoutRaceInput
}

input RaceCreateManyWithoutFavoredClassInput {
  create: [RaceCreateWithoutFavoredClassInput!]
  connect: [RaceWhereUniqueInput!]
}

input RaceCreateOneWithoutCharactersInput {
  create: RaceCreateWithoutCharactersInput
  connect: RaceWhereUniqueInput
}

input RaceCreateracialBonusesInput {
  set: [String!]
}

input RaceCreateWithoutCharactersInput {
  name: String!
  size: Size!
  speed: Int!
  defaultLanguages: RaceCreatedefaultLanguagesInput
  bonusLanguages: RaceCreatebonusLanguagesInput
  abilityMods: AbilityScoresCreateOneInput
  racialBonuses: RaceCreateracialBonusesInput
  favoredClass: ClassCreateOneWithoutFavoredRacesInput
}

input RaceCreateWithoutFavoredClassInput {
  name: String!
  size: Size!
  speed: Int!
  defaultLanguages: RaceCreatedefaultLanguagesInput
  bonusLanguages: RaceCreatebonusLanguagesInput
  abilityMods: AbilityScoresCreateOneInput
  racialBonuses: RaceCreateracialBonusesInput
  characters: CharacterCreateManyWithoutRaceInput
}

type RaceEdge {
  node: Race!
  cursor: String!
}

enum RaceOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  size_ASC
  size_DESC
  speed_ASC
  speed_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RacePreviousValues {
  id: ID!
  name: String!
  size: Size!
  speed: Int!
  defaultLanguages: [Language!]!
  bonusLanguages: [Language!]!
  racialBonuses: [String!]!
}

type RaceSubscriptionPayload {
  mutation: MutationType!
  node: Race
  updatedFields: [String!]
  previousValues: RacePreviousValues
}

input RaceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RaceWhereInput
  AND: [RaceSubscriptionWhereInput!]
  OR: [RaceSubscriptionWhereInput!]
  NOT: [RaceSubscriptionWhereInput!]
}

input RaceUpdatebonusLanguagesInput {
  set: [Language!]
}

input RaceUpdatedefaultLanguagesInput {
  set: [Language!]
}

input RaceUpdateInput {
  name: String
  size: Size
  speed: Int
  defaultLanguages: RaceUpdatedefaultLanguagesInput
  bonusLanguages: RaceUpdatebonusLanguagesInput
  abilityMods: AbilityScoresUpdateOneInput
  racialBonuses: RaceUpdateracialBonusesInput
  favoredClass: ClassUpdateOneWithoutFavoredRacesInput
  characters: CharacterUpdateManyWithoutRaceInput
}

input RaceUpdateManyMutationInput {
  name: String
  size: Size
  speed: Int
  defaultLanguages: RaceUpdatedefaultLanguagesInput
  bonusLanguages: RaceUpdatebonusLanguagesInput
  racialBonuses: RaceUpdateracialBonusesInput
}

input RaceUpdateManyWithoutFavoredClassInput {
  create: [RaceCreateWithoutFavoredClassInput!]
  delete: [RaceWhereUniqueInput!]
  connect: [RaceWhereUniqueInput!]
  disconnect: [RaceWhereUniqueInput!]
  update: [RaceUpdateWithWhereUniqueWithoutFavoredClassInput!]
  upsert: [RaceUpsertWithWhereUniqueWithoutFavoredClassInput!]
}

input RaceUpdateOneRequiredWithoutCharactersInput {
  create: RaceCreateWithoutCharactersInput
  update: RaceUpdateWithoutCharactersDataInput
  upsert: RaceUpsertWithoutCharactersInput
  connect: RaceWhereUniqueInput
}

input RaceUpdateracialBonusesInput {
  set: [String!]
}

input RaceUpdateWithoutCharactersDataInput {
  name: String
  size: Size
  speed: Int
  defaultLanguages: RaceUpdatedefaultLanguagesInput
  bonusLanguages: RaceUpdatebonusLanguagesInput
  abilityMods: AbilityScoresUpdateOneInput
  racialBonuses: RaceUpdateracialBonusesInput
  favoredClass: ClassUpdateOneWithoutFavoredRacesInput
}

input RaceUpdateWithoutFavoredClassDataInput {
  name: String
  size: Size
  speed: Int
  defaultLanguages: RaceUpdatedefaultLanguagesInput
  bonusLanguages: RaceUpdatebonusLanguagesInput
  abilityMods: AbilityScoresUpdateOneInput
  racialBonuses: RaceUpdateracialBonusesInput
  characters: CharacterUpdateManyWithoutRaceInput
}

input RaceUpdateWithWhereUniqueWithoutFavoredClassInput {
  where: RaceWhereUniqueInput!
  data: RaceUpdateWithoutFavoredClassDataInput!
}

input RaceUpsertWithoutCharactersInput {
  update: RaceUpdateWithoutCharactersDataInput!
  create: RaceCreateWithoutCharactersInput!
}

input RaceUpsertWithWhereUniqueWithoutFavoredClassInput {
  where: RaceWhereUniqueInput!
  update: RaceUpdateWithoutFavoredClassDataInput!
  create: RaceCreateWithoutFavoredClassInput!
}

input RaceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  size: Size
  size_not: Size
  size_in: [Size!]
  size_not_in: [Size!]
  speed: Int
  speed_not: Int
  speed_in: [Int!]
  speed_not_in: [Int!]
  speed_lt: Int
  speed_lte: Int
  speed_gt: Int
  speed_gte: Int
  abilityMods: AbilityScoresWhereInput
  favoredClass: ClassWhereInput
  characters_every: CharacterWhereInput
  characters_some: CharacterWhereInput
  characters_none: CharacterWhereInput
  AND: [RaceWhereInput!]
  OR: [RaceWhereInput!]
  NOT: [RaceWhereInput!]
}

input RaceWhereUniqueInput {
  id: ID
  name: String
}

enum Size {
  Tiny
  Small
  Medium
  Large
  Huge
}

type Subscription {
  abilityScores(where: AbilityScoresSubscriptionWhereInput): AbilityScoresSubscriptionPayload
  character(where: CharacterSubscriptionWhereInput): CharacterSubscriptionPayload
  class(where: ClassSubscriptionWhereInput): ClassSubscriptionPayload
  race(where: RaceSubscriptionWhereInput): RaceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  characters(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Character!]
  updatedAt: DateTime!
  createdAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
  characters: CharacterCreateManyWithoutOwnerInput
}

input UserCreateOneWithoutCharactersInput {
  create: UserCreateWithoutCharactersInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCharactersInput {
  name: String!
  email: String!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
  updatedAt: DateTime!
  createdAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  characters: CharacterUpdateManyWithoutOwnerInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
}

input UserUpdateOneRequiredWithoutCharactersInput {
  create: UserCreateWithoutCharactersInput
  update: UserUpdateWithoutCharactersDataInput
  upsert: UserUpsertWithoutCharactersInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutCharactersDataInput {
  name: String
  email: String
  password: String
}

input UserUpsertWithoutCharactersInput {
  update: UserUpdateWithoutCharactersDataInput!
  create: UserCreateWithoutCharactersInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  characters_every: CharacterWhereInput
  characters_some: CharacterWhereInput
  characters_none: CharacterWhereInput
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    