import { userFixture } from "../test/user.fixture";

export const UserService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userFixture),
  index: jest.fn().mockResolvedValue([userFixture]),
  show: jest.fn().mockResolvedValue(userFixture),
});
