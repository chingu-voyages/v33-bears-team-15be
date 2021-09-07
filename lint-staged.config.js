module.exports = {
  "*.{js,ts,json,md,yaml,yml,graphql}": ["npm run format:fix"],
  "*.{js,ts}": ["npm run lint"],
};
