import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  User: p.createTable({
    id: p.string(),
    lockedBalance: p.bigint(),
    locks: p.many("Locks.userId"),
    withdraws: p.many("Withdraws.userId"),
  }),
  Locks: p.createTable({
    id: p.string(),
    amount: p.bigint(),
    userId: p.string().references("User.id"),
  }),
  Withdraws: p.createTable({
    id: p.string(),
    amount: p.bigint(),
    userId: p.string().references("User.id"),
  }),
}));
