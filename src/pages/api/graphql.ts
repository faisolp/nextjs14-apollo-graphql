import { ApolloServer } from '@apollo/server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';


const typeDefs = gql`
  type Query {
    getEmployee(id: Int!): Employee
  }

  type Employee {
    id: Int
    name: String
    position: String
  }
`;
const Employees =[
    {id:1,name:"Name1",position:"position1"},
    {id:2,name:"Name2",position:"position2"},
    {id:3,name:"Name3",position:"position3"},
]
const resolvers = {
  Query: {
    getEmployee: async (_parent: any, { id } : {id:number}) => {
      try {
        
        const result = Employees.find(item=>item.id==id)  ;
        return result;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
  },
};

const apolloServer = new ApolloServer({ 
    cache: "bounded",
    typeDefs, 
    resolvers,
 });
//devconst startServer = apolloServer.start();
/*export const config = {
    api: {
      bodyParser: false,
    },
};*/
export default startServerAndCreateNextHandler(apolloServer);
/*export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}*/

