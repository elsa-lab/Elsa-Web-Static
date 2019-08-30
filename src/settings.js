// FIXME: root_url 的 Port 若要改，static server 的 Port 也要改
const settings = {
  root_url: 'http://35.229.221.5:8080',
  // root_url: 'http://127.0.0.1:3000',
  backend_url: 'http://35.201.173.113:8080',
  // backend_url: 'http://127.0.0.1:8000',
  root_user_types: ['College', 'Master', 'PHD', 'Teacher'],
  all_user_types: [
    'course_student',
    'College',
    'Master',
    'PHD',
    'Teacher',
    'Alumni',
  ],
};

export default settings;
