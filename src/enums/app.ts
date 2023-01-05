/* eslint-disable @typescript-eslint/no-redeclare */

/**
 *  イベントタイプ
 */
export const NotifyEventType = {
  Inserted: 'inserted',
  Updated: 'updated',
  Deleted: 'deleted',
} as const

export type NotifyEventType =
  typeof NotifyEventType[keyof typeof NotifyEventType]

// フィルタ条件（活動）
export const ActivityFilters = {
  AllActivities: 'allActivities',
  MyActivity: 'myActivity',
} as const

export type ActivityFilters =
  typeof ActivityFilters[keyof typeof ActivityFilters]

// type filter (activity)
export const ActivityTypeFilters = {
  AllActivityTypes: 'allTypes',
} as const

export type ActivityTypeFilters =
  typeof ActivityTypeFilters[keyof typeof ActivityTypeFilters]

// type filter (task)
export const TaskTypeFilters = {
  AllTaskTypes: 'allTypes',
} as const

export type TaskTypeFilters =
  typeof TaskTypeFilters[keyof typeof TaskTypeFilters]

// フィルタ条件（タスク）
export const TaskFilters = {
  UncompletedTasks: 'uncompletedTasks',
  MyTasks: 'myTasks',
  AllTasks: 'allTasks',
} as const

export type TaskFilters = typeof TaskFilters[keyof typeof TaskFilters]

export const ProjectFilters = {
  ParticipatingProjects: 'participatingProjects',
  MyProjects: 'myProjects',
  AllProjects: 'allProjects',
} as const

export type ProjectFilters = typeof ProjectFilters[keyof typeof ProjectFilters]

// Chat filter
export const ChatMessageFilters = {
  AllMessage: 'allMessage',
  OnlyThisRoom: 'onlyThisRoom',
} as const

export type ChatMessageFilters =
  typeof ChatMessageFilters[keyof typeof ChatMessageFilters]

// project scope
export const ProjectScope = {
  Public: {
    key: 1,
    name: 'パブリック',
  },
  MemberOnly: {
    key: 2,
    name: 'パブリック(メンバーのみ)',
  },
  Private: {
    key: 3,
    name: 'プライベート',
  },
}

export type ProjectScope = typeof ProjectScope[keyof typeof ProjectScope]

// フィルタ条件（タスク種別）
// TODO: 仮決定、CREW-1383で中身を確定する
export const TimeFlag = {
  Newer: 'newer',
  Default: 'default',
  Older: 'older',
  Independent: 'independent',
} as const

export type TimeFlag = typeof TimeFlag[keyof typeof TimeFlag]

/**
 * チャット欄の表示スタイル
 */
export const ChatStyle = {
  /**  追記スタイル(Rocket.Chat様) */
  Append: 'append',
  /** スレッドスタイル */
  Thread: 'thread',
  /** スレッド内表示 */
  InThread: 'inThread',
} as const
export type ChatStyle = typeof ChatStyle[keyof typeof ChatStyle]

/**
 * 時間軸上での向き
 */
export const TimelineDirection = {
  /** より新しい方 */
  Newer: 'newer',
  /** より古い方 */
  Older: 'older',
} as const
export type TimelineDirection =
  typeof TimelineDirection[keyof typeof TimelineDirection]

/**
 * Project progress list items
 */
export const ProjectProgressItems = {
  Completed: {
    text: 'completed',
    displayColor: 'bg-crew-blue-3-light dark:bg-crew-blue-3-dark',
  },
  Incomplete: {
    text: 'incomplete',
    displayColor: 'bg-crew-blue-2-light dark:bg-crew-blue-2-dark',
  },
  Overdue: {
    text: 'overdue',
    displayColor: 'bg-crew-red-3-light dark:bg-crew-red-3-dark',
  },
} as const
export type ProjectProgressItems =
  typeof ProjectProgressItems[keyof typeof ProjectProgressItems]

export const ProjectListTabs = {
  Activity: {
    text: 'label.activity',
    value: 'activity',
  },
  Task: {
    text: 'label.task',
    value: 'task',
  },
  File: {
    text: 'label.file',
    value: 'file',
  },
} as const
export type ProjectListTabs =
  typeof ProjectListTabs[keyof typeof ProjectListTabs]

export const AppTheme = {
  Light: 'light',
  Dark: 'dark',
} as const
export type AppTheme = typeof AppTheme[keyof typeof AppTheme]

export const AppLanguage = {
  En: 'en',
  Ja: 'ja',
} as const
export type AppLanguage = typeof AppLanguage[keyof typeof AppLanguage]

