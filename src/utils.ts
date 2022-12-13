import moment from 'moment';
import {useCallback, useState} from 'react';
import {pauseTimeType} from './types';

export const timersListKey = 'timersList';

export const isLSAvailable = (): boolean => {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
};

export const saveToLocalStore = (item: any, key: string): void => {
    try {
        localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        console.error(error);
    }
};

export const getFromLocalStore = (key: string): Array<any> => {
    try {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
        return [];
    } catch (e) {
        return [];
    }
}

const pad = (n: number, z: number = 2): string => {
    return ('00' + n).slice(-z);
};

export const calculateTime = (s: number): string => {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
}

export const sQnty = (time: string, pauseTime: pauseTimeType): number => pauseTime
    ? moment(pauseTime).utc().diff(moment(time))
    : moment().utc().diff(moment(time));

const createNewObject = () => ({});

export const useForceUpdate = () => {
    const [, setValue] = useState(createNewObject);

    return useCallback((): void => {
        setValue(createNewObject());
    }, []);
};
