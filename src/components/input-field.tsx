import React, {useState, FC} from 'react';
import {nanoid} from '@reduxjs/toolkit';
import moment from 'moment';
import {addTimer} from '../store/timers-slice';
import {useAppDispatch} from '../store/hooks';
import {TimerItem} from '../types';

const InputField: FC<{}> = () => {
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => setValue(e.target.value);

    const addItemToList = (event: React.MouseEvent | React.KeyboardEvent): void => {
        if ((event as React.KeyboardEvent).key && (event as React.KeyboardEvent).key !== 'Enter') return;

        const utcMoment = moment().utc();

        const newTimer: TimerItem = {
            id: nanoid(),
            title: value.trim() || utcMoment.format('LL'),
            startTime: utcMoment.toString(),
            pauseTime: null
        };

        dispatch(addTimer(newTimer));
        setValue('');
    };

    return (
        <div className="input-group">
            <input
                onKeyDown={addItemToList}
                value={value}
                onChange={onChange}
                placeholder="Enter tracker name"
                type="text"
            />
            <button onClick={addItemToList}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" aria-hidden="true">
                    <rect width="100" height="100" className="a"/>
                    <path d="M0 0h24v24H0z" className="a"/>
                    <path d="M8 5v14l11-7z" fill="#fff"/>
                </svg>
            </button>
        </div>
    );
};

export {InputField};
