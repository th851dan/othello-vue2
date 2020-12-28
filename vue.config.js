/**
 * Watch
 *
 *  https://www.youtube.com/watch?v=15Yr-J4X34M
 *
 *  for more information about Vue and PWAs.
 */

module.exports = {
    pwa: {
        name: 'Othello Vue',
        themeColor: '#454545',
        msTileColor: '#5f9ea0',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            navigateFallback: 'index.html',
        },
        manifestOptions: {
            name: 'Othello Vue',
            short_name: 'Othello',
            start_url: '.',
            display: 'fullscreen',
        }
    }
}
