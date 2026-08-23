# SMART BLOOD-BANK INVENTORY & DEMAND INTELLIGENCE PLATFORM

## Information Architecture & User Flows

**Demo / Internal Codename:** RAKTKOSH
**Official Product Name:** TBD
**Project Context:** Smart India Hackathon 2026
**Document Type:** Information Architecture & User Flows
**Version:** 1.0
**Status:** Prototype Navigation & Experience Specification

---

# 1. DOCUMENT PURPOSE

This document defines the information architecture, navigation hierarchy, screen relationships, user journeys, and primary interaction flows for the frontend prototype.

The objective is to ensure that the prototype behaves as **one coherent operational system**, rather than a collection of individually designed screens.

The architecture must support two distinct experiences:

### Experience A — Product Exploration

A user enters from the landing page and explores the platform naturally.

### Experience B — Demonstration Scenario

A judge or reviewer follows a predefined operational scenario demonstrating:

```text
DEMAND CHANGE
      ↓
FORECAST
      ↓
RISK
      ↓
NETWORK ANALYSIS
      ↓
RECOMMENDATION
      ↓
HUMAN APPROVAL
      ↓
TRANSFER
      ↓
OUTCOME
```

The second flow is the primary demonstration path.

---

# 2. ARCHITECTURE PRINCIPLE

The information architecture should follow the operational lifecycle of the product.

```text
UNDERSTAND
    ↓
MONITOR
    ↓
INVESTIGATE
    ↓
PREDICT
    ↓
IDENTIFY
    ↓
RECOMMEND
    ↓
DECIDE
    ↓
ACT
    ↓
VERIFY
```

This principle should be reflected in both navigation and screen relationships.

---

# 3. TOP-LEVEL INFORMATION ARCHITECTURE

```text
ROOT
│
├── LANDING
│
├── APPLICATION
│   │
│   ├── DASHBOARD
│   │
│   ├── INVENTORY
│   │   └── INVENTORY DETAIL
│   │
│   ├── REQUESTS
│   │   └── REQUEST DETAIL
│   │
│   ├── TRANSFERS
│   │   └── TRANSFER DETAIL
│   │
│   ├── FORECAST
│   │   └── FORECAST DETAIL
│   │
│   ├── RISK
│   │   └── RISK DETAIL
│   │
│   ├── RECOMMENDATIONS
│   │   └── RECOMMENDATION DETAIL
│   │
│   ├── SIMULATION
│   │   └── SCENARIO DETAIL
│   │
│   └── AUDIT
│       └── AUDIT EVENT DETAIL
│
└── INFORMATION
    ├── PRIVACY
    └── TERMS
```

---

# 4. ROUTE MAP

The prototype should use the following logical route structure:

```text
/
Landing

/dashboard
Operational Dashboard

/inventory
Inventory

/inventory/:id
Inventory Detail

/requests
Requests

/requests/:id
Request Detail

/transfers
Transfers

/transfers/:id
Transfer Detail

/forecast
Forecast

/forecast/:id
Forecast Detail

/risk
Risk Intelligence

/risk/:id
Risk Detail

/recommendations
Recommendations

/recommendations/:id
Recommendation Detail

/simulation
Simulation

/simulation/:scenario
Simulation Scenario

/audit
Audit Trail

/privacy
Privacy

/terms
Terms
```

These routes represent the logical architecture.

The final implementation may use drawers, modals, or nested views instead of separate browser navigation for some detail states.

---

# 5. APPLICATION SHELL

Once the user enters the operational platform, the application should use a persistent shell.

```text
┌──────────────────────────────────────────────────────┐
│ HEADER / CONTEXT                                     │
├──────────────┬───────────────────────────────────────┤
│              │                                       │
│ NAVIGATION   │             MAIN CONTENT              │
│              │                                       │
│              │                                       │
│              │                                       │
├──────────────┴───────────────────────────────────────┤
│ OPTIONAL STATUS / SYSTEM CONTEXT                     │
└──────────────────────────────────────────────────────┘
```

