//отслеживаем клики на глобальном документа
import * as $ from 'jquery';

function createStatistics(): object {
    let counter: number = 0;
    let isDestroyed: boolean = false;
    const listener = (): number => counter++;

    $(document).on('click', listener);

    return {
        destroy() {
            document.removeEventListener('click', listener);
            isDestroyed = true;
        },
        getClicks() {
            if (isDestroyed) return 'Statistics is destroyed';
            
            return counter;
        }
    };
}


window['statistics'] = createStatistics();