export const ProjectActivityDetailTabs = {
  Task: {
    text: 'label.task',
    value: 'task',
  },
} as const
export type ProjectActivityDetailTabs =
  typeof ProjectActivityDetailTabs[keyof typeof ProjectActivityDetailTabs]

/**
 * Project setting tab list item
 */
export const ProjectSettingTabs = {
  Member: {
    id: 0,
    text: 'label.member',
    displayUrlText: 'member',
  },
  Milestone: {
    id: 1,
    text: 'label.milestone',
    displayUrlText: 'milestone',
  },
  ActivityType: {
    id: 2,
    text: 'label.activityType',
    displayUrlText: 'activityType',
  },
  TaskCategory: {
    id: 3,
    text: 'label.taskCategory',
    displayUrlText: 'taskCategory',
  },
} as const
export type ProjectSettingTabs =
  typeof ProjectSettingTabs[keyof typeof ProjectSettingTabs]

// 検索タイプ（標準検索・詳細検索）
export const SearchTypes = {
  StandardSearch: {
    text: 'label.standardSearch',
    value: 'standard',
  },
  AdvancedSearch: {
    text: 'label.advancedSearch',
    value: 'advanced',
  },
} as const

export type SearchTypes = typeof SearchTypes[keyof typeof SearchTypes]

// 【テナント設定ダイアログ】タブ一覧
export const TenantMaintenanceTabs = {
  ProjectActivityType: {
    id: 0,
    text: 'label.projectActivityType',
  },
  TaskType: {
    id: 1,
    text: 'label.taskType',
  },
  TaskState: {
    id: 2,
    text: 'label.taskState',
  },
} as const
export type TenantMaintenanceTabs =
  typeof TenantMaintenanceTabs[keyof typeof TenantMaintenanceTabs]

export const ListOptionOrder = {
  Id: {
    value: 'id',
    text: 'label.id',
  },
  Type: {
    value: 'taskTypeName',
    text: 'label.type',
  },
  Title: {
    value: 'subject',
    text: 'label.subject',
  },
  Priority: {
    value: 'taskPriorityName',
    text: 'label.priority',
  },
  Status: {
    value: 'taskStateName',
    text: 'label.status',
  },
  AssignedUser: {
    value: 'assignToUserName',
    text: 'label.assignedUser',
  },
  DueDate: {
    value: 'dueDate',
    text: 'label.dueDate',
  },
} as const

export type ListOptionOrder =
  typeof ListOptionOrder[keyof typeof ListOptionOrder]

export const FileListOptionOrder = {
  Name: {
    value: 'name',
    text: 'label.fileName',
  },
  Revision: {
    value: 'revision',
    text: 'label.version',
  },
  Size: {
    value: 'size',
    text: 'label.size',
  },
  DisplayName: {
    value: 'displayName',
    text: 'label.updatedBy',
  },
  LastUpdatedAttachmentAt: {
    value: 'lastUpdatedAttachmentAt',
    text: 'label.updateDatetime',
  },
} as const

export type FileListOptionOrder =
  typeof FileListOptionOrder[keyof typeof FileListOptionOrder]

export const ProjectDetailFileListOptionOrder = {
  FileName: {
    value: 'name',
    text: 'label.fileName',
  },
  Revision: {
    value: 'revision',
    text: 'label.version',
  },
  Size: {
    value: 'size',
    text: 'label.size',
  },
  DisplayName: {
    value: 'displayName',
    text: 'label.updatedBy',
  },
  LastUpdatedAttachmentAt: {
    value: 'lastUpdatedAttachmentAt',
    text: 'label.updateDatetime',
  },
} as const

export type ProjectDetailFileListOptionOrder =
  typeof ProjectDetailFileListOptionOrder[keyof typeof ProjectDetailFileListOptionOrder]

export const TaskListOrderItems = {
  Id: {
    value: 'id',
    text: 'label.id',
  },
  Type: {
    value: 'taskTypeName',
    text: 'label.type',
  },
  RelatedItem: {
    value: 'relatedItem',
    text: 'label.relatedItem',
  },
  Title: {
    value: 'subject',
    text: 'label.subject',
  },
  Priority: {
    value: 'taskPriorityName',
    text: 'label.priority',
  },
  Status: {
    value: 'taskStateName',
    text: 'label.status',
  },
  AssignedUser: {
    value: 'assignToUserName',
    text: 'label.assignedUser',
  },
  StartDate: {
    value: 'startDate',
    text: 'label.startDate',
  },
  DueDate: {
    value: 'dueDate',
    text: 'label.dueDate',
  },
} as const

