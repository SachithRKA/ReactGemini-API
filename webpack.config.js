module.exports = {
  // Your existing webpack config options...

  resolve: {
    alias: {
      "path": require.resolve("path")
    },
    fallback: {
      "path": require.resolve("path-browserify"),
      // Add other polyfills for node.js core modules if needed...
    },
  },

  // Other webpack config options...
}