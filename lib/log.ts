import { z } from "zod";

export const log = (error: any) => {
  if (error instanceof z.ZodError) {
    console.log(error.issues);
  } else {
    console.log(error);
  }
};
