import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink as Link
} from 'react-router-dom';
import NewPerson from "./components/settings/people/new-person";
import Sidebar from "./components/sidebar";
import "./scss/style.scss";

import GridView, { GridViewToolbar } from "./components/views/grid";
import TableView from "./components/views/table";
import { PeopleContext } from './contexts/people-context';
import { ColorCodingContext } from './contexts/color-coding-context';
import { useState } from 'react';
import classNames from 'classnames';

interface View {
    name: string;
    id: string;
    component: () => React.ReactElement;
    toolbarView?: () => React.ReactElement;
}

const views: View[] = [
    {
        name: 'Table View',
        id: 'table',
        component: TableView
    },
    {
        name: 'World View',
        id: 'world',
        component() {
            return (
                <div />
            )
        }
    },
    {
        name: 'Grid View',
        id: 'grid',
        component: GridView,
        toolbarView: GridViewToolbar
    }
];

function ViewToolbarHost() {
    const [ expanded, setExpanded ] = useState(false);

    return (
        <Switch>
            {views.map(({ id, toolbarView: ToolbarView }) => ToolbarView ? (
                <Route key={id} path={`/view/${id}`}>
                    {
                        expanded ? (
                            <ToolbarView />
                        ) : null
                    }
                    <div className={classNames("switcher-item", { active: expanded })} onClick={() => setExpanded(!expanded)}>Settings</div>
                </Route>
            ) : null)}
        </Switch>
    )
}

export default function App() {
    return (
        <Router>
            <>
                <div className="view-switcher">
                    {views.map(({ id, name }) => (
                        <Link key={id} className="switcher-item" to={`/view/${id}`}>{name}</Link>
                    ))}
                    <div className="switcher-spacer" />
                    <ViewToolbarHost />
                    <ColorCodingContext.Consumer>
                        {({ autocolor }) => (
                            <div className="switcher-item" onClick={() => autocolor()}>
                                Color by Timezone
                            </div>
                        )}
                    </ColorCodingContext.Consumer>
                    {/* <Link to="/people/new" className="switcher-item">
                        New Person
                    </Link> */}
                </div>
                <Sidebar />
                <Switch>
                    {views.map(({ id, component: Component }) => (
                        <Route key={id} path={`/view/${id}`}>
                            <Component />
                        </Route>
                    ))}
                    {/* <Route path="/people/new">
                        <NewPerson />
                    </Route> */}
                </Switch>
            </>
        </Router>
    )
}