export type TaskListOrderItems =
  typeof TaskListOrderItems[keyof typeof TaskListOrderItems]

// プロジェクト一覧 詳細検索の並べ替え項目リスト
export const ProjectListOrderItems = {
  ProjectName: {
    value: 'subject',
    text: 'label.projectName',
  },
  Description: {
    value: 'description',
    text: 'label.description',
  },
  OwnerUser: {
    value: 'ownerUserName',
    text: 'label.owner',
  },
  Progress: {
    value: 'progress',
    text: 'label.progress',
  },
} as const

export type ProjectListOrderItems =
  typeof ProjectListOrderItems[keyof typeof ProjectListOrderItems]

// project scope
export const SortFilter = {
  Ascending: {
    id: 1,
    value: 'asc',
    text: 'label.ascending',
  },
  Descending: {
    id: 2,
    value: 'desc',
    text: 'label.descending',
  },
} as const

export type SortFilter = typeof SortFilter[keyof typeof SortFilter]

// タスク状態のタイプ一覧
// NOTE: chooseableは選択可能判定用。（設定ダイアログでは未着手・完了は選択不可）
export const TaskStateTypes = {
  // 未着手
  NotStarted: {
    value: 'notStarted',
    chooseable: false,
  },
  // 作業中
  InProgress: {
    value: 'inProgress',
    chooseable: true,
  },
  // レビュー中
  InReview: {
    value: 'inReview',
    chooseable: true,
  },
  // 完了
  Completed: {
    value: 'completed',
    chooseable: false,
  },
} as const
export type TaskStateTypes = typeof TaskStateTypes[keyof typeof TaskStateTypes]

// save filter scope
export const SaveFilterScope = {
  Public: {
    key: 1,
    name: 'label.public',
  },
  Private: {
    key: 2,
    name: 'label.private',
  },
}

export type SaveFilterScope =
  typeof SaveFilterScope[keyof typeof SaveFilterScope]
/**
 * Task priorities
 * TODO: タスク優先度のデータの持ち方について
 *      https://break-tmc.atlassian.net/browse/CREW-3115
 */
export const TaskPriorities = {
  Highest: {
    text: 'label.highest',
    textColorClass: 'text-crew-red-3-light dark:text-crew-red-3-dark',
    iconClass: 'bi-chevron-double-up',
  },
  High: {
    text: 'label.high',
    textColorClass: 'text-crew-red-3-light dark:text-crew-red-3-dark',
    iconClass: 'bi-chevron-up',
  },
  Normal: {
    text: 'label.normal',
    textColorClass: 'text-crew-green-3-light dark:text-crew-green-3-dark',
    iconClass: 'bi-dash',
  },
  Low: {
    text: 'label.low',
    textColorClass: 'text-crew-blue-3-light dark:text-crew-blue-3-dark',
    iconClass: 'bi-chevron-down',
  },
  Lowest: {
    text: 'label.lowest',
    textColorClass: 'text-crew-blue-3-light dark:text-crew-blue-3-dark',
    iconClass: 'bi-chevron-double-down',
  },
}
export type TaskPriorities = typeof TaskPriorities[keyof typeof TaskPriorities]

// ホームメニュー
export const HomeMenuItems = {
  // すべての新着
  All: {
    path: '',
    label: 'label.allNew',
    icon: 'dx-icon-clock',
  },
  // メンション
  Mention: {
    path: 'mention',
    label: 'label.mention',
    icon: 'dx-icon-mention',
  },
  // ブックマーク
  Bookmark: {
    path: 'bookmark',
    label: 'label.bookmark',
    icon: 'dx-icon-bookmark',
  },
} as const
export type HomeMenuItems = typeof HomeMenuItems[keyof typeof HomeMenuItems]

// コンテキストメニューの編集 or 削除
export const ContextMenuItems = {
  Edit: {
    action: 'edit',
    label: 'action.edit',
  },
  Delete: {
    action: 'delete',
    label: 'action.delete',
  },
} as const
export type ContextMenuItems =
  typeof ContextMenuItems[keyof typeof ContextMenuItems]

export const TaskDetailListTabs = {
  Comment: {
    text: 'label.comment',
    value: 'comment',
  },
} as const
export type TaskDetailListTabs =
  typeof TaskDetailListTabs[keyof typeof TaskDetailListTabs]

