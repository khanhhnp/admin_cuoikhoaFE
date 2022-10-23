import { BaseService } from "./baseService";
class UserService extends BaseService {
  constructor() {
    super();
  }
  getUserList = () => {
    return this.get(`api/users`);
  };
  createUser = (user) => {
    return this.post("api/users", user);
  };
  getUserDetail = (id) => {
    return this.getById("api/users/", id);
  };
  updateUser = (id, user) => {
    return this.put(`api/users/${id}`, user);
  };
  deleteUser = (id) => {
    return this.delete(`api/users/${id}`);
  };
  uploadAvatar = (avatar) => {
    return this.post(`api/users/upload-avatar`, avatar);
  };
  getUserByPaginationAndSearch = (name, skip, limit) => {
    return this.get(`api/users/pagination-search?name=${name}&skip=${skip}&limit=${limit}`);
  };
}
export const userService = new UserService();
