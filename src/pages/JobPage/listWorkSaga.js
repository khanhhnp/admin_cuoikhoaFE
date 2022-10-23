import {
  call,
  debounce,
  delay,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { actionLoading } from '../../components/loading/loadingSlice';
import {
  CREATE_JOB,
  DELETE_JOB,
  GET_ALL_TYPE_JOB,
  GET_DETAIL_JOB,
  GET_LIST_WORK,
  SEARCH_JOB_BY_NAME,
  SUCCESS,
  UPDATE,
  UPDATE_JOB,
} from '../../constants/globalVariable';
import { listWorkApi } from '../../service/listWorkService';
import { notificationAlert } from '../../utils/notifycation';
import { listWorkPageActions } from './listWorkPageSlice';

function* getListWork() {
  try {
    const res = yield call(() => listWorkApi.getListWork());
    const { data } = res;
    if (res.status === SUCCESS) {
      yield put(listWorkPageActions.getListWorkPage(data));
    }
  } catch (error) {
    console.log('Fail fetch data', error);
  }
}
export function* followGetListWork() {
  yield takeLatest(GET_LIST_WORK, getListWork);
}

function* getListWorkByName(action) {
  console.log(action);
  try {
    yield put(actionLoading.turnOnLoading());
    yield delay(500);
    const res = yield call(() =>
      listWorkApi.getWorkByName(action.payload)
    );
    if (res.status === SUCCESS) {
      console.log(res);
      const { data } = res;
      yield put(listWorkPageActions.getListWorkPage(data));
      yield put(actionLoading.turnOffLoading());
    }
  } catch (error) {
    console.log('Fail fetch data', error);
    yield put(actionLoading.turnOffLoading());
  }
}
export function* followGetListWorkByName() {
  yield debounce(500, SEARCH_JOB_BY_NAME, getListWorkByName);
}

function* getListTypeJob() {
  try {
    const res = yield call(() => listWorkApi.getlistTypeJob());
    const { data } = res;
    if (res.status === SUCCESS) {
      yield put(listWorkPageActions.getAllTypeJob(data));
    }
  } catch (error) {
    console.log('Fail fetch data', error);
  }
}
export function* followGetListTypeJob() {
  yield takeLatest(GET_ALL_TYPE_JOB, getListTypeJob);
}

function* createJob(action) {
  try {
    yield put(actionLoading.turnOnLoading());
    yield delay(500);
    const res = yield call(() =>
      listWorkApi.createJob(action.payload)
    );

    if (res.status === UPDATE) {
      yield put(listWorkPageActions.idUploadImage(res?.data?._id));
      yield put({ type: GET_LIST_WORK });
      yield put(actionLoading.turnOffLoading());
      notificationAlert(
        'success',
        'Create job',
        'Create Job Success'
      );
    }
  } catch (error) {
    console.log('Fail fetch data', error);
    yield put(actionLoading.turnOffLoading());
    notificationAlert('error', 'Create job', 'Create Job Failed');
  }
}
export function* followCreateJob() {
  yield takeLatest(CREATE_JOB, createJob);
}

function* deleteJobDetail(action) {
  try {
    yield put(actionLoading.turnOnLoading());
    yield delay(800);
    const res = yield call(() =>
      listWorkApi.deleteJob(action.payload)
    );

    if (res.status === SUCCESS) {
      yield put({ type: GET_LIST_WORK });
      yield put(actionLoading.turnOffLoading());
      notificationAlert('success', 'Delete Job Success');
    }
  } catch (error) {
    console.log('Fail fetch data', error);
    notificationAlert('error', 'Delete Job Failed');
    yield put(actionLoading.turnOffLoading());
  }
}
export function* followDeleteJobDetail() {
  yield takeLatest(DELETE_JOB, deleteJobDetail);
}

function* getWorkDetailById(action) {
  try {
    const res = yield call(() =>
      listWorkApi.getWorkDetail(action.payload)
    );

    if (res.status === SUCCESS) {
      yield put(listWorkPageActions.getWorkDetail(res?.data));
    }
  } catch (error) {
    console.log('Fail fetch data', error);
  }
}
export function* followGetJobDetailById() {
  yield takeLatest(GET_DETAIL_JOB, getWorkDetailById);
}

function* updateJobInforDetail(action) {
  try {
    yield put(actionLoading.turnOnLoading());
    yield delay(1000);
    const res = yield call(() =>
      listWorkApi.updateJobInfor(
        action.payload.id,
        action.payload.data
      )
    );
    console.log(res);
    if (res.status === SUCCESS) {
      yield put(listWorkPageActions.idUploadImage(action.payload.id));
      yield put({ type: GET_LIST_WORK });
      yield put(actionLoading.turnOffLoading());
    }
  } catch (error) {
    console.log('Fail fetch data', error);
    yield put(actionLoading.turnOffLoading());
  }
}
export function* followUpdateJobInforDetail() {
  yield takeLatest(UPDATE_JOB, updateJobInforDetail);
}
