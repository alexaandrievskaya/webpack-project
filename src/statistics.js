//отслеживаем клики на глобальном документа
function createStatistics() {
    let counter = 0;
    let isDestroyed = false;
    const listener = () => counter++;

    document.addEventListener('click', listener);

    return {
        destroy() {
            document.removeEventListener('click', listener);
            isDestroyed = true;
        },

        getClicks() {
            if(isDestroyed) return 'Statistics is destroyed';
            return counter;
        },
    }
}

window.stat = createStatistics();