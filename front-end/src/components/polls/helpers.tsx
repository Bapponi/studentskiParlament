export interface PollOption{
  option_name: string
  votes_num: number
}
  
export interface PollProps{
  id: number;
  title: string;
  active: boolean;
  membersVoted: string[];
  pollOptions: PollOption[];
  voted: boolean;
  onDelete: (id: number) => void;
  onUpdate: ({ id, updateActive }: {
    id: number;
    updateActive: boolean
  }) => void;
  sendPollVote: ({
    pollId, 
    userId, 
    voteOption
  }:{
    pollId: number,
    userId: number,
    voteOption: string}
  )=>void,
  sendError: string | undefined,
  sendInfo: string | undefined,
  isLoadingSend: boolean;
}

export interface PollVoteProps {
  pollId: number
  voteOptions: PollOption[];
  sendPollVote: ({
    pollId, 
    userId, 
    voteOption
  }:{
    pollId: number,
    userId: number,
    voteOption: string}
  )=>void,
  sendError: string | undefined,
  sendInfo: string | undefined,
  isLoadingSend: boolean;
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