import {FC} from 'react';
import {useAppDispatch} from '../store/hooks';
import {removeTimer} from '../store/timers-slice';

interface IRemoveButton {id: string}

const RemoveButton: FC<IRemoveButton> = ({id}) => {
    const dispatch = useAppDispatch();

    const remove = (): void => {
        dispatch(removeTimer(id));
    };

    return (
        <button onClick={remove}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path fill="#d40101" d="M7 11v2h10v-2H7zm5-9C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
            </svg>
        </button>
    );
};

export {RemoveButton};
