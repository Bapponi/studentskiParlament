import { PollProps } from "../components/polls/helpers";

const errorToString = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const fetchAllPollsAPI = async ({
  userId,
}:{
  userId: number,
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll/${userId}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data: PollProps[] = await response.json();
    return data;

  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  } 
};

export const createPollAPI = async ({
    title,
    elements,
    optionValues,
}:{
    title: string,
    elements: number[],
    optionValues: { [key: number]: string },
}) => {
  try {

    const payload = {
      title,
      elements,
      optionValues
    };
  
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }    

  }catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  }
};

export const deletePollAPI = async ({
  id,
}:{
  id: number,
}) => {
  console.log("adadadad")
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll/${id}`, {
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

export const updatePollActivityAPI = async ({
  id,
  updateActive,
}:{
  id: number,
  updateActive: boolean,
}) => {
  try {
    const payload = {
      active: updateActive
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
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

export const sendPollVoteAPI = async ({
  pollId,
  userId,
  voteOption,
}:{
  pollId: number,
  userId: number,
  voteOption: string,
}) => {

  const payload = {
    pollId: pollId,
    userId: userId,
    voteOption: voteOption,
  }

  try{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
}
