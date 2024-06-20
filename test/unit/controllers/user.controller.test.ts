import { UserController } from '../../../src/controllers';
import { DataHolder } from '../../../src/data-holder';
import { UserDto } from '../../../src/dto';

jest.mock('../../../src/data-holder');

describe('User controller test suite', () => {
  let userController: UserController;

  const defaultUserMock: UserDto = {
    id: '1',
    username: 'test',
    bio: 'test',
  };

  let requestMock: any;

  beforeEach(() => {
    userController = new UserController();
    requestMock = {
      method: '',
      path: {
        id: '1'
      },
      body: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Successfully getting user list', async () => {
    DataHolder.getUsers = jest.fn().mockReturnValue([defaultUserMock]);
    const response = await userController.getList(requestMock);

    expect(DataHolder.getUsers).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([defaultUserMock]);
  });

  test('Getting a non-existing user by ID returns 404', async () => {
    DataHolder.getUser = jest.fn().mockReturnValue(null);
    const response = await userController.getById(requestMock);

    expect(DataHolder.getUser).toBeCalledWith(requestMock.path.id);
    expect(response.statusCode).toBe(404);
  });

  test('Getting an existing user by ID returns 200', async () => {
    DataHolder.getUser = jest.fn().mockReturnValue(defaultUserMock);
    const response = await userController.getById(requestMock);

    expect(DataHolder.getUser).toBeCalledWith(requestMock.path.id);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(defaultUserMock);
  });

  test('Creating an existing user returns 409', async () => {
    DataHolder.isUsernameFree = jest.fn().mockReturnValue(false);
    const response = await userController.create(requestMock);

    expect(DataHolder.isUsernameFree).toBeCalledWith(requestMock.body.username);
    expect(response.statusCode).toBe(409);
  });

  test('Creating a new user returns 201', async () => {
    DataHolder.isUsernameFree = jest.fn().mockReturnValue(true);
    DataHolder.signUp = jest.fn().mockReturnValue(defaultUserMock);
    const response = await userController.create(requestMock);

    expect(DataHolder.isUsernameFree).toBeCalledWith(requestMock.body.username);
    expect(DataHolder.signUp).toBeCalledWith(requestMock.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(defaultUserMock);
  });

  test('Updating an existing user returns 200', async () => {
    DataHolder.getUser = jest.fn().mockReturnValue(defaultUserMock);
    requestMock.body = defaultUserMock;
    const response = await userController.update(requestMock);

    expect(DataHolder.getUser).toBeCalledWith(requestMock.path.id);
    expect(DataHolder.setUser).toBeCalledWith(requestMock.path.id, requestMock.body);
    expect(response.statusCode).toBe(200);
  });

  test('Updating a non-existing user returns 404', async () => {
    DataHolder.getUser = jest.fn().mockReturnValue(null);
    const response = await userController.update(requestMock);

    expect(DataHolder.getUser).toBeCalledWith(requestMock.path.id);
    expect(response.statusCode).toBe(404);
  });
});
