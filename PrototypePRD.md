# SMART BLOOD-BANK INVENTORY & DEMAND INTELLIGENCE PLATFORM

## Prototype Product Requirements Document

**Demo / Internal Codename:** RAKTKOSH
**Official Product Name:** TBD
**Project Context:** Smart India Hackathon 2026
**Document Type:** Prototype PRD
**Version:** 1.0
**Status:** Frontend Prototype Specification

---

# 1. DOCUMENT PURPOSE

This document defines the functional and experience requirements for the high-fidelity frontend prototype of the Smart Blood-Bank Inventory & Demand Intelligence Platform.

The prototype is intended to demonstrate the proposed system through a realistic, interactive environment using synthetic data.

It is not a production implementation.

The primary objective is to allow users, reviewers, and judges to understand the complete operational intelligence workflow:

```text
CURRENT STATE
      ↓
DEMAND
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
ACTION
      ↓
OUTCOME
```

---

# 2. PRODUCT OBJECTIVE

The prototype must demonstrate that a blood-bank coordination platform can move beyond static inventory visibility by connecting:

* current inventory
* demand
* future demand
* requests
* expiry risk
* facility-level risk
* network-level availability
* explainable recommendations
* human-approved actions

The prototype should make this relationship understandable through interaction rather than relying entirely on verbal explanation.

---

# 3. PROTOTYPE GOALS

## Primary Goals

The prototype must:

1. Clearly explain the problem and proposed solution.
2. Present a credible operational dashboard.
3. Simulate two connected hospitals.
4. Display realistic blood inventory.
5. Support simulated blood requests.
6. Demonstrate inter-hospital transfers.
7. Display demand forecasting.
8. Detect simulated risk conditions.
9. Generate explainable recommendations.
10. Allow human approval of recommendations.
11. Update simulated inventory after approved actions.
12. Provide a simulation environment for emergency scenarios.
13. Provide an audit trail of important system events.
14. Demonstrate the complete product story in approximately 3–5 minutes.

---

# 4. PROTOTYPE NON-GOALS

The prototype will NOT implement:

* production authentication
* production PostgreSQL
* real hospital APIs
* real blood-bank integrations
* real-time hospital data
* production ML infrastructure
* actual clinical decision-making
* actual blood-transfer execution
* government-system integration
* real patient data
* production-grade notifications
* production infrastructure

All data and actions are simulated.

---

# 5. TARGET USERS

The prototype should primarily represent the workflows of:

## 5.1 Blood-Bank Operator

Responsible for monitoring:

* inventory
* expiry
* requests
* shortages
* transfers
* operational alerts

## 5.2 Hospital Coordinator

Responsible for:

* raising blood requests
* viewing availability
* monitoring fulfilment
* reviewing facility-level information

## 5.3 Network Coordinator

Responsible for:

* monitoring multiple facilities
* identifying network imbalance
* reviewing transfer opportunities
* coordinating redistribution

## 5.4 Decision Maker

Responsible for reviewing system recommendations and approving or rejecting proposed actions.

For the prototype, these roles do not require separate authentication systems.

---

# 6. CORE USER JOURNEY

The primary application journey is:

```text
LANDING
   ↓
DASHBOARD
   ↓
NETWORK OVERVIEW
   ↓
INVENTORY
   ↓
REQUESTS
   ↓
FORECAST
   ↓
RISK
   ↓
RECOMMENDATION
   ↓
APPROVAL
   ↓
TRANSFER
   ↓
UPDATED INVENTORY
   ↓
AUDIT
```

The primary simulation journey is:

```text
SIMULATION
   ↓
SELECT SCENARIO
   ↓
TRIGGER EVENT
   ↓
DEMAND / SUPPLY CHANGES
   ↓
FORECAST UPDATES
   ↓
RISK CHANGES
   ↓
NETWORK ANALYSIS
   ↓
RECOMMENDATION
   ↓
HUMAN APPROVAL
   ↓
SIMULATED ACTION
   ↓
OUTCOME
```

---

# 7. APPLICATION STRUCTURE

The prototype will contain the following major routes/screens:

```text
/
Landing Page

/dashboard
Home / Operational Dashboard

/inventory
Inventory

/requests
Blood Requests

/transfers
Transfers

/forecast
Demand Forecast

/risk
Risk Intelligence

/recommendations
Decision Support / Recommendations

/simulation
Simulation Lab

/audit
Audit Trail

/privacy
Privacy

/terms
Terms
```

