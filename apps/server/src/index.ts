import Express from 'express';
import userRoutes from './user/user.route';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => {
  return res.json('Hello world');
});

app.use('/api/users', userRoutes);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
