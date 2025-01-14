import { z } from "zod";

const UserVerificationSchema = z.object({
  status: z.string(),
  strategy: z.string(),
  externalVerificationRedirectURL: z.string().url().nullable(),
  attempts: z.number().nullable(),
  expireAt: z.number().nullable(),
  nonce: z.string().nullable(),
  message: z.string().nullable(),
});

const UserIdentificationLinkSchema = z.object({
  id: z.string(),
  type: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  passwordEnabled: z.boolean(),
  totpEnabled: z.boolean(),
  backupCodeEnabled: z.boolean(),
  twoFactorEnabled: z.boolean(),
  banned: z.boolean(),
  locked: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
  imageUrl: z.string(),
  hasImage: z.boolean(),
  primaryEmailAddressId: z.string().nullable(),
  primaryPhoneNumberId: z.string().nullable(),
  primaryWeb3WalletId: z.string().nullable(),
  lastSignInAt: z.number().nullable(),
  externalId: z.string().nullable(),
  username: z.string(), // is set to required on sign up per Clerk Dashboard
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  publicMetadata: z.record(z.unknown()),
  privateMetadata: z.record(z.unknown()),
  unsafeMetadata: z.record(z.unknown()),
  emailAddresses: z.array(
    z.object({
      id: z.string(),
      emailAddress: z.string(),
      verification: UserVerificationSchema.nullable(),
      linkedTo: z.array(UserIdentificationLinkSchema),
    })
  ),
  phoneNumbers: z.array(
    z.object({
      id: z.string(),
      phoneNumber: z.string(),
      reservedForSecondFactor: z.boolean(),
      defaultSecondFactor: z.boolean(),
      verification: UserVerificationSchema.nullable(),
      linkedTo: z.array(UserIdentificationLinkSchema),
    })
  ),
  web3Wallets: z.array(
    z.object({
      id: z.string(),
      web3Wallet: z.string(),
      verification: UserVerificationSchema.nullable(),
    })
  ),
  externalAccounts: z.array(
    z.object({
      id: z.string(),
      provider: z.string(),
      identificationId: z.string(),
      externalId: z.string(),
      approvedScopes: z.string(),
      emailAddress: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      imageUrl: z.string(),
      username: z.string().nullable(),
      publicMetadata: z.record(z.unknown()).nullable(),
      label: z.string().nullable(),
      verification: UserVerificationSchema.nullable(),
    })
  ),
  samlAccounts: z.array(
    z.object({
      id: z.string(),
      provider: z.string(),
      providerUserId: z.string().nullable(),
      active: z.boolean(),
      emailAddress: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      verification: UserVerificationSchema.nullable(),
      samlConnection: z
        .object({
          id: z.string(),
          name: z.string(),
          domain: z.string(),
          active: z.boolean(),
          provider: z.string(),
          syncUserAttributes: z.boolean(),
          allowSubdomains: z.boolean(),
          allowIdpInitiated: z.boolean(),
          createdAt: z.number(),
          updatedAt: z.number(),
        })
        .nullable(),
    })
  ),
  lastActiveAt: z.number().nullable(),
  createOrganizationEnabled: z.boolean(),
  createOrganizationsLimit: z.number().nullable(),
  deleteSelfEnabled: z.boolean(),
  legalAcceptedAt: z.number().nullable(),
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
