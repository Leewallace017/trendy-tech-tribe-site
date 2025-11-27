import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
    onNeedRefresh() {
        // Optional: Show a prompt to the user to refresh
        console.log('New content available, click on reload button to update.');
    },
    onOfflineReady() {
        console.log('App is ready to work offline.');
    },
});
