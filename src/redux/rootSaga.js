import { all, call } from 'redux-saga/effects';
import {
  followCreateJob,
  followDeleteJobDetail,
  followGetJobDetailById,
  followGetListTypeJob,
  followGetListWork,
  followGetListWorkByName,
  followUpdateJobInforDetail,
} from '../pages/JobPage/listWorkSaga';

import {
  followGetListUser,
  followGetUserDetailById,
  followCreateUser,
  followUpdateUserDetail,
  followDeleteUser,
  followGetListUserkByName,
} from '../pages/userPage/listUserSaga';

export function* rootSaga() {
  yield all([
    call(followGetListWork),
    call(followGetListWorkByName),
    call(followGetListTypeJob),
    call(followCreateJob),
    call(followDeleteJobDetail),
    call(followGetJobDetailById),
    call(followUpdateJobInforDetail),
    call(followGetListUser),
    call(followGetUserDetailById),
    call(followCreateUser),
    call(followUpdateUserDetail),
    call(followDeleteUser),
    call(followGetListUserkByName),
  ]);
}