The shell should remain consistent across operational screens.

---

# 6. PRIMARY NAVIGATION

The primary navigation contains:

```text
DASHBOARD
INVENTORY
REQUESTS
TRANSFERS
FORECAST
RISK
RECOMMENDATIONS
SIMULATION
AUDIT
```

The navigation should be ordered according to operational importance.

---

# 7. NAVIGATION HIERARCHY

The hierarchy should communicate:

```text
WHERE AM I?
      ↓
WHAT IS HAPPENING?
      ↓
WHAT NEEDS ATTENTION?
      ↓
WHAT CAN I DO?
```

Recommended ordering:

### Monitoring

Dashboard

Inventory

### Operations

Requests

Transfers

### Intelligence

Forecast

Risk

Recommendations

### Demonstration

Simulation

### Accountability

Audit

---

# 8. LANDING PAGE

## Purpose

The landing page is the entry point for unfamiliar users.

It should communicate:

1. What the platform does.
2. Why the problem matters.
3. How the system works.
4. What the actual product looks like.
5. How to enter the prototype.

---

## Landing Navigation

```text
LANDING
│
├── Overview
├── How It Works
├── Product Preview
├── Simulation Preview
└── Enter Platform
```

The landing page does not need multiple marketing pages.

---

# 9. LANDING → APPLICATION FLOW

Primary path:

```text
LANDING
   ↓
ENTER PLATFORM
   ↓
DASHBOARD
```

Alternative:

```text
LANDING
   ↓
RUN DEMO
   ↓
SIMULATION
```

This gives the user two entry points:

### Explore

Enter the actual operational environment.

### Demonstrate

Immediately experience the core scenario.

---

# 10. DASHBOARD INFORMATION ARCHITECTURE

The dashboard is the central information hub.

```text
DASHBOARD
│
├── Network Status
│
├── Critical Risks
│
├── Pending Actions
│
├── Inventory Overview
│
├── Demand / Forecast Overview
│
├── Requests
│
├── Transfers
│
└── Recent Activity
```

The dashboard should act as a launch point into deeper information.

---

# 11. DASHBOARD DECISION FLOW

A user should be able to follow:

```text
DASHBOARD
   ↓
SEE CRITICAL RISK
   ↓
OPEN RISK
   ↓
UNDERSTAND CAUSE
   ↓
VIEW FORECAST
   ↓
VIEW NETWORK AVAILABILITY
   ↓
VIEW RECOMMENDATION
```

This is one of the most important cross-screen flows in the product.

---

# 12. INVENTORY ARCHITECTURE

```text
INVENTORY
│
├── Network Inventory
│
├── Hospital Filter
│
├── Blood Group Filter
│
├── Component Filter
│
├── Status Filter
│
├── Expiry Filter
│
└── Inventory Records
     │
     └── Inventory Detail
```

---

# 13. INVENTORY → DETAIL FLOW

```text
INVENTORY
   ↓
SELECT RECORD
   ↓
DETAIL DRAWER
   ↓
VIEW:
    Facility
    Component
    Blood Group
    Available
    Reserved
    Expiry
    Risk
    Recent Changes
```

From the detail view the user may continue toward:

```text
RELATED REQUEST
RELATED RISK
RELATED TRANSFER
```

---

# 14. REQUEST ARCHITECTURE

```text
REQUESTS
│
├── All Requests
├── Pending
├── In Review
├── Matched
├── Approved
├── Fulfilled
└── Request Records
      │
      └── Request Detail
```

---

# 15. REQUEST → SUPPLY MATCH FLOW

```text
REQUEST
   ↓
VIEW REQUEST
   ↓
MATCH SUPPLY
   ↓
NETWORK INVENTORY
   ↓
POTENTIAL SOURCE FACILITIES
   ↓
SELECT / REVIEW MATCH
   ↓
GENERATE RECOMMENDATION
```

