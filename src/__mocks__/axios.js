const mockNoop = () => new Promise(() => {});

const exampleRoleOptions = [{ name: 'role', involves: 'something' }];

export default {
  get: jest.fn(() => Promise.resolve(exampleRoleOptions)),
  post: jest.fn(() =>
    Promise.resolve({
      postData: {
        title: '',
        description: '',
        date: '',
        start: '',
        stop: '',
        repeatedType: '',
        untilDate: '',
        address: '',
        rolesRequired: []
      }
    })
  ),
  default: mockNoop,
  put: mockNoop,
  delete: mockNoop
};
