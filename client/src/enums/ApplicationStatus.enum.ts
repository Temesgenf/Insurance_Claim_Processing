export const ApplicationStatus = {
  Pending: 'Pending',
  Approved: 'Approved',
  Rejected: 'Rejected'
} as const;

export type ApplicationStatus = typeof ApplicationStatus[keyof typeof ApplicationStatus];