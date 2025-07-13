module.exports = {
  api: {
    input: 'http://localhost:3000/api-json', // Your NestJS OpenAPI endpoint
    output: {
      mode: 'tags-split',
      target: './src/api/generated.ts',
      schemas: './src/api/model',
      client: 'react-query',
    },
  },
};
