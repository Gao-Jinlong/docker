import { ApolloServer } from '@apollo/server';

const typeDefs = `
  type Student {
    id: String,
    name: String,
    sex: Boolean,
    age: Int
  }

  type Teacher {
    id: String,
    name: String,
    age: Int,
    subject: [String],
    students: [Student]
  }

  type Query {
    students: [Student],
    teachers: [Teacher],
  }

  schema {
    query: Query
  }
`;

const students = [
  {
    id: '1',
    name: async () => {
      await '取数据';
      return '张三';
    },
    sex: true,
    age: 12,
  },
  {
    id: '2',
    name: '李四',
    sex: true,
    age: 13,
  },
  {
    id: '3',
    name: '小红',
    sex: false,
    age: 11,
  },
];

const teachers = [
  {
    id: '1',
    name: '神光',
    sex: true,
    subject: ['体育', '数学'],
    age: 28,
    students: students,
  },
];

const resolvers = {
  Query: {
    students: () => students,
    teachers: () => teachers,
  },
};
