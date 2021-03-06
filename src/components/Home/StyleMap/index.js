import BackgroundCourses from '../../static/home/Courses.jpg';
import BackgroundHome from '../../static/home/delta.jpg';
import BackgroundNews from '../../static/home/News.jpg';
import BackgroundProjects from '../../static/home/Projects.jpg';
import BackgroundPublications from '../../static/home/Publications.jpg';
import {
  backgroundColorCourses,
  backgroundColorInvertCourses,
  bigTitleCourses,
  medContentCourses,
  otherColorCourses,
  smallContentCourses,
} from '../content/courseContent';
import {
  backgroundColorHome,
  backgroundColorInvertHome,
  bigTitleHome,
  medContentHome,
  otherColorHome,
  smallContentHome,
} from '../content/homeContent';
import {
  backgroundColorInvertNews,
  backgroundColorNews,
  bigTitleNews,
  medContentNews,
  otherColorNews,
  smallContentNews,
} from '../content/newContent';
import {
  backgroundColorInvertProjects,
  backgroundColorProjects,
  bigTitleProjects,
  medContentProjects,
  otherColorProjects,
  smallContentProjects,
} from '../content/projectContent';
import {
  backgroundColorInvertPublications,
  backgroundColorPublications,
  bigTitlePublications,
  medContentPublications,
  otherColorPublications,
  smallContentPublications,
} from '../content/publicationContent';

export const backgroundImageMap = [
  BackgroundHome,
  BackgroundCourses,
  BackgroundPublications,
  BackgroundProjects,
  BackgroundNews,
];

export const backgroundColorMap = [
  backgroundColorHome,
  backgroundColorCourses,
  backgroundColorPublications,
  backgroundColorProjects,
  backgroundColorNews,
];

export const backgroundColorInvertMap = [
  backgroundColorInvertHome,
  backgroundColorInvertCourses,
  backgroundColorInvertPublications,
  backgroundColorInvertProjects,
  backgroundColorInvertNews,
];

export const otherColorMap = [
  otherColorHome,
  otherColorCourses,
  otherColorPublications,
  otherColorProjects,
  otherColorNews,
];

export const smallContentMap = [
  smallContentHome,
  smallContentCourses,
  smallContentPublications,
  smallContentProjects,
  smallContentNews,
];

export const bigTitleMap = [
  bigTitleHome,
  bigTitleCourses,
  bigTitlePublications,
  bigTitleProjects,
  bigTitleNews,
];

export const medContentMap = [
  medContentHome,
  medContentCourses,
  medContentPublications,
  medContentProjects,
  medContentNews,
];

export const medColorMap = ['#a9a9a9', 'white', 'white', 'white', 'white'];
