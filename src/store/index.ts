import {configureStore} from '@reduxjs/toolkit';
import timersList from './timers-slice';

const store = configureStore({
    reducer: {timers: timersList}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
