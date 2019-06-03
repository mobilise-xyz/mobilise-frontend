const mockNoop = () => new Promise(() => {});

export default {
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
