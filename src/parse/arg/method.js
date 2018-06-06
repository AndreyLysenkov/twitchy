module.exports = (method) => {
    return {
        prime: method.prime,
        tier: method.plan / 1000,
        name: method.planName
    };
};