The exact navigation presentation will be defined by the UX/UI and Information Architecture documents.

---

# 8. LANDING PAGE

## Purpose

The landing page introduces the problem, explains the solution, and provides immediate access to the actual prototype.

It must NOT behave like a generic SaaS marketing page.

---

## Required Sections

### 8.1 Hero

Communicate:

* the blood-bank coordination problem
* the core product proposition
* a direct route into the product

Primary action:

**ENTER PLATFORM**

Secondary action:

**RUN DEMO SCENARIO**

---

### 8.2 Problem Context

Demonstrate the relationship between:

```text
SURPLUS
    ↕
NETWORK
    ↕
SHORTAGE
```

Explain that supply may exist within the network while a particular facility experiences shortage.

---

### 8.3 Core Workflow

Display:

```text
PREDICT
   ↓
DETECT
   ↓
EXPLAIN
   ↓
RECOMMEND
   ↓
APPROVE
   ↓
ACT
```

---

### 8.4 Product Preview

Show a real interface preview rather than decorative feature cards.

Possible preview elements:

* inventory status
* risk alert
* forecast
* recommendation
* network transfer

---

### 8.5 Synthetic Data Notice

Clearly communicate that the prototype uses synthetic demonstration data.

---

# 9. DASHBOARD

## Purpose

The dashboard is the primary operational command center.

The user should understand the network condition within seconds.

---

## Required Information

### Network Status

Display:

* operational status
* simulated facilities
* last synchronization time

---

### Key Metrics

At minimum:

* total inventory
* critical risks
* pending requests
* pending transfers
* units expiring soon

---

### Critical Alerts

Display the most important active risks.

Example:

```text
O− PRBC
Hospital A

Projected shortage:
18 hours

Risk:
CRITICAL
```

---

### Pending Actions

Display recommendations or requests requiring attention.

---

### Demand Overview

Provide a compact visualization of demand trends.

---

### Network Overview

Display both simulated hospitals and relevant operational status.

---

## Dashboard Actions

Users should be able to navigate directly to:

* inventory
* requests
* transfers
* forecast
* risk
* recommendations
* simulation

---

# 10. INVENTORY

## Purpose

Provide detailed visibility into blood inventory.

---

## Required Filters

* hospital
* blood group
* component
* status
* expiry

---

## Inventory Table

Minimum fields:

```text
Blood Group
Component
Available
Reserved
Expiring Soon
Risk
Last Updated
```

---

## Inventory Detail

Selecting an inventory record should reveal additional information such as:

* facility
* blood group
* component
* available units
* reserved units
* expiry information
* recent changes
* associated requests
* current risk

---

## Required States

* normal
* low
* critical
* expiring
* empty
* loading

---

# 11. REQUESTS

## Purpose

Represent blood requirements originating from hospitals.

---

## Request List

Each request should display:

* request ID
* hospital
* blood group
* component
* quantity
* priority
* required-by time
* status

---

## Request Detail

Display:

* request information
* requesting hospital
* current network availability
* relevant inventory
* risk context
* potential matching facilities

---

## Request Actions

Prototype actions:

**VIEW**

**MATCH SUPPLY**

**GENERATE RECOMMENDATION**

---

## Request States

```text
PENDING
MATCHED
IN REVIEW
APPROVED
FULFILLED
CANCELLED
```

---

# 12. TRANSFERS

## Purpose

Represent inter-hospital redistribution of blood components.

---

## Transfer List

Display:

* transfer ID
* source
* destination
* component
* quantity
* reason
* status
* timestamp

---

## Transfer Detail

Example:

```text
Riverside Medical
       ↓
20 × O− PRBC
       ↓
Apollo Central

Reason:
Projected critical shortage

Status:
Pending Approval
```

---

## Transfer Actions

Depending on status:

* approve
* modify
* reject
* view details

---

## Transfer State Changes

After approval:

```text
SOURCE INVENTORY
       ↓
quantity decreases

DESTINATION INVENTORY
       ↓
quantity increases

TRANSFER
       ↓
COMPLETED

RISK
       ↓
recalculated
```

These changes must be reflected throughout the prototype.

---

# 13. FORECAST

## Purpose

Demonstrate anticipated demand rather than only current inventory.

---

## Required Information

For selected hospital/component:

* historical demand
* current demand
* forecast
* forecast horizon
* trend
* confidence indicator
* projected shortage point

---

## Primary Visualization

A time-series chart showing:

```text
Historical
    ↓
Current
    ↓
Forecast
```

