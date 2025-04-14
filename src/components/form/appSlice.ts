import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@crew/apis/app/models/login/response'
import { TenantSettingMember } from '@crew/apis/tenantSetting/models/getTenantSettingMembers/response'
import {
  Bookmark,
  Favorite,
  File,
  Filter,
  Folder,
  Project,
  Event,
  EventAttendee,
  EventRecording,
  EventKind,
  ProjectGroup,
  ProjectMember,
  ProjectMemberCost,
  Task,
  TaskComment,
  TaskDependency,
  TaskState,
  TaskKind,
  TaskWork,
  PresenceState,
} from '@crew/models/domain'

import { UpdateTenantSettingsRequest } from '@crew/apis/setting/models/updateTenantSettings/request'
import { UpdateRolesRequest } from '@crew/apis/role/models/updateRoles/request'
import { UserSetting as UserSettingType } from '@crew/apis/setting/models/updateUserEmailAddress/request'
import { ContractPlan } from '@crew/enums/app'
import { AppTheme, NotifyEventType } from 'enums/app'
import { LocalStorageKeys } from 'enums/system'
import { RootState } from 'states/store'
import { ACTION_RESET_STATE } from 'configs/constants'

type UserPresenceState = {
  presenceStateId: string
  presenceStateMessage: string | null
}

export type ObjectEventMessage<T> = {
  eventType: NotifyEventType
  id: string
  object: Partial<T> | undefined
}

const isAppTheme = (v: any): v is AppTheme =>
  typeof v == 'string' && v in Object.values(AppTheme)

const stringToColorMode = (v: string | null) =>
  isAppTheme(v) ? v : AppTheme.Light

const stringToUser = (v: string | null): User => (v ? JSON.parse(v) : undefined)

type AppStateType = {
  currentTheme: AppTheme
  leftSideBarOpened: boolean
  rightSideBarOpened: boolean
  isRightSideBarLargeWidth: boolean
  loggedInUser?: User | null
  projectEventMessage: ObjectEventMessage<Project> | null
  eventEventMessage: ObjectEventMessage<Event> | null
  projectTaskEventMessage: ObjectEventMessage<Task> | null
  taskKindEventMessage: ObjectEventMessage<TaskKind> | null
  eventKindEventMessage: ObjectEventMessage<EventKind> | null
  taskStateEventMessage: ObjectEventMessage<TaskState> | null
  taskCommentEventMessage: ObjectEventMessage<TaskComment> | null
  taskWorkEventMessage: ObjectEventMessage<TaskWork> | null
  taskEventMessage: ObjectEventMessage<Task> | null
  bookmarkEventMessage: ObjectEventMessage<Bookmark> | null
  favoriteEventMessage: ObjectEventMessage<Favorite> | null
  fileEventMessage: ObjectEventMessage<File> | null
  projectGroupEventMessage: ObjectEventMessage<ProjectGroup> | null
  eventRecordingEventsMessage: ObjectEventMessage<EventRecording> | null
  tenantSettingUserEventMessage: ObjectEventMessage<TenantSettingMember> | null
  projectSettingMemberEventMessage: ObjectEventMessage<ProjectMember> | null
  projectSettingEventCategoryEventMessage: ObjectEventMessage<void> | null
  projectSettingTaskCategoryEventMessage: ObjectEventMessage<void> | null
  eventAttendeeEventMessage: ObjectEventMessage<EventAttendee> | null
  currentPlan: ContractPlan
  myAccountEventMessage: ObjectEventMessage<UserSettingType> | null
  roleEventMessage: ObjectEventMessage<UpdateRolesRequest> | null
  tenantSettingEventMessage: ObjectEventMessage<UpdateTenantSettingsRequest> | null
  directChannelEventMessage: ObjectEventMessage<Project> | null
  filterEventMessage: ObjectEventMessage<Filter> | null
  taskDependencyEventMessage: ObjectEventMessage<TaskDependency> | null
  projectDetailSettingMemberUnitPriceEventMessage: ObjectEventMessage<ProjectMemberCost> | null
  folderEventMessage: ObjectEventMessage<Folder> | null
  rightSideBarSelectedMessageId: string | undefined
  presenceEventMessage: ObjectEventMessage<PresenceState> | null
  userPresences: Record<string, UserPresenceState>
  personalProjectSettingEventMessage: ObjectEventMessage<Project> | null
}

