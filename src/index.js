import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import Template from './Template';
import Home from './components/Home';
import About from './components/About';
import Courses from './components/Courses';
import CourseContent from './components/Courses/CourseContent';
import PdfPage from './components/Courses/CourseContent/PdfPage';
import Publications from './components/Publications';
import SingleProjectPage from './components/SingleProjectPage';
import Projects from './components/Projects';
import News from './components/News';
import NewContent from './components/News/NewContent';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Account from './components/Account';
import userIndex from './components/Manage/Users/Index/Index';
import courseIndex from './components/Manage/Courses/Index/Index';
import courseNew from './components/Manage/Courses/New/New';
import courseShow from './components/Manage/Courses/Show/Show';
import courseEdit from './components/Manage/Courses/Edit/Edit';
import contentNew from './components/Manage/Courses/Content/New/New';
import contentShow from './components/Manage/Courses/Content/Show/Show';
import contentEdit from './components/Manage/Courses/Content/Edit/Edit';
import lectureNew from './components/Manage/Courses/Content/Lecture/New/New';
import lectureShow from './components/Manage/Courses/Content/Lecture/Show/Show';
import lectureEdit from './components/Manage/Courses/Content/Lecture/Edit/Edit';
import publicationIndex from './components/Manage/Publications/Index/Index';
import publicationNew from './components/Manage/Publications/New/New';
import publicationShow from './components/Manage/Publications/Show/Show';
import publicationEdit from './components/Manage/Publications/Edit/Edit';
import newsIndex from './components/Manage/News/Index/Index';
import newsNew from './components/Manage/News/New/New';
import newsShow from './components/Manage/News/Show/Show';
import newsEdit from './components/Manage/News/Edit/Edit';

// router setting
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Template}>
      <IndexRoute component={Home} />
      <Route exact path="/" component={Home} />
      <Route path="/courses" component={Courses} />
      <Route
        path="/courses(/:course_id)"
        component={CourseContent}
      />
      <Route
        path="/courses(/:course_id)/lectures(/:lecture_id)"
        component={PdfPage}
      />
      <Route path="/publications" component={Publications} />
      <Route path="/projects" component={Projects} />
      <Route path="/project(/:name)" component={SingleProjectPage} />
      <Route path="/news" component={News} />
      <Route path="/news(/:news_id)" component={NewContent} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/account" component={Account} />
      <Route path="/management" component={userIndex} />
      <Route path="/management/users" component={userIndex} />
      <Route path="/management/news" component={newsIndex} />
      <Route path="/management/news/new" component={newsNew} />
      <Route path="/management/news/:news_id" component={newsShow} />
      <Route path="/management/news/:news_id/edit" component={newsEdit} />
      <Route path="/management/publications" component={publicationIndex} />
      <Route path="/management/publications/new" component={publicationNew} />
      <Route
        path="/management/publications/:publication_id"
        component={publicationShow}
      />
      <Route
        path="/management/publications/:publication_id/edit"
        component={publicationEdit}
      />
      <Route path="/management/courses" component={courseIndex} />
      <Route path="/management/course/new" component={courseNew} />
      <Route
        path="/management/courses/:course_id/edit"
        component={courseEdit}
      />
      <Route path="/management/courses/:course_id" component={courseShow} />
      <Route
        path="/management/courses/:course_id/contents/new"
        component={contentNew}
      />
      <Route
        path="/management/courses(/:course_id)/contents(/:content_id)"
        component={contentShow}
      />
      <Route
        path="/management/courses(/:course_id)/contents(/:content_id)/edit"
        component={contentEdit}
      />
      <Route
        path="/management/courses(/:course_id)/contents(/:content_id)/lectures/new"
        component={lectureNew}
      />
      <Route
        path="/management/courses(/:course_id)/contents(/:content_id)/lectures(/:lecture_id)/edit"
        component={lectureEdit}
      />
      <Route
        path="/management/courses(/:course_id)/contents(/:content_id)/lectures(/:lecture_id)"
        component={lectureShow}
      />
    </Route>
  </Router>,
  document.getElementById('app')
);
