import { GetTasksRequest } from '@crew/apis/task/models/getTasks/request'
import { Task } from '@crew/apis/task/models/getTasks/response'
import { useGetTasksQuery } from '@crew/apis/task/taskApis'
import { SettingKeyType } from '@crew/enums/app'
import { useTranslation } from '@crew/modules/i18n'
import { useUserSetting } from '@crew/states'
import { getDefaultTabValue, getEnumDataByValue } from '@crew/utils/enum'
import { skipToken } from '@reduxjs/toolkit/query'
import {
  ColumnDef,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  TableOptions,
} from '@tanstack/react-table'
import { CrewBadge } from 'components/elements/crewBadge/crewBadge'
import { CrewLink } from 'components/elements/crewLink/crewLink'
import { CrewRelatedItemLink } from 'components/elements/crewRelatedItemLink/crewRelatedItemLink'
import { CrewTable } from 'components/elements/crewTable/crewTable'
import { CrewTaskPriority } from 'components/elements/crewTaskPriority/crewTaskPriority'
import { CrewUserItem } from 'components/elements/crewUserItem/crewUserItem'
import {
  DEFAULT_PAGING_PARAMS,
  TASK_DEFAULT_SORT_COLUMN,
} from 'configs/constants'
import {
  CrewTaskListItemName,
  TaskDetailListTabs,
  TaskPriorities,
  TaskSearchOptions,
} from 'enums/app'
import _ from 'lodash'
import qs from 'qs'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import { getParamAsArray, getParamAsDate, getParamAsString } from 'utils'

