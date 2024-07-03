export interface MaterialProps {
    id: number;
    documentLink: string;
    title: string;
    onDelete: (id: number) => void;
  }