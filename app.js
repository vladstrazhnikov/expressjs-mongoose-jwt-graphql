import express, { json } from 'express';
import authRouter from './routes/auth.route.js';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schemas.js';
import { connectDB } from './database/index.js';

const app = express();

connectDB();

app.use(json());
app.use('/auth', authRouter);
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server has started on port ${PORT}`);
}).on('error', (err) => {
    console.log('Error starting server: ', err.message);
});

