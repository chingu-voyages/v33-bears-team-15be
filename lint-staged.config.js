module.exports = {
  "*.{js,ts,json,md,yaml,yml,graphql}": ["yarn format:fix"],
  "*.{js,ts}": ["yarn lint"],
};