export const TaskTable = memo(() => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const params = qs.parse(searchParams.toString())

  const taskEventMessage = useAppSelector((state) => state.app.taskEventMessage)

  const defaultListDisplayNumber = useUserSetting(
    SettingKeyType.ListDisplayNumber,
    DEFAULT_PAGING_PARAMS.pageSize
  )

  const pagination: PaginationState = useMemo(
    () => ({
      pageIndex: Number(
        getParamAsString('pageIndex', params) ?? DEFAULT_PAGING_PARAMS.pageIndex
      ),
      pageSize: Number(
        getParamAsString('pageSize', params) ?? defaultListDisplayNumber
      ),
    }),
    [defaultListDisplayNumber, params]
  )

  const sorting: SortingState = useMemo(() => {
    const sortArray =
      getParamAsArray('sort', params) || TASK_DEFAULT_SORT_COLUMN
    return sortArray.map((sort) => {
      const [id, direction] = sort.split('.')
      return {
        id,
        desc: direction === 'desc',
      }
    })
  }, [params])

  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnPinning] = useState({
    left: ['select'],
    right: ['action'],
  })

  // ソート順。指定されていない場合はIDの降順
  const sortParams = useMemo(() => {
    const sortParams = searchParams.getAll('sort')
    return sortParams.length > 0 ? sortParams : TASK_DEFAULT_SORT_COLUMN
  }, [searchParams])

  // Get tasks request
  const getTasksParams: GetTasksRequest | undefined = {
    keyword: getParamAsString(TaskSearchOptions.Keyword.id, params),
    keywordFilterCondition: undefined,
    taskKindIds: getParamAsArray(TaskSearchOptions.TaskKindId.id, params),
    assignToUser: getParamAsString(TaskSearchOptions.AssignToUser.id, params),
    taskStateIds: getParamAsArray(TaskSearchOptions.TaskStateId.id, params),
    taskStateTypes: getParamAsArray(TaskSearchOptions.TaskStateType.id, params),
    taskPriorities: getParamAsArray(
      TaskSearchOptions.TaskPriority.id,
      params
    )?.map((taskPriority) => Number(taskPriority)), // string[] -> number[]
    taskCategoryIds: getParamAsArray(
      TaskSearchOptions.TaskCategoryId.id,
      params
    ),
    projectId: getParamAsString(TaskSearchOptions.ProjectId.id, params),
    projectGroupIds: getParamAsArray(
      TaskSearchOptions.ProjectGroupId.id,
      params
    ),
    startDate: getParamAsDate(TaskSearchOptions.StartDate.id, params),
    dueDate: getParamAsDate(TaskSearchOptions.DueDate.id, params),
    createdById: getParamAsString(TaskSearchOptions.CreatedById.id, params),
    updatedById: getParamAsString(TaskSearchOptions.UpdatedById.id, params),
    createdAt: getParamAsDate(TaskSearchOptions.CreatedAt.id, params),
    updatedAt: getParamAsDate(TaskSearchOptions.UpdatedAt.id, params),
    parentTaskId: undefined,
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    sort: sortParams,
  }

  const { data: getTasksResponse, refetch: getTasksRefetch } = useGetTasksQuery(
    getTasksParams ?? skipToken
  )

  const pageCount = Math.ceil(
    (getTasksResponse?.totalCount ?? 0) / pagination.pageSize
  )

  // refresh task list
  useEffect(() => {
    getTasksRefetch()
  }, [getTasksRefetch, taskEventMessage])

  // https://github.com/TanStack/table/discussions/3899
  // https://github.com/TanStack/table/discussions/3619
  // https://github.com/infonomic/remix.infonomic.io/blob/d3a7f628d3ad6e1e80cc80d4ac72db74da90e8d6/app/routes/admin%2B/users.tsx#L116
  // Func handle change pagination
  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updaterOrValue) => {
      let values: PaginationState
      if (updaterOrValue instanceof Function) {
        values = updaterOrValue(pagination)
      } else {
        values = updaterOrValue
      }

      const newParams = {
        ...params,
        pageIndex: values.pageIndex,
        pageSize: values.pageSize,
      }

      // paramsが変わっていない場合はnavigateしない
      if (_.isEqual(params, newParams)) return

      const newQueryString = qs.stringify(newParams, {
        arrayFormat: 'repeat',
        skipNulls: true,
      })

      navigate(`?${newQueryString}`)
    },
    [navigate, pagination, params]
  )

  // Func handle change sorting
  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (updaterOrValue) => {
      let values: SortingState
      if (updaterOrValue instanceof Function) {
        values = updaterOrValue(sorting)
      } else {
        values = updaterOrValue
      }

      const sortList = values.map((sort) => {
        return `${sort.id}.${sort.desc ? 'desc' : 'asc'}`
      })

      const newParams = {
        ...params,
        sort: sortList,
      }

      // paramsが変わっていない場合はnavigateしない
      if (_.isEqual(params, newParams)) return

      const newQueryString = qs.stringify(newParams, {
        arrayFormat: 'repeat',
        skipNulls: true,
      })

      navigate(`?${newQueryString}`)
    },
    [navigate, params, sorting]
  )

  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        id: CrewTaskListItemName.ReferenceNo,
        accessorKey: CrewTaskListItemName.ReferenceNo,
        header: () => t('label.referenceNo'),
        cell: ({ row }) => (
          <div className="text-right w-full whitespace-nowrap">
            {row.original.referenceNo}
          </div>
        ),
        size: 80,
        minSize: 50,
      },
      {
        id: CrewTaskListItemName.TaskKind,
        accessorKey: CrewTaskListItemName.TaskKind,
        header: () => t('label.classification'),
        cell: ({ row }) => (
          <CrewBadge displayColor={row.original.taskKind.displayColor}>
            {row.original.taskKind.name}
          </CrewBadge>
        ),
        size: 120,
        minSize: 90,
      },
      {
        id: 'relatedItem',
        header: () => t('label.relatedItem'),
        cell: ({ row }) => (
          <div className="w-full">
            <CrewRelatedItemLink
              entityType={row.original.entityType}
              id={row.original.entityRecordId}
              className="line-clamp-2 break-all"
            />
          </div>
        ),
        size: 200,
        minSize: 50,
      },
      {
        id: CrewTaskListItemName.Subject,
        accessorKey: CrewTaskListItemName.Subject,
        header: () => t('label.subject'),
        cell: ({ row }) => (
          <div className="w-full">
            <CrewLink
              to={`/tasks/${row.original.id}/${getDefaultTabValue(
                TaskDetailListTabs
              )}`}
              title={row.original.subject}
              className="line-clamp-2 break-all"
            >
              {row.original.subject}
            </CrewLink>
          </div>
        ),
        size: 500,
        minSize: 50,
      },
      {
        id: CrewTaskListItemName.TaskPriority,
        accessorKey: CrewTaskListItemName.TaskPriority,
        header: () => t('label.priority'),
        cell: ({ row }) => {
          const taskPriority = getEnumDataByValue(
            TaskPriorities,
            row.original.taskPriority
          )

          return (
            <div className="w-full">
              {taskPriority && (
                <CrewTaskPriority
                  taskPriority={taskPriority.value}
                  className="justify-center"
                />
              )}
            </div>
          )
        },
        size: 80,
        minSize: 50,
      },
      {
        id: CrewTaskListItemName.DueDate,
        accessorKey: CrewTaskListItemName.DueDate,
        header: () => t('label.dueDate'),
        cell: ({ row }) => (
          <div className="truncate">
            {t('format.date', {
              value: row.original.dueDate,
            })}
          </div>
        ),
        size: 120,
        minSize: 50,
      },
      {
        id: CrewTaskListItemName.TaskState,
        accessorKey: CrewTaskListItemName.TaskState,
        header: () => t('label.state'),
        cell: ({ row }) => (
          <CrewBadge displayColor={row.original.taskState.displayColor}>
            {row.original.taskState.name}
          </CrewBadge>
        ),
        size: 120,
        minSize: 90,
      },
      {
        id: CrewTaskListItemName.AssignToUser,
        accessorKey: CrewTaskListItemName.AssignToUser,
        header: () => t('label.assignedUser'),
        cell: ({ row }) => (
          <div className="w-full">
            {row.original.assignToUser && (
              <CrewUserItem
                id={row.original.assignToUser.id}
                displayName={row.original.assignToUser.displayName}
                version={row.original.assignToUser.version}
              />
            )}
          </div>
        ),
        size: 200,
        minSize: 50,
      },
      {
        id: CrewTaskListItemName.StartDate,
        accessorKey: CrewTaskListItemName.StartDate,
        header: () => t('label.startDate'),
        cell: ({ row }) => (
          <div className="truncate">
            {t('format.date', {
              value: row.original.startDate,
            })}
          </div>
        ),
        size: 120,
        minSize: 50,
      },
      {
        id: CrewTaskListItemName.TaskCategory,
        accessorKey: CrewTaskListItemName.TaskCategory,
        header: () => t('label.category'),
        cell: ({ row }) => (
          <div className="truncate">{row.original.taskCategory?.name}</div>
        ),
        size: 160,
        minSize: 50,
      },
    ],
    [t]
  )

  const tableOptions: TableOptions<Task> = {
    data: getTasksResponse?.tasks ?? [],
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      columnPinning,
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    manualSorting: true,
    enableMultiSort: true,
    maxMultiSortColCount: 2,
    meta: {
      headerRowHeight: 40,
      dataRowHeight: 50,
    },
  }

  return (
    <div className="flex overflow-y-hidden">
      {/* Task list table */}
      <CrewTable tableOptions={tableOptions} />
    </div>
  )
})
