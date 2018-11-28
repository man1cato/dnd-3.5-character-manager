module.exports = {
        typeDefs: /* GraphQL */ `type AggregateCharacter {
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
  gender: Gender!
  age: Int!
  height: String!
  alignment: Alignment!
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
  gender: Gender!
  age: Int!
  height: String!
  alignment: Alignment!
  deity: String
  owner: UserCreateOneWithoutCharactersInput!
}

input CharacterCreateManyWithoutOwnerInput {
  create: [CharacterCreateWithoutOwnerInput!]
  connect: [CharacterWhereUniqueInput!]
}

input CharacterCreateWithoutOwnerInput {
  name: String!
  gender: Gender!
  age: Int!
  height: String!
  alignment: Alignment!
  deity: String
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
  height: String!
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
  gender: Gender
  age: Int
  height: String
  alignment: Alignment
  deity: String
  owner: UserUpdateOneRequiredWithoutCharactersInput
}

input CharacterUpdateManyMutationInput {
  name: String
  gender: Gender
  age: Int
  height: String
  alignment: Alignment
  deity: String
}

input CharacterUpdateManyWithoutOwnerInput {
  create: [CharacterCreateWithoutOwnerInput!]
  delete: [CharacterWhereUniqueInput!]
  connect: [CharacterWhereUniqueInput!]
  disconnect: [CharacterWhereUniqueInput!]
  update: [CharacterUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [CharacterUpsertWithWhereUniqueWithoutOwnerInput!]
}

input CharacterUpdateWithoutOwnerDataInput {
  name: String
  gender: Gender
  age: Int
  height: String
  alignment: Alignment
  deity: String
}

input CharacterUpdateWithWhereUniqueWithoutOwnerInput {
  where: CharacterWhereUniqueInput!
  data: CharacterUpdateWithoutOwnerDataInput!
}

input CharacterUpsertWithWhereUniqueWithoutOwnerInput {
  where: CharacterWhereUniqueInput!
  update: CharacterUpdateWithoutOwnerDataInput!
  create: CharacterCreateWithoutOwnerInput!
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
  height: String
  height_not: String
  height_in: [String!]
  height_not_in: [String!]
  height_lt: String
  height_lte: String
  height_gt: String
  height_gte: String
  height_contains: String
  height_not_contains: String
  height_starts_with: String
  height_not_starts_with: String
  height_ends_with: String
  height_not_ends_with: String
  alignment: Alignment
  alignment_not: Alignment
  alignment_in: [Alignment!]
  alignment_not_in: [Alignment!]
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

scalar DateTime

enum Gender {
  Male
  Female
  Non_Binary
}

scalar Long

type Mutation {
  createCharacter(data: CharacterCreateInput!): Character!
  updateCharacter(data: CharacterUpdateInput!, where: CharacterWhereUniqueInput!): Character
  updateManyCharacters(data: CharacterUpdateManyMutationInput!, where: CharacterWhereInput): BatchPayload!
  upsertCharacter(where: CharacterWhereUniqueInput!, create: CharacterCreateInput!, update: CharacterUpdateInput!): Character!
  deleteCharacter(where: CharacterWhereUniqueInput!): Character
  deleteManyCharacters(where: CharacterWhereInput): BatchPayload!
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
  character(where: CharacterWhereUniqueInput!): Character
  characters(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Character]!
  charactersConnection(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CharacterConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  character(where: CharacterSubscriptionWhereInput): CharacterSubscriptionPayload
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
    