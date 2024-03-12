import { ponder } from "@/generated";

ponder.on("AraLocker:Staked", async ({ event, context }) => {
  const { db } = context;

  const existingUser = await db.User.findUnique({
    id: event.args._user,
  });
  if (!existingUser) {
    await db.User.create({
      id: event.args._user,
      data: {
        lockedBalance: event.args._lockedAmount,
      },
    });
  }
  const createPromise = db.Locks.create({
    id: event.log.transactionHash,
    data: {
      amount: event.args._lockedAmount,
      userId: event.args._user,
    },
  });

  if (existingUser) {
    await db.User.update({
      id: event.args._user,
      data: {
        lockedBalance:
          (existingUser?.lockedBalance ?? 0n) + event.args._lockedAmount,
      },
    });
  }
  await createPromise;
});

ponder.on("AraLocker:Withdrawn", async ({ event, context }) => {
  const { db } = context;

  const existingUser = await db.User.findUnique({
    id: event.args._user,
  });
  if (!existingUser) {
    throw new Error("User not found");
  }
  await db.User.update({
    id: event.args._user,
    data: {
      lockedBalance: existingUser.lockedBalance - event.args._amount,
    },
  });
  await db.Withdraws.create({
    id: event.log.transactionHash,
    data: {
      amount: event.args._amount,
      userId: event.args._user,
    },
  });
});
