import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  username: z.string(), // is set to required on sign up per Clerk Dashboard.
  emailAddresses: z.array(
    z.object({
      emailAddress: z.string(),
    })
  ),
});

export type User = {
  username: string;
  email: string;
  avatar: string;
};

export const TasksSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);

export type Task = {
  id: number;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Object = Record<string, any>;
