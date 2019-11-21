import Api from '@/services/Api';

export default {
  register(credentials) {
    return Api().post('register', credentials);
  },
};

// AuthenticationService.register({
//   email: 'isntlazy@gmail.com',
//   password: '1245',
// });
