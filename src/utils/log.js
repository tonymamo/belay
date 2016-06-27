let _isActive = false;

export const LOG_LEVELS = {
    ERROR: 1,
    WARNING: 2,
    NORMAL: 4
};

export const configureLogger = (options) => {
    options = options || {};
    _isActive = options.isActive;
};

export const log = (message, logLevel) => {
    if (!_isActive) { return; }
    logLevel = logLevel || LOG_LEVELS.NORMAL;

    switch(logLevel) {
        case LOG_LEVELS.ERROR:
            return console.error ? console.error(message) : console.log(message);
        case LOG_LEVELS.WARNING:
            return console.warn ? console.warn(message) : console.log(message);
        case LOG_LEVELS.NORMAL:
        default:
            return console.log(message);
    }
};
