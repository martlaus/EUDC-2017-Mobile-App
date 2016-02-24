AppSettings = {
    // @if ENV == 'DEVELOPMENT'
    baseApiUrl: 'http://localhost:7070/',
    debug: true,
    // @endif
    // @if ENV == 'TEST'
    baseApiUrl: 'http://188.166.104.203:7070/'
// @endif
};