The recommendation is generated from the relationship between:

```text
REQUEST
+
INVENTORY
+
FORECAST
+
RISK
+
NETWORK
```

---

# 16. TRANSFER ARCHITECTURE

```text
TRANSFERS
│
├── Pending
├── In Review
├── Approved
├── In Transit
├── Completed
└── Transfer Records
      │
      └── Transfer Detail
```

---

# 17. TRANSFER → APPROVAL FLOW

```text
TRANSFER
   ↓
VIEW DETAILS
   ↓
REVIEW:
    Source
    Destination
    Component
    Quantity
    Reason
    Risk
   ↓
APPROVE
   OR
MODIFY
   OR
REJECT
```

---

# 18. APPROVED TRANSFER FLOW

When a transfer is approved:

```text
APPROVAL
   ↓
TRANSFER STATUS UPDATED
   ↓
SOURCE INVENTORY UPDATED
   ↓
DESTINATION INVENTORY UPDATED
   ↓
RISK RECALCULATED
   ↓
DASHBOARD UPDATED
   ↓
AUDIT EVENT CREATED
```

This state propagation is essential.

---

# 19. FORECAST ARCHITECTURE

```text
FORECAST
│
├── Facility
├── Blood Group
├── Component
├── Historical Demand
├── Current Demand
├── Forecast
├── Risk Horizon
└── Forecast Detail
```

---

# 20. FORECAST → RISK FLOW

```text
FORECAST
   ↓
PROJECTED DEMAND
   ↓
COMPARE WITH AVAILABLE INVENTORY
   ↓
PROJECTED GAP
   ↓
RISK GENERATED
```

The interface should make this relationship visible.

---

# 21. RISK ARCHITECTURE

```text
RISK
│
├── All Risks
├── Critical
├── High
├── Moderate
├── Low
└── Risk Records
      │
      └── Risk Detail
```

---

# 22. RISK DETAIL ARCHITECTURE

A risk detail view should answer:

```text
WHAT IS HAPPENING?
        ↓
WHY?
        ↓
WHEN?
        ↓
WHAT IS AFFECTED?
        ↓
WHAT IS AVAILABLE ELSEWHERE?
        ↓
WHAT COULD BE DONE?
```

---

# 23. RISK → NETWORK FLOW

```text
RISK
   ↓
IDENTIFY AFFECTED COMPONENT
   ↓
CHECK NETWORK INVENTORY
   ↓
FIND POTENTIAL SURPLUS
   ↓
COMPARE:
    Quantity
    Demand
    Risk
    Availability
   ↓
POTENTIAL MATCH
```

---

# 24. RECOMMENDATION ARCHITECTURE

```text
RECOMMENDATIONS
│
├── Critical
├── High
├── Pending Review
├── Approved
├── Rejected
└── Recommendation Records
       │
       └── Recommendation Detail
```

---

# 25. RECOMMENDATION DETAIL

The recommendation page must establish:

```text
CONTEXT
   ↓
SYSTEM FINDING
   ↓
SUGGESTED ACTION
   ↓
REASONING
   ↓
EXPECTED IMPACT
   ↓
HUMAN DECISION
```

---

# 26. RECOMMENDATION → ACTION FLOW

```text
RECOMMENDATION
      ↓
REVIEW
      ↓
┌──────────────┬──────────────┬──────────────┐
│              │              │              │
APPROVE       MODIFY        REJECT
│              │              │
↓              ↓              ↓
TRANSFER      UPDATED       CLOSED
CREATED       ACTION
│
↓
EXECUTION
```

---

# 27. SIMULATION ARCHITECTURE

Simulation is a separate functional area because it provides controlled demonstration of system intelligence.

```text
SIMULATION
│
├── Scenario Selection
│
├── Scenario Description
│
├── Current State
│
├── Trigger
│
├── System Response
│
├── Recommendation
│
├── Outcome
│
└── Reset
```

