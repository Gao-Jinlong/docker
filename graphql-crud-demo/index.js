import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

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
    students: [Student],
  }

  type Query {
    students: [Student],
    teachers: [Teacher],
    studentsbyTeacherName(name: String!): [Student]
  }

  type Res {
    success: Boolean,
    id: String
  }

  type Mutation {
    addStudent(name: String! age: Int! sex: Boolean!): Res

    updateStudent(id: String! name: String! age: Int! sex: Boolean!): Res

    deleteStudent(id: String!): Res
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
    studentsbyTeacherName: async (...args) => {
      console.log(args);
      const name = args[1].name;
      return students.filter((student) => student.name === name);
    },
  },
  Mutation: {
    addStudent: addStudent,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent,
  },
};

async function addStudent(_, { name, age, sex }) {
  students.push({
    id: students.length + 1,
    name,
    age,
    sex,
  });
}

async function updateStudent(_, { id, name, age, sex }) {
  return {
    success: true,
    id,
  };
}

async function deleteStudent(_, { id }) {
  return {
    success: true,
    id,
  };
}

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`🚀 Server ready at ${url}`);
