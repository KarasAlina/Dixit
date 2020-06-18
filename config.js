const PRODUCTION = process.env.NODE_ENV == 'production'; // eslint-disable-line

module.exports = {
	PRODUCTION: PRODUCTION,
	hmrEnabled: true,
	shouldCompressImages: PRODUCTION,
	defaultLocale: 'en-us',
};
