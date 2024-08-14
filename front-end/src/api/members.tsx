import { MemberProps } from "../pages/members/helpers";

const errorToString = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const fetchMembersWithRoleAPI = async ({
    roleId,
  }:{
    roleId: number,
  }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/member/${roleId}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data: MemberProps[] = await response.json();
    return data;

  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  } 
};

export const createMemberAPI = async ({
    file,
    name,
    email,
    position,
    bio,
    roleId,
}:{
    file: File | null | undefined,
    name: string,
    email: string,
    position: string,
    bio: string,
    roleId: number,
}) => {
  try {

    if (!file && roleId == 1) {
      throw new Error("Молим Вас да унесете фајл")  
    }

    const formData = new FormData();
    if (file && roleId == 1) {
      formData.append('file', file);
    }
    formData.append('name', name);
    formData.append('email', email);
    formData.append('position', position);
    formData.append('bio', bio);
    formData.append('roleId', roleId.toString());
  
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/member/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }    
      const newMember: MemberProps = await response.json();
      return newMember;
    }catch (error) {
      const errorMessage = errorToString(error);
      console.error(errorMessage);
      throw errorMessage;
  }
};

export const deleteMemberAPI = async ({
  id,
}:{
  id: number,
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/member/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  }
};

export const updateMemberAPI = async ({
  id,
  file,
  name,
  email,
  position,
  bio,
  roleId,
}:{
  id: number
  file: File | null | undefined,
  name: string,
  email: string,
  position: string,
  bio: string,
  roleId: number,
}) => {
  try {

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('name', name);
    formData.append('email', email);
    formData.append('position', position);
    formData.append('bio', bio);
    formData.append('roleId', roleId.toString());

    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/member/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    } 
  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  }
};