export const CommentButtonGroup = {
  CommentAndHistory: {
    value: 'comments_and_histories',
    text: 'label.commentAndHistory',
    displayUrlText: 'commentAndHistory',
  },
  Comment: {
    value: 'comments',
    text: 'label.comment',
    displayUrlText: 'comment',
  },
  History: {
    value: 'histories',
    text: 'label.history',
    displayUrlText: 'history',
  },
  Time: {
    value: 'time',
    text: 'label.time',
    displayUrlText: 'time',
  },
} as const

export type CommentButtonGroup =
  typeof CommentButtonGroup[keyof typeof CommentButtonGroup]

// project scope
export const SortCommentButtonGroup = {
  Ascending: {
    value: 'asc',
    icon: 'bi bi-arrow-up',
  },
  Descending: {
    value: 'desc',
    icon: 'bi bi-arrow-down',
  },
} as const

export type SortCommentButtonGroup =
  typeof SortCommentButtonGroup[keyof typeof SortCommentButtonGroup]

export const TaskDisplayModeButtonGroup = {
  List: {
    id: 0,
    icon: 'bi bi-list',
  },
  Kanban: {
    id: 1,
    icon: 'bi bi-layout-three-columns',
  },
  Calendar: {
    id: 2,
    icon: 'bi bi-calendar2-event',
  },
  Timeline: {
    id: 3,
    icon: 'bi bi-calendar4-week',
  },
} as const

export type TaskDisplayModeButtonGroup =
  typeof TaskDisplayModeButtonGroup[keyof typeof TaskDisplayModeButtonGroup]

export const TaskListPanelDisplayMode = {
  List: {
    id: 0,
    icon: 'bi bi-list',
  },
  Kanban: {
    id: 1,
    icon: 'bi bi-layout-three-columns',
  },
} as const

export type TaskListPanelDisplayMode =
  typeof TaskListPanelDisplayMode[keyof typeof TaskListPanelDisplayMode]

export const FileListPanelDisplayMode = {
  List: {
    id: 0,
    icon: 'bi bi-list',
  },
  Tile: {
    id: 1,
    icon: 'bi bi-grid',
  },
} as const

export type FileListPanelDisplayMode =
  typeof FileListPanelDisplayMode[keyof typeof FileListPanelDisplayMode]

export const ProjectListPanelDisplayMode = {
  List: {
    id: 0,
    icon: 'bi bi-list',
  },
  Card: {
    id: 1,
    icon: 'bi bi-card-heading',
  },
} as const

export type ProjectListPanelDisplayMode =
  typeof ProjectListPanelDisplayMode[keyof typeof ProjectListPanelDisplayMode]

export const TaskCommentFilter = {
  Comments: 'comments',
  Histories: 'histories',
  CommentsAndHistories: 'comments_and_histories',
} as const

export type TaskCommentFilter =
  typeof TaskCommentFilter[keyof typeof TaskCommentFilter]

export const TaskCommentHistoryType = {
  TaskState: {
    key: 'taskState',
    displayText: 'taskState',
  },
  TaskPriority: {
    key: 'taskPriority',
    displayText: 'priority',
  },
  AssignToUser: {
    key: 'assignToUser',
    displayText: 'assignedUser',
  },
  DueDate: {
    key: 'dueDate',
    displayText: 'dueDate',
  },
} as const

export type TaskCommentHistoryType =
  typeof TaskCommentHistoryType[keyof typeof TaskCommentHistoryType]

// 通知範囲指定メンション項目
export const ScopeMentionItems = {
  All: {
    id: 'all',
    label: 'message.chat.mentionAll',
  },
} as const
export type ScopeMentionItems =
  typeof ScopeMentionItems[keyof typeof ScopeMentionItems]

// 右パネルのタブ
export const AppRightPanelTabs = {
  Chat: {
    text: 'label.chat',
    value: 'chat',
  },
} as const
export type AppRightPanelTabs =
  typeof AppRightPanelTabs[keyof typeof AppRightPanelTabs]

export const FileFilters = {
  MyFiles: 'myFiles',
  AllFiles: 'allFiles',
} as const

export type FileFilters = typeof FileFilters[keyof typeof FileFilters]
export const FileDetailListTabs = {
  UpdatedHistory: {
    text: 'label.updatedHistory',
    value: 'updatedHistory',
  },
  Preview: {
    text: 'label.preview',
    value: 'preview',
  },
} as const
export type FileDetailListTabs =
  typeof FileDetailListTabs[keyof typeof FileDetailListTabs]
