module.exports = function (api) {
  const isTest = api.env('test');
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    // Metro handles import() itself. Jest runs on Node, where an untransformed import() fails, so under
    // test it becomes a require(): the portals load lazily there too, and jest.mock still applies.
    plugins: isTest ? ['dynamic-import-node'] : [],
  };
};