---

# 28. SIMULATION SCENARIOS

The prototype should initially support:

```text
SCENARIO 01
Normal Operations

SCENARIO 02
Emergency Demand Spike

SCENARIO 03
Supply Disruption

SCENARIO 04
Expiry Cluster

SCENARIO 05
Multi-Hospital Shortage
```

---

# 29. PRIMARY SIMULATION FLOW

```text
SIMULATION
   ↓
SELECT SCENARIO
   ↓
REVIEW INITIAL STATE
   ↓
START SCENARIO
   ↓
EVENT OCCURS
   ↓
SYSTEM STATE CHANGES
   ↓
FORECAST UPDATES
   ↓
RISK UPDATES
   ↓
NETWORK ANALYSIS
   ↓
RECOMMENDATION
   ↓
HUMAN REVIEW
   ↓
ACTION
   ↓
OUTCOME
```

---

# 30. AUDIT ARCHITECTURE

```text
AUDIT
│
├── Recent Events
├── Requests
├── Recommendations
├── Transfers
├── Inventory Changes
├── Risk Events
└── Event Detail
```

---

# 31. AUDIT → TRACEABILITY FLOW

Example:

```text
TRANSFER COMPLETED
        ↓
AUDIT EVENT
        ↓
SOURCE INVENTORY CHANGE
        ↓
DESTINATION INVENTORY CHANGE
        ↓
RISK CHANGE
```

The audit trail provides evidence that the simulated action affected the rest of the system.

---

# 32. CORE RELATIONSHIP MODEL

The architecture should make these relationships explicit:

```text
HOSPITAL
   │
   ├── INVENTORY
   │
   ├── REQUESTS
   │
   ├── RISKS
   │
   └── TRANSFERS
```

Across the network:

```text
HOSPITAL A
     │
     │
     ├──── NETWORK ────┤
     │                 │
HOSPITAL B         HOSPITAL C
```

For the current prototype:

```text
HOSPITAL A
     ↕
HOSPITAL B
```

Only two facilities are required.

---

# 33. CORE DATA RELATIONSHIP

The product's intelligence is based on the relationship:

```text
INVENTORY
     +
DEMAND
     +
REQUESTS
     +
FORECAST
     +
RISK
     +
NETWORK AVAILABILITY
     ↓
RECOMMENDATION
```

The architecture must preserve these relationships.

---

# 34. PRIMARY HERO FLOW

The most important flow in the entire prototype is:

```text
┌─────────────────────────┐
│       DASHBOARD         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│    CRITICAL RISK        │
│      DETECTED           │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     RISK DETAIL         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│       FORECAST          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ NETWORK AVAILABILITY    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│    RECOMMENDATION       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│    HUMAN REVIEW         │
└───────┬─────────┬───────┘
        │         │
    APPROVE     REJECT
        │
        ▼
┌─────────────────────────┐
│     TRANSFER            │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     STATE UPDATE        │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      OUTCOME            │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      AUDIT TRAIL        │
└─────────────────────────┘
```

This is the canonical demonstration flow.

---

# 35. HERO SCENARIO

## Initial State

### Hospital A

```text
O− PRBC

Available:
Low

Demand:
Increasing

Risk:
Moderate
```

### Hospital B

```text
O− PRBC

Available:
Healthy

Demand:
Stable

Risk:
Normal
```

---

# 36. TRIGGER EVENT

The operator activates:

**EMERGENCY DEMAND SPIKE**

Hospital A experiences a sudden increase in demand.

---

# 37. SYSTEM RESPONSE

The system recalculates:

```text
Demand
   ↓
Forecast
   ↓
Inventory Projection
   ↓
Risk
```

The result:

```text
Hospital A

Risk:
MODERATE → CRITICAL
```

---

# 38. NETWORK RESPONSE

The system checks Hospital B.

