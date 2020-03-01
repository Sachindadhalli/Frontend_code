import {createSelector} from "reselect";

const subUsersList = state => state.subUsersList;

function getSubUserListFromResponse(data) {
  let subUsersData = {
    isLoading: true,
    subUsersList: [],
    message: '',
    activeCount: 0,
    suspendCount: 0,
    deleteCount: 0,
    tableHeaders: [],
    pageNumber: data.pageNumber,
    selectedTab: data.selectedTab,
    rowsPerPage: data.rowsPerPage
  };
  if (data.subUsersListResponse && data.subUsersListResponse.hasOwnProperty("status") && data.subUsersListResponse.status) {
    subUsersData.isLoading = data.loading;
    subUsersData.message = data.subUsersListResponse.message;
    subUsersData.subUsersList = data.subUsersListResponse.data;
    subUsersData.activeCount = data.subUsersListResponse.active;
    subUsersData.suspendCount = data.subUsersListResponse.suspended;
    subUsersData.deleteCount = data.subUsersListResponse.deleted;
    subUsersData.tableHeaders = data.subUsersListResponse.header;
  }
  return subUsersData;
}

export const getSubUsersList = createSelector(
  subUsersList,
  (subUsersListData) => ({
    subUsersData: getSubUserListFromResponse(subUsersListData)
  })
);
