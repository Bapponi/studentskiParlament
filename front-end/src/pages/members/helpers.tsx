export interface MemberProps {
    id: number;
    file: File | null | undefined;
    name: string;
    email: string;
    position: string;
    bio: string;
    memberImg: string;
    roleId: number;
    onDelete: (id: number) => void;
    onUpdate: ({memberToUpdateId, file, name, email, position, bio, roleId}: {
      memberToUpdateId: number;
      file: File | null | undefined;
      name: string;
      email: string;
      position: string;
      bio: string;
      roleId: number;
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

export const positionOptions = [
  { value: 'председник', label: 'Председник' },
  { value: 'заменик председник', label: 'Заменик Председника' },
  { value: 'члан', label: 'Члан' },
];

export const roleOptions = [
  { value: '1', label: 'Админ' },
  // { value: '2', label: 'ПР' },
  { value: '3', label: 'Корисник' },
];