```text
Hospital B

Available inventory:
Sufficient

Projected demand:
Stable

Potential surplus:
Available
```

The system identifies a potential redistribution opportunity.

---

# 39. RECOMMENDATION

The system generates:

```text
TRANSFER RECOMMENDATION

20 × O− PRBC

Hospital B
      ↓
Hospital A

Reason:

Hospital A is projected to
fall below the required inventory
threshold within the forecast horizon.

Expected impact:

Hospital A risk:
CRITICAL → LOWER RISK
```

---

# 40. HUMAN DECISION

The operator reviews the recommendation.

Available actions:

```text
APPROVE
MODIFY
REJECT
```

The primary demo uses:

**APPROVE**

---

# 41. STATE PROPAGATION

After approval:

```text
Hospital B inventory
      ↓
-20

Hospital A inventory
      ↓
+20

Transfer
      ↓
COMPLETED

Hospital A risk
      ↓
CRITICAL → LOWER

Audit
      ↓
NEW EVENT
```

---

# 42. OUTCOME VIEW

The final outcome should show:

```text
BEFORE

Hospital A
CRITICAL

Hospital B
SURPLUS


AFTER

Hospital A
LOWER RISK

Hospital B
HEALTHY

Transfer
COMPLETED
```

This creates a visible before/after story.

---

# 43. SECONDARY EXPLORATION FLOW

A user exploring the application manually may follow:

```text
DASHBOARD
   ↓
INVENTORY
   ↓
SELECT HOSPITAL
   ↓
SELECT COMPONENT
   ↓
VIEW INVENTORY
   ↓
VIEW EXPIRY
   ↓
VIEW RISK
   ↓
VIEW RELATED REQUEST
```

---

# 44. REQUEST-DRIVEN FLOW

```text
REQUESTS
   ↓
SELECT REQUEST
   ↓
VIEW REQUIREMENT
   ↓
MATCH SUPPLY
   ↓
NETWORK INVENTORY
   ↓
POTENTIAL SOURCE
   ↓
RECOMMENDATION
   ↓
APPROVAL
```

---

# 45. FORECAST-DRIVEN FLOW

```text
FORECAST
   ↓
SELECT FACILITY
   ↓
SELECT COMPONENT
   ↓
VIEW DEMAND TREND
   ↓
VIEW FORECAST
   ↓
PROJECTED GAP
   ↓
VIEW RISK
   ↓
VIEW RECOMMENDATION
```

---

# 46. RISK-DRIVEN FLOW

```text
RISK
   ↓
SELECT CRITICAL RISK
   ↓
VIEW CAUSE
   ↓
VIEW FORECAST
   ↓
VIEW INVENTORY
   ↓
VIEW NETWORK
   ↓
VIEW RECOMMENDATION
```

---

# 47. TRANSFER-DRIVEN FLOW

```text
TRANSFERS
   ↓
SELECT PENDING TRANSFER
   ↓
VIEW SOURCE
   ↓
VIEW DESTINATION
   ↓
VIEW REASON
   ↓
VIEW EXPECTED IMPACT
   ↓
APPROVE
   ↓
STATE UPDATE
```

---

# 48. AUDIT-DRIVEN FLOW

```text
AUDIT
   ↓
SELECT EVENT
   ↓
VIEW ENTITY
   ↓
VIEW PREVIOUS STATE
   ↓
VIEW ACTION
   ↓
VIEW RESULT
```

---

# 49. CROSS-NAVIGATION

The system should allow users to move between related information.

For example:

```text
RISK
 ↓
FORECAST
 ↓
INVENTORY
 ↓
REQUEST
 ↓
RECOMMENDATION
 ↓
TRANSFER
```

Similarly:

```text
REQUEST
 ↓
INVENTORY
 ↓
RECOMMENDATION
 ↓
TRANSFER
```

And:

```text
TRANSFER
 ↓
INVENTORY
 ↓
RISK
 ↓
AUDIT
```

This makes the application feel interconnected.