The chart should visually distinguish historical information from projected information.

---

## Forecast Explanation

The interface should explain the main factors influencing the forecast.

Example:

```text
Forecast influenced by:

Recent demand
Current requests
Historical pattern
Scenario conditions
```

---

# 14. RISK INTELLIGENCE

## Purpose

Identify situations that require attention.

---

## Risk Categories

At minimum:

### Shortage Risk

Potential future inability to satisfy demand.

### Expiry Risk

Inventory approaching expiry.

### Demand Spike

Unexpected increase in demand.

### Network Imbalance

Potential surplus at one facility while another experiences shortage.

---

## Risk Levels

```text
NORMAL
LOW
MODERATE
HIGH
CRITICAL
```

---

## Risk Detail

Each risk should explain:

* what is happening
* why it matters
* when it may become critical
* contributing factors
* relevant inventory
* relevant demand
* available network alternatives
* recommended next step

---

# 15. RECOMMENDATIONS / DECISION SUPPORT

## Purpose

Provide the most important intelligence output of the prototype.

The recommendation interface should demonstrate that the system converts analysis into an actionable suggestion.

---

## Recommendation Structure

Each recommendation should include:

```text
Recommendation ID

Priority

Suggested Action

Source Facility

Destination Facility

Blood Group

Component

Quantity

Reason

Risk Context

Expected Impact

Confidence / Supporting Evidence

Status
```

---

## Example

```text
RECOMMENDATION #REC-024

CRITICAL

Transfer 20 units of O− PRBC

FROM
Riverside Medical

TO
Apollo Central

REASON

Apollo Central is projected to
fall below its required threshold
within the forecast horizon.

NETWORK CONTEXT

Riverside currently has sufficient
surplus inventory for the proposed
transfer.

EXPECTED IMPACT

Apollo risk:
CRITICAL → LOW
```

---

## Human Control

The recommendation must provide:

**APPROVE**

**MODIFY**

**REJECT**

The prototype must never imply that the AI automatically executes a real-world action.

---

# 16. SIMULATION LAB

## Purpose

The Simulation Lab is the primary mechanism for demonstrating the intelligence of the proposed system.

It allows the user to intentionally change the simulated environment and observe the system response.

---

## Required Scenarios

### Scenario 01 — Normal Operations

Represents stable demand and inventory.

---

### Scenario 02 — Emergency Demand Spike

Sudden increase in demand for a selected blood component.

Expected response:

```text
Demand ↑
   ↓
Forecast ↑
   ↓
Available Stock ↓
   ↓
Risk ↑
   ↓
Network Search
   ↓
Recommendation
```

---

### Scenario 03 — Supply Disruption

Reduces incoming or available supply at a facility.

---

### Scenario 04 — Expiry Cluster

Introduces a large quantity of inventory approaching expiry.

Expected response:

* expiry risk increases
* affected inventory is highlighted
* potential redistribution opportunity may appear

---

### Scenario 05 — Multi-Hospital Shortage

Creates simultaneous demand pressure across facilities.

This demonstrates that the system must prioritize competing requirements.

---

# 17. SIMULATION CONTROLS

The user should be able to:

* select scenario
* review scenario description
* start scenario
* pause where appropriate
* observe state changes
* inspect system response
* reset scenario

The interface must clearly indicate:

> **SIMULATION MODE — SYNTHETIC DATA**

---

# 18. AUDIT TRAIL

## Purpose

Demonstrate traceability of important system actions.

---

## Events

The audit trail should include events such as:

```text
REQUEST CREATED
RISK DETECTED
FORECAST UPDATED
RECOMMENDATION GENERATED
RECOMMENDATION APPROVED
TRANSFER INITIATED
TRANSFER COMPLETED
INVENTORY UPDATED
RISK REASSESSED
```

---

## Audit Record

Minimum fields:

* timestamp
* event
* facility
* entity
* action
* status

---

# 19. PRIVACY PAGE

The prototype must contain a simple privacy page.

It should clearly state:

* this is a prototype
* synthetic data is used
* no real patient information is represented
* no real hospital operational data is being processed through the demonstration environment

---

# 20. TERMS PAGE

The prototype must contain a simple terms page explaining:

* prototype status
* synthetic-data nature
* non-production status
* non-clinical nature
* simulated recommendations
* no real-world transfer execution

---

# 21. GLOBAL NAVIGATION

The application must provide persistent access to major operational areas.

Primary navigation:

```text
Dashboard
Inventory
Requests
Transfers
Forecast
Risk
Recommendations
Simulation
Audit
```

