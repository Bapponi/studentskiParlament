export interface LinkProps {
  id: number;
  logo: string;
  website: string;
  name: string;
  onDelete: (id: number) => void;
  onUpdate: ({ file, name, website, linkToUpdateId }: {
    file: File | null | undefined;
    name: string;
    website: string
    linkToUpdateId: number;
  }) => void;
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