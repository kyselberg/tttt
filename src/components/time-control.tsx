import React, {useState, useEffect, useRef, FC} from 'react';
import moment from 'moment';
import {calculateTime, sQnty, useForceUpdate} from '../utils';
import {PlayButton} from './play-btn';
import {PauseButton} from './pause-btn';
import {RemoveButton} from './remove-btn';
import {changeTime, pauseTimer} from '../store/timers-slice';
import {useAppDispatch} from '../store/hooks';
import type {pauseTimeType} from '../types'

interface ITimeControl {
    id: string
    time: string
    pauseTime: pauseTimeType
}

const TimerControl: FC<ITimeControl> = ({id, time, pauseTime}) => {
    const forceUpdate = useForceUpdate();

    const [newTimer, setNewTimer] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const interval = useRef<number | undefined>(undefined);

    const dispatch = useAppDispatch();

    useEffect((): () => void => {
        interval.current = window.setInterval((): void => {
            forceUpdate();
        }, 1000);

        return (): void => {
            window.clearInterval(interval.current);
        }
    }, [pauseTime, time, forceUpdate]);

    const onPause = (): void => {
        setIsEditing(true);
        if (!pauseTime) {
            dispatch(pauseTimer({id, date: moment().utc().toString()}));
            window.clearInterval(interval.current);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => setNewTimer(e.target.value);

    const onReset = (): void => {
        setIsEditing(false);
    };

    const onSave = (e: React.KeyboardEvent): void => {
        if (e.key !== 'Enter') return;
        const newValues = newTimer.split(':');
        const seconds = newValues.reduce((acc, curr, index) => {
            const value = +curr;
            switch (index) {
                case 0:
                    return acc + value * 60 * 60;
                case 1:
                    return acc + value * 60;
                default:
                    return acc + value;
            }
        }, 0);
        dispatch(changeTime({id, newTime: moment(pauseTime).subtract(seconds, 'seconds').toString()}));
        setIsEditing(false);
    };

    return (
        <div className="timer-control">
            {isEditing ? (
                <input
                    type="time"
                    autoFocus
                    className="timer"
                    value={newTimer}
                    onBlur={onReset}
                    onChange={onChange}
                    onKeyDown={onSave}
                />
            ) : (
                <p className="timer" onClick={onPause} tabIndex={0} onKeyDown={onPause}>
                    {calculateTime(sQnty(time, pauseTime))}
                </p>
            )}
            {pauseTime ? (
                <PlayButton id={id} timer={calculateTime(sQnty(time, pauseTime))} />
            ) : (
                <PauseButton id={id} interval={interval.current} />
            )}
            <RemoveButton id={id} />
        </div>
    );
};

export {TimerControl};
