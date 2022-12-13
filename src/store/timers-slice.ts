import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';
import {timersListKey, getFromLocalStore} from '../utils';
import {TimersInitState, TimerItem} from '../types';

const initialState: TimersInitState = {
    timersList: (getFromLocalStore(timersListKey) || []).map((item: TimerItem) => {
        if (moment(item.id).isValid()) {
            const newItem = JSON.parse(JSON.stringify(item));
            newItem.startTime = item.id;
            newItem.id = nanoid();
            return newItem;
        }
        item.id = nanoid();
        return item;
    })
};

const timersSlice = createSlice({
    name: 'timers',
    initialState,
    reducers: {
        updateList: (state, action: PayloadAction<Array<TimerItem>>) => {
            state.timersList = action.payload;
        },
        addTimer: (state, action: PayloadAction<TimerItem>) => {
            state.timersList = [action.payload, ...state.timersList];
        },
        removeTimer: (state, action: PayloadAction<string>) => {
            state.timersList = state.timersList.filter(
                (timer) => timer.id !== action.payload
            );
        },
        pauseTimer: (state, action: PayloadAction<{id:string, date: string}>) => {
            state.timersList = state.timersList.map((item) => {
                if (item.id === action.payload.id) {
                    item.pauseTime = action.payload.date;
                }
                return item;
            });
        },
        resumeTimer: (state, action: PayloadAction<{id: string, time: string}>) => {
            state.timersList = state.timersList.map((item) => {
                if (item.id === action.payload.id) {
                    item.startTime = action.payload.time;
                    item.pauseTime = null;
                }
                return item;
            });
        },
        changeName: (state, action: PayloadAction<{id: string, name: string}>) => {
            state.timersList = state.timersList.map((item) => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.name.trim();
                }
                return item;
            });
        },
        changeTime: (state, action: PayloadAction<{id: string, newTime: string}>) => {
            state.timersList = state.timersList.map((item) => {
                if (item.id === action.payload.id) {
                    item.startTime = action.payload.newTime;
                }
                return item;
            });
        }
    }
});

export const {
    addTimer,
    removeTimer,
    pauseTimer,
    resumeTimer,
    changeName,
    changeTime
} = timersSlice.actions;

export default timersSlice.reducer;
