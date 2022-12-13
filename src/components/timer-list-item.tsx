import React, {FC, useState} from 'react';
import {TimerControl} from './time-control';
import {changeName} from '../store/timers-slice';
import {TimerItem} from '../types';
import {useAppDispatch} from '../store/hooks';

interface ITrackerListItem {
    item: TimerItem
}

const TrackerListItem: FC<ITrackerListItem> = ({item: {id, title, pauseTime, startTime}}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>(title);

    const dispatch = useAppDispatch();

    const onEdit = (): void => setIsEditing(true);

    const onSave = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            dispatch(changeName({id, name: name.trim()}));
        }
    };

    const onReset = (): void => {
        setIsEditing(false);
        setName(title);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => setName(e.target.value);

    return (
        <li>
            {isEditing ? (
                <input
                    className="name"
                    type="text"
                    value={name}
                    autoFocus
                    onChange={onChange}
                    onKeyDown={onSave}
                    onBlur={onReset}
                />
            ) : (
                <p className="name" tabIndex={0} onClick={onEdit}>
                    {title}
                </p>
            )}
            <TimerControl id={id} time={startTime} pauseTime={pauseTime} />
        </li>
    );
};

export {TrackerListItem};
