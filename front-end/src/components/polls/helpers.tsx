export interface PollOption{
  option_name: string
  votes_num: number
}
  
export interface PollProps{
  id: number
  title: string
  active: boolean
  pollOptions: PollOption[]
  onDelete: (id: number) => void;
}

export enum FileType {
  Photo = 1,
  Video,
  Pdf
}

export enum MessageBoxTypes{
  Info = 1,
  Error,
  Loading
}