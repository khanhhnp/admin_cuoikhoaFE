import { BaseService } from './baseService';
class ListWork extends BaseService {
  constructor() {
    super();
  }
  getListWork = () => {
    return this.get(`api/jobs`);
  };
  getWorkDetail = (id) => {
    return this.getById('api/jobs/', id);
  };
  getWorkByName = (nameJob) => {
    return this.getByName(`api/jobs/by-name?name=${nameJob}`);
  };
  getlistTypeJob = () => {
    return this.get('api/type-jobs');
  };
  createJob = (job) => {
    return this.post('api/jobs', job);
  };
  updateImageJob = (id, data) => {
    return this.post(`api/jobs/upload-image/${id}`, data);
  };
  deleteJob = (id) => {
    return this.delete(`api/jobs/${id}`);
  };
  updateJobInfor = (id, data) => {
    return this.put(`api/jobs/${id}`, data);
  };
}

export const listWorkApi = new ListWork();
