const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Asegura que resolver existe
config.resolver = config.resolver || {};
config.resolver.sourceExts = config.resolver.sourceExts || [];
config.resolver.sourceExts.push("sql");

// Asegura que transformer existe y agrega el plugin de assets
config.transformer = config.transformer || {};
config.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

module.exports = config;
