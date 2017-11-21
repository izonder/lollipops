module.exports = () => {
    return require(`./${process.env.NODE_ENV}`); //eslint-disable-line global-require
};