Secondary navigation may contain:

```text
Privacy
Terms
```

The navigation must communicate the operational hierarchy rather than simply listing every route equally.

---

# 22. GLOBAL APPLICATION STATES

The prototype must include realistic system states.

## Loading

Use skeleton loaders for major content areas.

---

## Empty

Examples:

```text
No pending requests.

No critical risks detected.

No active recommendations.
```

---

## Error

Provide meaningful error states rather than blank screens.

Example:

```text
Unable to load network information.

Retry
```

---

## Success

State-changing actions should provide clear confirmation.

Example:

```text
Transfer approved.

Inventory and risk status updated.
```

---

# 23. INTERACTION REQUIREMENTS

The prototype should not be a collection of static screens.

Important actions must change application state.

Examples:

### Approving Transfer

Changes:

```text
Transfer status
+
Source inventory
+
Destination inventory
+
Risk state
+
Audit log
```

---

### Triggering Simulation

Changes:

```text
Demand
+
Forecast
+
Risk
+
Alerts
+
Recommendations
```

---

### Rejecting Recommendation

Changes:

```text
Recommendation status
+
Audit log
```

---

# 24. MOCK DATA REQUIREMENTS

All major screens must operate from a shared mock-data layer.

The prototype should NOT contain unrelated hardcoded values inside individual components.

The mock data layer should provide consistent records for:

* hospitals
* inventory
* requests
* transfers
* forecasts
* risks
* recommendations
* alerts
* audit events
* scenarios

---

# 25. MOCK INTELLIGENCE REQUIREMENTS

The prototype intelligence layer should be deterministic and logically explainable.

It should not simply return random values.

The general flow should be:

```text
INPUT DATA
   ↓
CALCULATION
   ↓
STATE
   ↓
RECOMMENDATION
```

For example:

```text
Available inventory = 4
Reserved inventory = 2
Forecast demand = 21
Network surplus = 34
```

can produce:

```text
Risk = CRITICAL

Recommendation =
Transfer inventory from Hospital B
to Hospital A
```

The exact formulas will be defined in the Intelligence & Simulation Specification.

---

# 26. RESPONSIVE REQUIREMENTS

The prototype should work across:

### Desktop

Primary demonstration environment.

### Tablet

Operational interface should remain usable.

### Mobile

Core workflows should remain accessible.

Mobile should not simply compress the desktop layout.

Navigation and information hierarchy should adapt appropriately.

---

# 27. ACCESSIBILITY REQUIREMENTS

The prototype should aim to provide:

* sufficient text contrast
* readable typography
* keyboard accessibility where practical
* clear focus states
* semantic HTML
* labels for interactive controls
* non-color-only status communication

Critical statuses must not be communicated through color alone.

For example:

```text
CRITICAL
```

should accompany the visual status indicator.

---

# 28. VISUAL REQUIREMENTS

The prototype must follow the separate UX/UI Design System.

At a high level, it must avoid:

```text
Harsh gradients
Lucide icon libraries
Pure white backgrounds
Rainbow coloring
Drop shadows
Emoji-driven UI
Liquid glass
Bento layouts
Terminal-window aesthetics
Fake testimonials
Pricing tiers
Purple/black AI-SaaS aesthetics
Neon colors
Pastel UI
Radial orbs
Dot grids
Sparkle icons
Unnecessary animated arrows
Excessive hover animations
Soft generic card styling
```

The interface should instead communicate:

**serious + operational + clinical + data-focused + credible**

---

# 29. LANDING PAGE TO PRODUCT TRANSITION

The transition from landing page to application should feel intentional.

Primary path:

```text
LANDING
   ↓
ENTER PLATFORM
   ↓
DASHBOARD
```

Secondary path:

```text
LANDING
   ↓
RUN DEMO
   ↓
SIMULATION
```

This allows a judge to either explore the product naturally or immediately experience the core scenario.

---

# 30. PRIMARY DEMONSTRATION SCENARIO

The prototype must support the following predefined scenario:

## Starting State

Hospital A:

* limited O− inventory
* existing reservations
* increasing demand

Hospital B:

* comparatively higher O− inventory
* sufficient projected availability

---

## Event

An emergency causes a sudden increase in demand at Hospital A.

---

## System Response

```text
Demand increases
       ↓
Forecast changes
       ↓
Projected shortage detected
       ↓
Risk escalates
       ↓
Network inventory evaluated
       ↓
Hospital B identified
       ↓
Recommendation generated
```

