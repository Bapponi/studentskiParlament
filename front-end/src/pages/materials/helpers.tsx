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