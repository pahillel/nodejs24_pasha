function logger(name) {
    return {
        info: (...payload) => {
            console.log(`${name}:`, ...payload)
        },
        warn: (...payload) => {
            console.warn(`${name}:`, ...payload)
        },
        error: (...payload) => {
            console.error(`${name}:`, ...payload)
        }
    }
}

module.exports = logger;