---

## Operator Response

The operator opens the recommendation.

Reviews:

* reason
* quantities
* source
* destination
* expected impact

Then approves the transfer.

---

## Result

```text
Hospital A inventory ↑

Hospital B inventory ↓

Transfer status:
COMPLETED

Hospital A risk:
CRITICAL → LOWER RISK

Audit:
ACTION RECORDED
```

This is the primary "hero" interaction of the prototype.

---

# 31. ACCEPTANCE CRITERIA

The prototype meets the functional requirements when:

### Landing

A new user can understand the core concept and enter the product.

### Dashboard

A user can understand the current network condition.

### Inventory

A user can inspect inventory by facility, blood group, and component.

### Requests

A user can inspect simulated blood requirements.

### Transfers

A user can inspect and approve a simulated transfer.

### Forecast

A user can understand projected demand.

### Risk

A user can identify and investigate a simulated risk.

### Recommendation

A user can understand why an action is being suggested.

### Simulation

A user can trigger an operational scenario.

### State Change

An approved action changes relevant mock data.

### Audit

The resulting action appears in the audit trail.

### Consistency

The same state is reflected across relevant screens.

---

# 32. PRIORITY LEVELS

To prevent scope creep, features are divided into three levels.

## P0 — ESSENTIAL

Must exist.

```text
Landing
Dashboard
Two hospitals
Inventory
Requests
Transfers
Forecast
Risk
Recommendation
Simulation
State changes
Audit
Mock data
```

---

## P1 — IMPORTANT

Should exist if time permits.

```text
Advanced filtering
Detailed inventory drawer
Detailed forecast explanations
Scenario comparison
Advanced audit filtering
Responsive refinement
Additional empty/error states
```

---

## P2 — POLISH

Only after core functionality is stable.

```text
Micro-interactions
Advanced transitions
Additional visualizations
Extra simulation scenarios
Extended analytics
Additional UI refinements
```

---

# 33. PROTOTYPE SUCCESS TEST

A successful prototype should allow a judge to complete this sequence without assistance:

```text
Enter Platform
      ↓
Understand Current State
      ↓
Identify Risk
      ↓
Investigate Risk
      ↓
Understand Forecast
      ↓
Find Network Availability
      ↓
Review Recommendation
      ↓
Approve Action
      ↓
Observe State Change
      ↓
Verify Outcome
```

If this journey works smoothly, the prototype has fulfilled its primary purpose.

---

# 34. FINAL PRODUCT REQUIREMENT

The prototype must not feel like a set of disconnected UI screens.

Every major page must contribute to the same operational narrative:

```text
WHAT DO WE HAVE?
       ↓
WHAT WILL WE NEED?
       ↓
WHERE IS THE RISK?
       ↓
WHAT ELSE IS AVAILABLE?
       ↓
WHAT SHOULD WE CONSIDER?
       ↓
WHAT HAPPENS IF WE ACT?
```

The prototype succeeds when the interface itself communicates this story.

---

# 35. DOCUMENT DEPENDENCIES

This PRD works together with the remaining prototype documents:

```text
PRODUCT BRIEF
      ↓
PROTOTYPE PRD
      ↓
UX / UI DESIGN SYSTEM
      ↓
INFORMATION ARCHITECTURE
      ↓
MOCK DATA & DATA MODEL
      ↓
INTELLIGENCE & SIMULATION
      ↓
DEMO SCRIPT
```

The PRD defines **what the prototype must do**.

The UX/UI document defines **how it should look**.

The Information Architecture document defines **how users move through it**.

The Mock Data document defines **what data powers it**.

The Intelligence & Simulation document defines **how the simulated intelligence behaves**.

The Demo Script defines **how the complete experience is presented**.

---

# 36. FINAL PRD STATEMENT

The RAKTKOSH prototype is a **high-fidelity, interactive frontend demonstration of an intelligent blood-bank coordination concept**.

It must demonstrate a complete operational loop using synthetic data:

```text
MONITOR
   ↓
FORECAST
   ↓
IDENTIFY RISK
   ↓
ANALYZE NETWORK
   ↓
RECOMMEND
   ↓
HUMAN APPROVAL
   ↓
SIMULATED ACTION
   ↓
MEASURE OUTCOME
```

The implementation should remain deliberately focused on demonstrating the product concept rather than attempting to reproduce the complete production architecture.

The goal is not to make the prototype large.

The goal is to make it **convincing, coherent, interactive, and technically credible**.
