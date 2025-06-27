export const roles = {
    admin: {
      can: [
        'account.changePassword',
        'account.ban',
        'post.write',
        'giftcode.create.1',
        'giftcode.create.11',
        'topup.history',
        'support.access',
      ],
    },
    mod: {
      can: [
        'post.write',
        'giftcode.create.1',
        'topup.history',
        'support.access',
      ],
    },
  };
  