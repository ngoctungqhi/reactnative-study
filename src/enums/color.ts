/* eslint-disable @typescript-eslint/no-redeclare */

/**
 *  CrewBadgeの色
 */
export const CrewBadgeColorClass = {
  Red: 'crew-badge-red',
  Orange: 'crew-badge-orange',
  Yellow: 'crew-badge-yellow',
  Green: 'crew-badge-green',
  Blue: 'crew-badge-blue',
  Navy: 'crew-badge-navy',
  Purple: 'crew-badge-purple',
} as const

export type CrewBadgeColorClass =
  typeof CrewBadgeColorClass[keyof typeof CrewBadgeColorClass]

/**
 *  CrewBadgeの反転色
 */
export const CrewBadgeInvertedColorClass = {
  Red: 'crew-badge-red-inverted',
  Orange: 'crew-badge-orange-inverted',
  Yellow: 'crew-badge-yellow-inverted',
  Green: 'crew-badge-green-inverted',
  Blue: 'crew-badge-blue-inverted',
  Navy: 'crew-badge-navy-inverted',
  Purple: 'crew-badge-purple-inverted',
} as const

export type CrewBadgeInvertedColorClass =
  typeof CrewBadgeInvertedColorClass[keyof typeof CrewBadgeInvertedColorClass]