---

# 50. BACK NAVIGATION PRINCIPLE

Users should not lose context when investigating an issue.

For example:

```text
Dashboard
   ↓
Risk
   ↓
Forecast
   ↓
Back
   ↓
Risk
```

The user should return to the relevant context rather than restarting the workflow.

---

# 51. DETAIL DRAWER PRINCIPLE

Whenever possible, operational details should open without removing the underlying page context.

Example:

```text
INVENTORY TABLE
       ↓
SELECT ROW
       ↓
DETAIL DRAWER
       ↓
CLOSE
       ↓
INVENTORY TABLE
```

This supports fast operational investigation.

---

# 52. SEARCH & FILTER ARCHITECTURE

Search and filtering should exist primarily on:

```text
Inventory
Requests
Transfers
Risk
Recommendations
Audit
```

Filters should reflect the actual information model.

Examples:

### Inventory

```text
Hospital
Blood Group
Component
Risk
Expiry
```

### Requests

```text
Hospital
Priority
Blood Group
Component
Status
```

### Transfers

```text
Source
Destination
Component
Status
```

---

# 53. GLOBAL SYSTEM CONTEXT

The application should maintain visible context regarding:

```text
Current facility/network
Simulation state
Synthetic data status
Last updated time
```

The user should never be uncertain whether they are viewing:

**real data**

or

**simulation data.**

The prototype must always communicate:

**SYNTHETIC DATA / SIMULATION**

where relevant.

---

# 54. STATE MANAGEMENT PRINCIPLE

All major screens should derive from the same underlying prototype state.

Conceptually:

```text
GLOBAL MOCK STATE
       │
       ├── Hospitals
       ├── Inventory
       ├── Requests
       ├── Transfers
       ├── Forecasts
       ├── Risks
       ├── Recommendations
       ├── Scenarios
       └── Audit Events
```

A state-changing action should propagate through the relevant views.

---

# 55. STATE UPDATE FLOW

Example:

```text
APPROVE TRANSFER
      ↓
UPDATE TRANSFER
      ↓
UPDATE SOURCE INVENTORY
      ↓
UPDATE DESTINATION INVENTORY
      ↓
RECALCULATE RISK
      ↓
UPDATE RECOMMENDATION
      ↓
CREATE AUDIT EVENT
      ↓
REFRESH DASHBOARD
```

---

# 56. ERROR RECOVERY FLOW

If a simulated operation fails:

```text
ACTION
  ↓
ERROR
  ↓
EXPLANATION
  ↓
RETRY
  OR
CANCEL
```

The user should remain within the current context.

---

# 57. RESET FLOW

The simulation must support:

```text
CURRENT SIMULATION
       ↓
RESET
       ↓
CONFIRM
       ↓
RESTORE BASELINE
       ↓
DASHBOARD UPDATED
```

Resetting should return all affected mock state to the original scenario state.

---

# 58. MOBILE INFORMATION ARCHITECTURE

On smaller screens, the hierarchy should prioritize:

```text
CRITICAL INFORMATION
      ↓
ACTION REQUIRED
      ↓
CURRENT STATE
      ↓
DETAIL
```

The full desktop navigation may transform into a compact navigation mechanism.

However, all P0 workflows must remain accessible.

---

# 59. ACCESSIBILITY FLOW

Keyboard users should be able to move through:

```text
NAVIGATION
   ↓
PRIMARY CONTENT
   ↓
ACTION
   ↓
DETAIL
```

Focus should remain visible.

Dialogs and drawers must maintain logical focus behavior.

---

# 60. USER FLOW PRINCIPLES

Every major flow should satisfy five principles:

### 1. Context

The user knows where they are.

### 2. Cause

The user understands why something is happening.

### 3. Evidence

The user can inspect supporting information.

### 4. Action

The user knows what can be done.

### 5. Outcome

The user can see what happened after acting.

---

# 61. INFORMATION ARCHITECTURE TEST

