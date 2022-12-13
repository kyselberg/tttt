export type pauseTimeType = string | null;

export interface TimerItem {
    id: string
    startTime: string
    pauseTime: pauseTimeType
    title: string

}

export interface TimersInitState {
    timersList: Array<TimerItem>
}
