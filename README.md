### react应用的路由切换动画

react-transition-group 是新版的是路由，旧版的 ReactCSSTransitionGroup 官方已经不再维护,以下是官方说明。
新版的动画组件比旧版的操作更加简明。强力推荐直接使用新版动画组件

>ReactTransitionGroup and ReactCSSTransitionGroup have been moved to the react-transition-group package that is maintained by the
community. Its 1.x branch is completely API-compatible with the existing addons.
Please file bugs and feature requests in the new repository.

[动画组件文档](https://reactcommunity.org/react-transition-group/#Transition-prop-addEndListener)

[路由组件文档](https://reacttraining.com/react-router/web/guides/quick-start)


直接上代码

```
//index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  // 这个动画是页面首次加载的动画，一定要用 TransitionGroup 包着 CSSTransition，
  // 动画才有效，理由我不知道，反正不包着不生效。
  <TransitionGroup>
    <CSSTransition
      appear={true}
      classNames="appAppear"
      timeout={500}
    >
      <App/>
    </CSSTransition>
  </TransitionGroup>,
  document.getElementById('root')
);
registerServiceWorker();

```

```
//app.js

import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter ,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css'

const AnimationExample = () => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <div style={styles.fill}>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/hsl/10/90/50" />}
          />

          <ul style={styles.nav}>
            <NavLink to="/hsl/10/90/50">Red</NavLink>
            <NavLink to="/hsl/120/100/40">Green</NavLink>
            <NavLink to="/rgb/33/150/243">Blue</NavLink>
            <NavLink to="/rgb/240/98/146">Pink</NavLink>
          </ul>

          <div style={styles.content}>
            // 和平时使用动画组件没啥区别，在渲染的路由的地方加一个用动画组件包住，并添加css属性即可；
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={800}
              >
                <Switch location={location}>
                  <Route exact path="/hsl/:h/:s/:l" component={HSL} />
                  <Route exact path="/rgb/:r/:g/:b" component={RGB} />
                  <Route render={() => <div>Not Found</div>} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      )}
    />
  </BrowserRouter>
);

const NavLink = props => (
  <li style={styles.navItem}>
    <Link {...props} style={{ color: "inherit" }} />
  </li>
);

const HSL = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.hsl,
      background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
    }}
  >
    hsl({params.h}, {params.s}%, {params.l}%)
  </div>
);

const RGB = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.rgb,
      background: `rgb(${params.r}, ${params.g}, ${params.b})`
    }}
  >
    rgb({params.r}, {params.g}, {params.b})
  </div>
);

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};

styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

export default AnimationExample;

```

```
//App.css

.appAppear-appear{
  opacity: 0;
  z-index: 1;
  transform: scale(0);
}

.appAppear-appear.appAppear-appear-active{
  opacity: 1;
  transform: scale(1);
  transition: 500ms ease-out;
}

.fade-enter {
  opacity: 0;
  z-index: 1;
  transform: scale(0);
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: 800ms ease-out;
  transform-origin: top left;
}

.fade-exit{
  opacity: 1;
  transform: scale(1);
}

.fade-exit.fade-exit-active{
  opacity:0;
  transform: scale(0);
  transition: 800ms ease-out;
}

```
