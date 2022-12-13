import {FC} from 'react';
import moment from 'moment';
import {pauseTimer} from '../store/timers-slice';
import {useAppDispatch} from '../store/hooks';

interface IPauseButton {
    id: string
    interval: number | undefined
}

const PauseButton: FC<IPauseButton> = ({id, interval}) => {
    const dispatch = useAppDispatch();

    const pause = (): void => {
        dispatch(pauseTimer({id, date: moment().utc().toString()}));
        window.clearInterval(interval);
    };

    return (
        <button onClick={pause}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16h2V8H9v8zm3-14C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm1-4h2V8h-2v8z"/>
            </svg>
        </button>
    );
};

export {PauseButton};