const initialAppState: AppStateType = {
  currentTheme: stringToColorMode(localStorage.getItem(LocalStorageKeys.Theme)),
  leftSideBarOpened: true,
  rightSideBarOpened: true,
  isRightSideBarLargeWidth: false,
  loggedInUser: stringToUser(
    localStorage.getItem(LocalStorageKeys.LoggedInUser)
  ),
  projectEventMessage: null,
  eventEventMessage: null,
  projectTaskEventMessage: null,
  taskKindEventMessage: null,
  eventKindEventMessage: null,
  taskStateEventMessage: null,
  taskCommentEventMessage: null,
  taskWorkEventMessage: null,
  taskEventMessage: null,
  bookmarkEventMessage: null,
  favoriteEventMessage: null,
  fileEventMessage: null,
  projectGroupEventMessage: null,
  eventRecordingEventsMessage: null,
  tenantSettingUserEventMessage: null,
  projectSettingMemberEventMessage: null,
  projectSettingEventCategoryEventMessage: null,
  projectSettingTaskCategoryEventMessage: null,
  eventAttendeeEventMessage: null,
  myAccountEventMessage: null,
  roleEventMessage: null,
  tenantSettingEventMessage: null,
  directChannelEventMessage: null,
  currentPlan: ContractPlan.Standard,
  filterEventMessage: null,
  taskDependencyEventMessage: null,
  projectDetailSettingMemberUnitPriceEventMessage: null,
  folderEventMessage: null,
  rightSideBarSelectedMessageId: undefined,
  presenceEventMessage: null,
  userPresences: {} as Record<string, UserPresenceState>,
  personalProjectSettingEventMessage: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    changeTheme: (state, action: PayloadAction<AppTheme>) => {
      state.currentTheme = action.payload
      localStorage.setItem(LocalStorageKeys.Theme, state.currentTheme)
    },

    closeLeftSideBar: (state) => {
      state.leftSideBarOpened = false
    },
    toggleLeftSideBar: (state) => {
      state.leftSideBarOpened = !state.leftSideBarOpened
    },

    // 右サイドバー操作
    toggleRightSideBar: (state) => {
      state.rightSideBarOpened = !state.rightSideBarOpened
    },
    toggleIsRightSideBarLargeWidth: (state) => {
      state.isRightSideBarLargeWidth = !state.isRightSideBarLargeWidth
    },
    setLoggedInUser: (state, action: PayloadAction<User>) => {
      state.loggedInUser = action.payload
      localStorage.setItem(
        LocalStorageKeys.LoggedInUser,
        JSON.stringify(state.loggedInUser)
      )
    },
    setLoggedOutUser: (state) => {
      state.loggedInUser = null
      localStorage.removeItem(LocalStorageKeys.LoggedInUser)
    },
    notifyProjectEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Project>>
    ) => {
      state.projectEventMessage = action.payload
    },
    notifyEventEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Event>>
    ) => {
      state.eventEventMessage = action.payload
    },
    notifyProjectTaskEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Task>>
    ) => {
      state.projectTaskEventMessage = action.payload
    },
    notifyTaskKindEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<TaskKind>>
    ) => {
      state.taskKindEventMessage = action.payload
    },
    notifyEventKindEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<EventKind>>
    ) => {
      state.eventKindEventMessage = action.payload
    },
    notifyTaskStateEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<TaskState>>
    ) => {
      state.taskStateEventMessage = action.payload
    },
    notifyTaskCommentEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<TaskComment>>
    ) => {
      state.taskCommentEventMessage = action.payload
    },
    notifyTaskWorkEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<TaskWork>>
    ) => {
      state.taskWorkEventMessage = action.payload
    },
    notifyTaskEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Task>>
    ) => {
      state.taskEventMessage = action.payload
    },
    notifyBookmarkEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Bookmark>>
    ) => {
      state.bookmarkEventMessage = action.payload
    },
    notifyFavoriteEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Favorite>>
    ) => {
      state.favoriteEventMessage = action.payload
    },
    notifyFileEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<File>>
    ) => {
      state.fileEventMessage = action.payload
    },
    notifyProjectGroupEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<ProjectGroup>>
    ) => {
      state.projectGroupEventMessage = action.payload
    },
    notifyEventRecordingEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<EventRecording>>
    ) => {
      state.eventRecordingEventsMessage = action.payload
    },
    notifyTenantSettingUserEventMessageEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<TenantSettingMember>>
    ) => {
      state.tenantSettingUserEventMessage = action.payload
    },
    notifyProjectSettingMemberEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<ProjectMember>>
    ) => {
      state.projectSettingMemberEventMessage = action.payload
    },
    notifyProjectSettingEventCategoryEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<void>>
    ) => {
      state.projectSettingEventCategoryEventMessage = action.payload
    },
    notifyProjectSettingTaskCategoryEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<void>>
    ) => {
      state.projectSettingTaskCategoryEventMessage = action.payload
    },
    notifyEventAttendeeEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<EventAttendee>>
    ) => {
      state.eventAttendeeEventMessage = action.payload
    },
    updateLoggedInUserDisplayName: (state, action: PayloadAction<string>) => {
      if (state.loggedInUser) {
        state.loggedInUser = {
          ...state.loggedInUser,
          displayName: action.payload,
        }
      }
    },
    updateLoggedInUserAvatar: (state, action: PayloadAction<string>) => {
      if (state.loggedInUser) {
        state.loggedInUser = {
          ...state.loggedInUser,
          avatarUrl: action.payload,
        }
      }
    },
    // set current plan contract
    setCurrentPlan: (state, action: PayloadAction<ContractPlan>) => {
      state.currentPlan = action.payload
    },
    notifyMyAccountEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<UserSettingType>>
    ) => {
      state.myAccountEventMessage = action.payload
    },
    notifyRoleEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<UpdateRolesRequest>>
    ) => {
      state.roleEventMessage = action.payload
    },
    notifyTenantSettingEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<UpdateTenantSettingsRequest>>
    ) => {
      state.tenantSettingEventMessage = action.payload
    },
    notifyDirectChannelEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Project>>
    ) => {
      state.directChannelEventMessage = action.payload
    },
    notifyFilterEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Filter>>
    ) => {
      state.filterEventMessage = action.payload
    },
    notifyTaskDependencyEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<TaskDependency>>
    ) => {
      state.taskDependencyEventMessage = action.payload
    },
    notifyProjectDetailSettingMemberUnitPriceEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<ProjectMemberCost>>
    ) => {
      state.projectDetailSettingMemberUnitPriceEventMessage = action.payload
    },
    notifyFolderEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Folder>>
    ) => {
      state.folderEventMessage = action.payload
    },
    setRightSideBarSelectedMessageId: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.rightSideBarSelectedMessageId = action.payload
    },
    notifyPresenceEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<PresenceState>>
    ) => {
      state.presenceEventMessage = action.payload
    },
    updateUserPresences: (
      state,
      action: PayloadAction<{ userId: string; presence: UserPresenceState }>
    ) => {
      state.userPresences = {
        ...state.userPresences,
        [action.payload.userId]: action.payload.presence,
      }
    },
    notifyPersonalProjectSettingEvent: (
      state,
      action: PayloadAction<ObjectEventMessage<Project>>
    ) => {
      state.personalProjectSettingEventMessage = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(ACTION_RESET_STATE, () => {
      return {
        ...initialAppState,
        loggedInUser: undefined,
      }
    })
  },
})

