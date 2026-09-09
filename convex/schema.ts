import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const roleValidator = v.union(
  v.literal("entrepreneur"),
  v.literal("partner"),
);

export const sourceValidator = v.union(
  v.literal("cash"),
  v.literal("mobile_money"),
  v.literal("bank"),
  v.literal("supplier"),
);

export const directionValidator = v.union(v.literal("in"), v.literal("out"));

export const consentScopeValidator = v.union(
  v.literal("aggregated_revenue"),
  v.literal("activity_trend"),
  v.literal("cashflow_summary"),
  v.literal("regularity"),
  v.literal("supplier_reliability"),
  v.literal("ai_summary"),
  v.literal("individual_transactions"),
  v.literal("personal_identity"),
);

export const consentStatusValidator = v.union(
  v.literal("pending"),
  v.literal("active"),
  v.literal("revoked"),
  v.literal("expired"),
);

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.string(),
    role: roleValidator,
    organization: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  businesses: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    sector: v.string(),
    city: v.string(),
    country: v.string(),
  }).index("by_owner", ["ownerId"]),

  transactions: defineTable({
    businessId: v.id("businesses"),
    date: v.string(),
    amount: v.number(),
    currency: v.literal("XOF"),
    source: sourceValidator,
    direction: directionValidator,
    category: v.string(),
    counterparty: v.string(),
    description: v.string(),
  })
    .index("by_business", ["businessId"])
    .index("by_business_and_date", ["businessId", "date"]),

  passports: defineTable({
    businessId: v.id("businesses"),
    generatedAt: v.number(),
    monthlyAvgRevenue: v.number(),
    lastMonthRevenue: v.number(),
    growthRate: v.number(),
    regularityScore: v.number(),
    supplierPaid: v.number(),
    supplierExpected: v.number(),
    netCashflow: v.number(),
    explanation: v.string(),
    disclaimer: v.string(),
  }).index("by_business", ["businessId"]),

  consents: defineTable({
    businessId: v.id("businesses"),
    partnerId: v.id("users"),
    partnerName: v.string(),
    scopes: v.array(consentScopeValidator),
    durationDays: v.number(),
    expiresAt: v.number(),
    status: consentStatusValidator,
    createdAt: v.number(),
  })
    .index("by_business", ["businessId"])
    .index("by_partner", ["partnerId"])
    .index("by_business_and_status", ["businessId", "status"]),

  accessLogs: defineTable({
    consentId: v.id("consents"),
    actorId: v.id("users"),
    action: v.string(),
    createdAt: v.number(),
  }).index("by_consent", ["consentId"]),
});
