import {FC} from 'react';
import moment from 'moment';
import {resumeTimer} from '../store/timers-slice';
import {useAppDispatch} from '../store/hooks';

interface IPlayButton {
    id: string
    timer: string
}

const PlayButton: FC<IPlayButton> = ({id, timer}) => {
    const dispatch = useAppDispatch();

    const play = (): void => {
        dispatch(resumeTimer({id, time: moment().utc().subtract(timer, 'ms').toString()}));
    };

    return (
        <button onClick={play}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
            </svg>
        </button>
    );
};

export {PlayButton};