export const {
  changeTheme,
  closeLeftSideBar,
  toggleLeftSideBar,
  toggleRightSideBar,
  toggleIsRightSideBarLargeWidth,
  setLoggedInUser,
  setLoggedOutUser,
  notifyProjectEvent,
  notifyEventEvent,
  notifyProjectTaskEvent,
  notifyTaskKindEvent,
  notifyEventKindEvent,
  notifyTaskStateEvent,
  notifyTaskCommentEvent,
  notifyTaskWorkEvent,
  notifyTaskEvent,
  notifyBookmarkEvent,
  notifyFavoriteEvent,
  notifyFileEvent,
  notifyProjectGroupEvent,
  notifyEventRecordingEvent,
  notifyTenantSettingUserEventMessageEvent,
  notifyProjectSettingMemberEvent,
  notifyEventAttendeeEvent,
  notifyProjectSettingEventCategoryEvent,
  notifyProjectSettingTaskCategoryEvent,
  updateLoggedInUserDisplayName,
  updateLoggedInUserAvatar,
  notifyMyAccountEvent,
  notifyRoleEvent,
  notifyTenantSettingEvent,
  notifyDirectChannelEvent,
  setCurrentPlan,
  notifyFilterEvent,
  notifyTaskDependencyEvent,
  notifyProjectDetailSettingMemberUnitPriceEvent,
  notifyFolderEvent,
  setRightSideBarSelectedMessageId,
  notifyPresenceEvent,
  updateUserPresences,
  notifyPersonalProjectSettingEvent,
} = appSlice.actions

export const appSliceSelector = (state: RootState) => state.app