A new user should be able to answer:

```text
WHERE AM I?
WHAT IS HAPPENING?
WHAT NEEDS ATTENTION?
WHY DOES IT MATTER?
WHAT CAN I DO?
WHAT WILL HAPPEN IF I DO IT?
```

If the architecture prevents any of these questions from being answered, the relevant flow should be redesigned.

---

# 62. PROTOTYPE NAVIGATION SUMMARY

The complete architecture can be represented as:

```text
                    LANDING
                       │
                       ▼
                   DASHBOARD
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    INVENTORY       REQUESTS        RISK
        │              │              │
        └───────┬──────┴──────┬───────┘
                │             │
                ▼             ▼
             FORECAST     NETWORK
                │             │
                └──────┬──────┘
                       │
                       ▼
                RECOMMENDATION
                       │
                       ▼
                HUMAN REVIEW
                       │
             ┌─────────┼─────────┐
             │         │         │
             ▼         ▼         ▼
          APPROVE    MODIFY    REJECT
             │
             ▼
          TRANSFER
             │
             ▼
        STATE UPDATE
             │
       ┌─────┼─────┐
       ▼     ▼     ▼
  INVENTORY RISK  AUDIT
       │     │     │
       └─────┴─────┘
             │
             ▼
           OUTCOME
```

---

# 63. PRIMARY DEMO FLOW SUMMARY

For the actual SIH presentation, the recommended flow is:

```text
LANDING
   ↓
ENTER PLATFORM
   ↓
DASHBOARD
   ↓
CRITICAL RISK
   ↓
RISK DETAIL
   ↓
FORECAST
   ↓
NETWORK INVENTORY
   ↓
RECOMMENDATION
   ↓
EXPLAINABILITY
   ↓
APPROVE
   ↓
TRANSFER
   ↓
INVENTORY UPDATE
   ↓
RISK REDUCTION
   ↓
AUDIT TRAIL
```

This should be rehearsed as the primary product demonstration.

---

# 64. ALTERNATIVE FAST DEMO FLOW

If presentation time is extremely limited:

```text
LANDING
   ↓
RUN DEMO
   ↓
EMERGENCY DEMAND SPIKE
   ↓
RISK ESCALATION
   ↓
RECOMMENDATION
   ↓
APPROVE
   ↓
OUTCOME
```

This provides the shortest path to demonstrating the central value proposition.

---

# 65. ARCHITECTURAL NORTH STAR

The information architecture must ensure that the prototype never feels like:

```text
PAGE 1
PAGE 2
PAGE 3
PAGE 4
```

Instead, it must feel like:

```text
ONE OPERATIONAL SYSTEM
        ↓
CONNECTED INFORMATION
        ↓
CONNECTED DECISIONS
        ↓
CONNECTED ACTIONS
        ↓
CONNECTED OUTCOMES
```

---

# 66. FINAL USER EXPERIENCE DEFINITION

The complete prototype experience should allow the user to move naturally from:

> **understanding the situation**

to

> **investigating the cause**

to

> **examining the evidence**

to

> **reviewing the recommendation**

to

> **making a decision**

to

> **observing the simulated outcome.**

That sequence is the fundamental architecture of the product.

---

# 67. DOCUMENT RELATIONSHIP

This document defines **where information lives and how users move through it**.

It works with the previous and subsequent project documents:

```text
PRODUCT BRIEF
      ↓
PROTOTYPE PRD
      ↓
UX / UI DESIGN SYSTEM
      ↓
INFORMATION ARCHITECTURE & USER FLOWS
      ↓
MOCK DATA & DATA MODEL
      ↓
INTELLIGENCE & SIMULATION
      ↓
DEMO SCRIPT
```

The PRD defines **what must exist**.

The UX/UI document defines **how it should look**.

This document defines **where it lives and how it connects**.

The next document will define **the actual data that powers those screens and the relationships between every mock entity**.
