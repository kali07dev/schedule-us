export interface User {
  id: string
  name: string
  email: string
  avatar: string
  groups: string[]
}

export interface Group {
  id: string
  name: string
  description: string
  members: string[]
  color: string
  createdAt: Date
}

export interface Goal {
  id: string
  title: string
  description: string
  category: "Finance" | "Travel" | "Family" | "Personal" | "Professional"
  targetAmount: number
  currentAmount: number
  targetDate: Date
  isPersonal: boolean
  groupId: string
  userId: string
  status: "active" | "completed" | "paused"
  createdAt: Date
}
