import { call, debounce, delay, put, takeLatest } from 'redux-saga/effects';
import { actionLoading } from '../../components/loading/loadingSlice';
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_DETAIL_USER,
  GET_LIST_USER,
  SEARCH_USER_BY_NAME,
  SUCCESS,
  UPDATE,
} from '../../constants/globalVariable';
import { userService } from '../../service/userService';
import { notificationAlert } from '../../utils/notifycation';
import { listUserActions } from './listUserSlice';

function* getListUser() {
  try {
    const res = yield call(() => userService.getUserList());
    const { data } = res;
    if (res.status === SUCCESS) {
      yield put(listUserActions.getUserList(data));
    }
  } catch (error) {
    console.log('Fail fetch data', error);
  }
}
export function* followGetListUser() {
  yield takeLatest(GET_LIST_USER, getListUser);
}

function* getUserDetailById(action) {
  try {
    const res = yield call(() => userService.getUserDetail(action.payload));
    if (res.status === SUCCESS) {
      yield put(listUserActions.getUserDetail(res?.data));
    }
  } catch (error) {
    console.log('Fail fetch data', error);
  }
}
export function* followGetUserDetailById() {
  yield takeLatest(GET_DETAIL_USER, getUserDetailById);
}

function* getListUserByName(action) {
  console.log(action);
  try {
    yield put(actionLoading.turnOnLoading());
    yield delay(500);
    const res = yield call(() => userService.getUserByPaginationAndSearch(action.payload.name, action.payload.skip, action.payload.limit || 10 ));
    if (res.status === SUCCESS) {
      console.log(res);
      const { data } = res;
      yield put(listUserActions.getUserList(data));
      yield put(actionLoading.turnOffLoading());
    }
  } catch (error) {
    console.log('Fail fetch data', error);
    yield put(actionLoading.turnOffLoading());
  }
}
export function* followGetListUserkByName() {
  yield debounce(500, SEARCH_USER_BY_NAME, getListUserByName);
}

function* createUser(action) {
  try {
    yield put(actionLoading.turnOnLoading());
    yield delay(500);
    const res = yield call(() => userService.createUser(action.payload));

    if (res.status === UPDATE) {
      yield put({ type: GET_LIST_USER });
      yield put(actionLoading.turnOffLoading());
      notificationAlert('success', 'Create user', 'Create user Success');
    }
  } catch (error) {
    console.log('Fail fetch data', error);
    yield put(actionLoading.turnOffLoading());
    notificationAlert('error', 'Create user', 'Create User Failed');
  }
}
export function* followCreateUser() {
  yield takeLatest(CREATE_USER, createUser);
}

function* updateUserDetail(action) {
  try {
    yield put(actionLoading.turnOnLoading());
    yield delay(1000);
    const res = yield call(() =>
      userService.updateUser(action.payload.id, action.payload.data)
    );
    console.log(res);
    if (res.status === SUCCESS) {
      yield put({ type: GET_LIST_USER });
      yield put(actionLoading.turnOffLoading());
    }
  } catch (error) {
    console.log('Fail fetch data', error);
    yield put(actionLoading.turnOffLoading());
  }
}
export function* followUpdateUserDetail() {
  yield takeLatest(UPDATE_USER, updateUserDetail);
}

function* deleteUser(action) {
  try {
    yield put(actionLoading.turnOnLoading());
    yield delay(800);
    const res = yield call(() => userService.deleteUser(action.payload));

    if (res.status === SUCCESS) {
      yield put({ type: GET_LIST_USER });
      yield put(actionLoading.turnOffLoading());
      notificationAlert('success', 'Delete User Success');
    }
  } catch (error) {
    console.log('Fail fetch data', error);
    notificationAlert('error', 'Delete User Failed');
    yield put(actionLoading.turnOffLoading());
  }
}
export function* followDeleteUser() {
  yield takeLatest(DELETE_USER, deleteUser);
}