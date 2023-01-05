/* eslint-disable @typescript-eslint/no-redeclare */

/**
 *  エンティティタイプ
 */
export const EntityType = {
  Customer: 'customers',
  ChatMessage: 'chat_messages',
  Opportunity: 'opportunities',
  OpportunityActivity: 'opportunity_activities',
  Project: 'projects',
  ProjectActivity: 'project_activities',
  Task: 'tasks',
  TaskActivity: 'task_activities',
  File: 'files',
  User: 'users',
  Department: 'departments',
} as const

export type EntityType = typeof EntityType[keyof typeof EntityType]

/**
 * メッセージタイプ
 */
export const MessageType = {
  MessageNormal: 'message_normal',
  MassageSurvey: 'message_survey',
  TaskAdded: 'task_added',
  TaskUpdated: 'task_updated',
  TaskDeleted: 'task_deleted',
  ProjectActivityAdded: 'project_activity_added',
  ProjectActivityUpdated: 'project_activity_updated',
  ProjectActivityDeleted: 'project_activity_deleted',
  FileAdded: 'file_added',
  FileUpdated: 'file_updated',
} as const

export type MessageType = typeof MessageType[keyof typeof MessageType]

/**
 *  非同期通信用メッセージタイプ
 */
export const WebsocketMessageType = {
  // チャットメッセージ
  ChatMessageAdded: 'chat_message_added',
  ChatMessageUpdated: 'chat_message_updated',
  ChatMessageDeleted: 'chat_message_deleted',

  // （チャットメッセージへの）リアクション
  ChatMessageReactionAdded: 'chat_message_reaction_added',
  ChatMessageReactionDeleted: 'chat_message_reaction_deleted',

  // フィードアイテム
  FeedItemAdded: 'feed_item_added',
  FeedItemUpdated: 'feed_item_updated',
  FeedItemDeleted: 'feed_item_deleted',

  // （フィードアイテムへの）リアクション
  FeedItemReactionAdded: 'feed_item_reaction_added',
  FeedItemReactionDeleted: 'feed_item_reaction_deleted',
} as const

export type WebsocketMessageType =
  typeof WebsocketMessageType[keyof typeof WebsocketMessageType]

/**
 * 非同期通信接続先タイプ
 */
export const WebsocketTargetType = {
  User: 'user',
  Chatroom: 'chatroom',
} as const

export type WebsocketTargetType =
  typeof WebsocketTargetType[keyof typeof WebsocketTargetType]
