import {useAppSelector} from '../store/hooks';
import {TrackerListItem} from './timer-list-item';

const TrackerList = () => {
    const timersList = useAppSelector((state) => state.timers.timersList);

    return (
        <ul>
            {timersList.map((item) => (
                <TrackerListItem item={item} key={item.id} />
            ))}
        </ul>
    );
};

export {TrackerList};
