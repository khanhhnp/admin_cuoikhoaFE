import { BaseService } from "./baseService";

class CategoryService extends BaseService {
  constructor() {
    super();
  }
  getTypeJobList = () => {
  
    return this.get(`api/type-jobs`);
  }
  addTypeJob = (typeJob) => {
  
    return this.post(`api/type-jobs`, typeJob);
  }
  updateTypeJob = (id, typeJob) => {

    return this.put(`api/type-jobs/${id}`, typeJob);
  }
  deleteTypeJob = (id) => {

    return this.delete(`api/type-jobs/${id}`);
  }

  // SubTypeJob
  addSubTypeJob = (subTypeJob) => {
    
    return this.post(`api/sub-type-jobs`, subTypeJob);
  }

  uploadImageSubTypeJob = (id, imageFile) => {
  
    return this.post(`api/sub-type-jobs/upload-image/${id}`, imageFile);
  }

  updateSubTypeJob = (id, subTypeJob) => {

    return this.put(`api/sub-type-jobs/${id}`, subTypeJob);
  }

  deleteSubTypeJob = (id) => {

    return this.delete(`api/sub-type-jobs/${id}`)
  }
}

export const categoryService = new CategoryService();
