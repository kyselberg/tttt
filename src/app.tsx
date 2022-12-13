import {FC} from 'react';
import {InputField} from './components/input-field';
import {TrackerList} from './components/tracker-list';

const App: FC<{}> = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <InputField />
                <TrackerList />
            </div>
        </div>
    );
};

export {App};
