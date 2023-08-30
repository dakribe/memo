import Express from 'express';

const app = Express();

app.get('/', (req, res) => {
  return res.json('Hello world');
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
