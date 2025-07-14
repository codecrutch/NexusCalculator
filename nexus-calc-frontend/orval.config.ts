export default {
  api: {
    input: 'http://localhost:3000/api-json',
    output: {
      mode: 'tags-split',
      target: 'src/generated/generated.ts',
      schemas: 'src/generated/models',
      client: 'react-query',
      mock: true,
      baseUrl: 'http://localhost:3000',
    },
  },
};
