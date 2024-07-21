export interface MaterialProps {
    id: number;
    documentLink: string;
    title: string;
    onDelete: (id: number) => void;
    onUpdate: ({ file, title, materialToUpdateId }: {
      file: File | null | undefined;
      title: string;
      materialToUpdateId: number;
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