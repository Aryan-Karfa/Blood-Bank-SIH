# SMART BLOOD-BANK INVENTORY & DEMAND INTELLIGENCE PLATFORM

## Mock Data & Data Model Specification

**Demo / Internal Codename:** RAKTKOSH
**Official Product Name:** TBD
**Project Context:** Smart India Hackathon 2026
**Document Type:** Mock Data & Data Model Specification
**Version:** 1.0
**Status:** Frontend Prototype Data Specification

---

# 1. DOCUMENT PURPOSE

This document defines the synthetic dataset and logical data model required to operate the frontend prototype.

The purpose is to create a **small but internally consistent simulated blood-bank network** that can demonstrate:

* hospital inventory
* blood component availability
* demand
* requests
* forecasts
* shortages
* expiry risk
* inter-hospital transfers
* AI/system recommendations
* human approval
* state changes
* auditability
* simulation scenarios

The prototype must use **mock data only**.

No real patient data, real hospital records, or personally identifiable information should be used.

---

# 2. DATA DESIGN PHILOSOPHY

The dataset should be:

### Small enough to understand

The development team should be able to inspect the entire dataset manually.

### Rich enough to demonstrate intelligence

There must be enough relationships for the system to detect meaningful conditions.

### Consistent enough to simulate state changes

Every operational action must modify related entities.

### Realistic enough for demonstration

Values should resemble plausible operational conditions without claiming clinical accuracy.

---

# 3. INITIAL NETWORK

The prototype will model **two hospitals**.

```text
┌──────────────────────────────┐
│         HOSPITAL A           │
│                              │
│  Primary shortage scenario   │
│  Higher emergency pressure   │
│  Main destination facility   │
└──────────────┬───────────────┘
               │
               │ NETWORK
               │
┌──────────────▼───────────────┐
│         HOSPITAL B           │
│                              │
│  Stable inventory            │
│  Potential source facility   │
│  Surplus scenario            │
└──────────────────────────────┘
```

These two facilities are sufficient for the initial prototype.

---

# 4. HOSPITAL A

## Identity

```text
Hospital ID:
HOSP-A

Name:
Central City General Hospital

Short Name:
CCGH

Type:
Government General Hospital

Location:
Kolkata, West Bengal

Status:
Operational
```

---

## Operational Role

Hospital A acts primarily as the:

```text
HIGH-DEMAND FACILITY
```

It is the main destination for the hero transfer scenario.

---

# 5. HOSPITAL B

## Identity

```text
Hospital ID:
HOSP-B

Name:
Metropolitan Medical Centre

Short Name:
MMC

Type:
Multi-Specialty Hospital

Location:
Kolkata, West Bengal

Status:
Operational
```

---

## Operational Role

Hospital B acts primarily as the:

```text
STABLE / POTENTIAL SOURCE FACILITY
```

for the initial demonstration.

---

# 6. HOSPITAL ENTITY

Logical structure:

```text
Hospital
│
├── id
├── name
├── shortName
├── type
├── location
├── status
├── contact
├── inventory
├── requests
├── transfers
├── risks
└── forecasts
```

---

# 7. HOSPITAL DATA

Example conceptual dataset:

```text
HOSP-A
Central City General Hospital
Kolkata
Government General Hospital
Operational
```

```text
HOSP-B
Metropolitan Medical Centre
Kolkata
Multi-Specialty Hospital
Operational
```

---

# 8. BLOOD GROUPS

The prototype should support the standard ABO/Rh categories:

```text
A+
A-
B+
B-
AB+
AB-
O+
O-
```

The hero scenario should focus on:

```text
O−
```

because it creates a clear demonstration case.

---

# 9. BLOOD COMPONENTS

The prototype should support:

```text
PRBC
Platelets
FFP
Whole Blood
```

Where:

```text
PRBC
Packed Red Blood Cells

FFP
Fresh Frozen Plasma
```

The primary demonstration should focus on:

**PRBC**

---

# 10. INVENTORY MODEL

Inventory is represented at:

```text
Hospital
+
Blood Group
+
Component
```

level.

Example:

```text
Hospital A
O−
PRBC

Available:
14

Reserved:
4
```

---

# 11. INVENTORY ENTITY

Logical structure:

```text
InventoryRecord
│
├── id
├── hospitalId
├── bloodGroup
├── component
├── availableUnits
├── reservedUnits
├── incomingUnits
├── outgoingUnits
├── batches
├── expiryRisk
├── updatedAt
└── derivedState
```

---

# 12. INVENTORY STATUS

Possible derived states:

```text
NORMAL
LOW
HIGH_RISK
CRITICAL
EXPIRING
```

The UI should derive the visible state from the underlying data wherever practical.

---

# 13. INITIAL HERO INVENTORY

## Hospital A

```text
O− PRBC

Available:
14

Reserved:
4

Incoming:
0

Outgoing:
0
```

Net immediately usable inventory:

```text
10 units
```

---

## Hospital B

```text
O− PRBC

Available:
48

Reserved:
8

Incoming:
0

Outgoing:
0
```

Net immediately usable inventory:

```text
40 units
```

---

# 14. ADDITIONAL INVENTORY

To make the dashboard realistic, the prototype should contain additional inventory records.

### Hospital A

```text
A+ PRBC
B+ PRBC
O+ PRBC
O− PRBC
A+ Platelets
O+ Platelets
AB+ FFP
```

### Hospital B

```text
A+ PRBC
B+ PRBC
O+ PRBC
O− PRBC
A+ Platelets
O+ Platelets
AB+ FFP
```

Only the O− PRBC records need to participate in the primary hero scenario.

---

# 15. INVENTORY BATCH MODEL

Inventory should optionally be represented by batches.

```text
Batch
│
├── id
├── inventoryId
├── units
├── collectedAt
├── expiryAt
├── status
└── sourceType
```

This allows expiry scenarios to be demonstrated.

---

# 16. BATCH STATUS

```text
AVAILABLE
RESERVED
EXPIRING
EXPIRED
ALLOCATED
```

Expired units must never be counted as usable inventory.

---

# 17. EXPIRY DATA

Example Hospital B batch:

```text
Batch:
B-O-PRBC-003

Component:
PRBC

Blood Group:
O−

Units:
18

Expiry:
Within 24 hours

Status:
EXPIRING
```

This batch supports the expiry-risk scenario.

---

# 18. DEMAND MODEL

Demand should be represented by hospital/component combinations.

```text
DemandProfile
│
├── id
├── hospitalId
├── bloodGroup
├── component
├── baselineDailyDemand
├── currentDemand
├── trend
└── updatedAt
```

---

# 19. BASELINE DEMAND

Hero scenario:

### Hospital A

```text
O− PRBC

Baseline Daily Demand:
12 units
```

### Hospital B

```text
O− PRBC

Baseline Daily Demand:
8 units
```

These values are synthetic.

---

# 20. DEMAND TREND

Supported values:

```text
STABLE
INCREASING
DECREASING
VOLATILE
```

Hero scenario:

```text
Hospital A
INCREASING
```

Hospital B:

```text
STABLE
```

---

# 21. HISTORICAL DEMAND

The prototype should contain a small synthetic history.

Example:

```text
Hospital A
O− PRBC

Day -6:
9

Day -5:
10

Day -4:
10

Day -3:
11

Day -2:
11

Day -1:
12
```

This establishes an upward trend.

---

# 22. HOSPITAL B HISTORY

```text
Hospital B
O− PRBC

Day -6:
8

Day -5:
7

Day -4:
8

Day -3:
8

Day -2:
9

Day -1:
8
```

This represents stable demand.

---

# 23. REQUEST MODEL

A request represents a demand event requiring blood components.

```text
Request
│
├── id
├── hospitalId
├── bloodGroup
├── component
├── quantity
├── priority
├── status
├── requiredBy
├── createdAt
└── reason
```

---

# 24. REQUEST PRIORITIES

```text
CRITICAL
HIGH
MEDIUM
LOW
```

---

# 25. REQUEST STATUSES

```text
PENDING
IN_REVIEW
MATCHED
APPROVED
FULFILLED
REJECTED
CANCELLED
```

---

# 26. HERO REQUEST

Example:

```text
Request ID:
REQ-1001

Hospital:
HOSP-A

Blood Group:
O−

Component:
PRBC

Quantity:
20

Priority:
CRITICAL

Status:
PENDING

Required By:
Within 6 hours

Reason:
Emergency demand spike
```

This request helps connect demand with the recommendation.

---

# 27. SECONDARY REQUEST

Hospital B may contain a normal request:

```text
Request ID:
REQ-1002

Hospital:
HOSP-B

Blood Group:
A+

Component:
PRBC

Quantity:
8

Priority:
MEDIUM

Status:
PENDING
```

This makes the request table more realistic.

---

# 28. FORECAST MODEL

```text
Forecast
│
├── id
├── hospitalId
├── bloodGroup
├── component
├── horizon
├── projectedDemand
├── projectedAvailable
├── projectedGap
├── trend
├── confidence
├── factors
└── generatedAt
```

---

# 29. HERO FORECAST

Before the emergency scenario:

```text
Hospital A
O− PRBC

Forecast Horizon:
24 hours

Projected Demand:
12–14 units

Projected Available:
10 units

Risk:
Moderate
```

---

# 30. AFTER DEMAND SPIKE

After triggering the emergency scenario:

```text
Hospital A
O− PRBC

Forecast Horizon:
24 hours

Projected Demand:
28 units

Projected Available:
9 units

Projected Gap:
19 units

Risk:
Critical
```

These values are simulated and should be generated through the prototype intelligence logic rather than manually changed on every screen.

---

# 31. FORECAST FACTORS

Example:

```text
Factors:

Emergency demand spike
Active critical request
Increasing historical demand
Low current inventory
```

---

# 32. RISK MODEL

```text
Risk
│
├── id
├── hospitalId
├── bloodGroup
├── component
├── type
├── severity
├── score
├── timeToImpact
├── projectedGap
├── reasons
├── status
└── createdAt
```

---

# 33. RISK TYPES

```text
SHORTAGE
EXPIRY
DEMAND_SPIKE
NETWORK_IMBALANCE
```

---

# 34. RISK SEVERITY

```text
LOW
MODERATE
HIGH
CRITICAL
```

---

# 35. HERO RISK

Before simulation:

```text
Risk ID:
RISK-001

Hospital:
HOSP-A

Type:
SHORTAGE

Severity:
MODERATE
```

After the demand spike:

```text
Severity:
CRITICAL
```

---

# 36. RISK SCORE

The prototype may use a normalized score:

```text
0–24
LOW

25–49
MODERATE

50–74
HIGH

75–100
CRITICAL
```

The exact score is derived from the prototype risk engine.

---

# 37. RISK REASONS

Example:

```text
Current usable inventory is low.

Demand has increased significantly.

Projected demand exceeds available inventory.

Critical request is active.

Potential network support is available.
```

---

# 38. NETWORK MODEL

The two hospitals belong to the same simulated network.

```text
Network
│
├── id
├── name
├── hospitals
└── status
```

Example:

```text
Network ID:
NET-001

Name:
Kolkata Regional Blood Network

Status:
Operational
```

---

# 39. NETWORK RELATIONSHIP

```text
NET-001
   │
   ├── HOSP-A
   │
   └── HOSP-B
```

This relationship allows the recommendation engine to inspect inventory outside the affected hospital.

---

# 40. TRANSFER MODEL

```text
Transfer
│
├── id
├── sourceHospitalId
├── destinationHospitalId
├── bloodGroup
├── component
├── quantity
├── reason
├── status
├── recommendationId
├── approvedBy
├── createdAt
└── completedAt
```

---

# 41. TRANSFER STATUSES

```text
PROPOSED
PENDING_APPROVAL
APPROVED
IN_TRANSIT
COMPLETED
REJECTED
CANCELLED
```

---

# 42. HERO TRANSFER

```text
Transfer ID:
TRF-001

Source:
HOSP-B

Destination:
HOSP-A

Blood Group:
O−

Component:
PRBC

Quantity:
20

Status:
PENDING_APPROVAL
```

After approval:

```text
Status:
COMPLETED
```

---

# 43. RECOMMENDATION MODEL

```text
Recommendation
│
├── id
├── type
├── priority
├── sourceHospitalId
├── destinationHospitalId
├── bloodGroup
├── component
├── quantity
├── reason
├── factors
├── expectedImpact
├── confidence
├── status
└── createdAt
```

---

# 44. HERO RECOMMENDATION

```text
Recommendation ID:
REC-001

Type:
TRANSFER

Priority:
CRITICAL

Source:
HOSP-B

Destination:
HOSP-A

Component:
O− PRBC

Quantity:
20

Confidence:
HIGH

Status:
PENDING_REVIEW
```

---

# 45. RECOMMENDATION REASON

```text
Hospital A is projected to
experience a critical O− PRBC
shortage within the forecast horizon.

Hospital B has sufficient potential
surplus to support the transfer.

The proposed transfer reduces
Hospital A's projected shortage
while maintaining Hospital B's
simulated safety threshold.
```

---

# 46. EXPECTED IMPACT

Before:

```text
Hospital A
Projected Gap:
19 units

Risk:
CRITICAL
```

After proposed transfer:

```text
Hospital A
Projected Gap:
0 units

Risk:
LOW / MODERATE
```

The actual UI should derive these values from the intelligence engine.

---

# 47. SIMULATION MODEL

```text
SimulationScenario
│
├── id
├── name
├── description
├── initialState
├── events
├── expectedOutcome
└── status
```

---

# 48. SCENARIO RECORDS

The initial dataset should contain:

```text
SCN-001
Normal Operations

SCN-002
Emergency Demand Spike

SCN-003
Supply Disruption

SCN-004
Expiry Cluster

SCN-005
Competing Requests
```

---

# 49. SIMULATION EVENT

```text
SimulationEvent
│
├── id
├── scenarioId
├── type
├── targetHospitalId
├── bloodGroup
├── component
├── magnitude
├── duration
├── description
└── triggeredAt
```

---

# 50. HERO EVENT

```text
Event ID:
EVT-001

Scenario:
SCN-002

Type:
DEMAND_SPIKE

Target:
HOSP-A

Blood Group:
O−

Component:
PRBC

Magnitude:
2×

Duration:
6 hours
```

---

# 51. AUDIT MODEL

Every meaningful state change should create an audit event.

```text
AuditEvent
│
├── id
├── timestamp
├── eventType
├── entityType
├── entityId
├── hospitalId
├── actor
├── previousState
├── newState
└── description
```

---

# 52. AUDIT EVENT TYPES

```text
FORECAST_UPDATED
RISK_CREATED
RISK_UPDATED
RECOMMENDATION_CREATED
RECOMMENDATION_APPROVED
RECOMMENDATION_REJECTED
TRANSFER_CREATED
TRANSFER_APPROVED
TRANSFER_COMPLETED
INVENTORY_UPDATED
SIMULATION_STARTED
SIMULATION_RESET
```

---

# 53. HERO AUDIT SEQUENCE

After the hero scenario:

```text
1.
SIMULATION_STARTED

2.
DEMAND_UPDATED

3.
FORECAST_UPDATED

4.
RISK_UPDATED

5.
RECOMMENDATION_CREATED

6.
RECOMMENDATION_APPROVED

7.
TRANSFER_CREATED

8.
INVENTORY_UPDATED

9.
RISK_UPDATED

10.
TRANSFER_COMPLETED
```

---

# 54. ENTITY RELATIONSHIP MODEL

The complete logical relationship:

```text
NETWORK
  │
  ├───────────────┐
  ↓               ↓
HOSPITAL A      HOSPITAL B
  │               │
  ├─ Inventory    ├─ Inventory
  ├─ Requests     ├─ Requests
  ├─ Forecasts    ├─ Forecasts
  └─ Risks        └─ Risks
        │
        └─────── NETWORK ANALYSIS
                    │
                    ↓
             RECOMMENDATION
                    │
                    ↓
                 TRANSFER
                    │
                    ↓
              STATE UPDATE
                    │
          ┌─────────┼─────────┐
          ↓         ↓         ↓
      INVENTORY   RISK      AUDIT
```

---

# 55. MASTER DATA RELATIONSHIP

```text
Hospital
   │
   ├── InventoryRecord
   │       │
   │       └── InventoryBatch
   │
   ├── DemandProfile
   │       │
   │       └── DemandHistory
   │
   ├── Request
   │
   ├── Forecast
   │
   └── Risk


Network
   │
   └── Hospitals


Risk
   │
   └── Recommendation
           │
           └── Transfer


Simulation
   │
   └── SimulationEvent


Everything
   │
   └── AuditEvent
```

---

# 56. PRIMARY ENTITY IDs

The prototype should use readable synthetic identifiers.

```text
Hospitals:
HOSP-A
HOSP-B

Network:
NET-001

Inventory:
INV-001
INV-002
...

Requests:
REQ-1001
REQ-1002
...

Forecasts:
FC-001
FC-002
...

Risks:
RISK-001
RISK-002
...

Recommendations:
REC-001
REC-002
...

Transfers:
TRF-001
TRF-002
...

Scenarios:
SCN-001
SCN-002
...

Events:
EVT-001
EVT-002
...

Audit:
AUD-0001
AUD-0002
...
```

---

# 57. MOCK DATA VOLUME

The prototype should avoid excessive fake data.

Recommended initial volume:

| Entity                   | Target Count |
| ------------------------ | -----------: |
| Networks                 |            1 |
| Hospitals                |            2 |
| Blood Groups             |            8 |
| Components               |            4 |
| Inventory Records        |        12–16 |
| Inventory Batches        |        20–30 |
| Demand Profiles          |         8–12 |
| Historical Demand Points |       50–100 |
| Requests                 |         6–10 |
| Forecasts                |      Derived |
| Risks                    |      Derived |
| Recommendations          |      Derived |
| Transfers                |          3–5 |
| Scenarios                |            5 |
| Simulation Events        |         5–10 |
| Audit Events             |    Generated |

The goal is **meaningful density, not fake scale**.

---

# 58. CORE DATASET VS DERIVED DATA

The prototype should distinguish between source data and calculated data.

## Source / Seed Data

```text
Hospitals
Inventory
Batches
Demand History
Requests
Scenario Definitions
```

## Derived Data

```text
Inventory State
Forecast
Risk
Potential Surplus
Recommendation
Expected Impact
```

## Transactional State

```text
Transfers
Approvals
Simulation State
Audit Events
```

---

# 59. DATA FLOW

```text
SEED DATA
   ↓
STATE
   ↓
INTELLIGENCE ENGINE
   ↓
DERIVED DATA
   ↓
UI
```

After an action:

```text
USER ACTION
   ↓
TRANSACTION
   ↓
STATE MUTATION
   ↓
INTELLIGENCE RECALCULATION
   ↓
DERIVED DATA
   ↓
UI UPDATE
   ↓
AUDIT EVENT
```

---

# 60. HERO STATE — BEFORE EVENT

The initial hero scenario should approximately represent:

```text
HOSPITAL A

O− PRBC
Available: 14
Reserved: 4
Net: 10

Demand:
12/day

Trend:
Increasing

Risk:
Moderate


HOSPITAL B

O− PRBC
Available: 48
Reserved: 8
Net: 40

Demand:
8/day

Trend:
Stable

Risk:
Normal
```

---

# 61. HERO STATE — AFTER EVENT

Emergency demand spike:

```text
HOSPITAL A

Demand:
↑ significantly

Forecast:
↑

Projected Gap:
↑

Risk:
CRITICAL
```

Hospital B:

```text
Potential surplus:
AVAILABLE

Risk:
NORMAL
```

---

# 62. HERO STATE — AFTER RECOMMENDATION

```text
RECOMMENDATION

Hospital B
       ↓
20 × O− PRBC
       ↓
Hospital A
```

Expected impact:

```text
Hospital A:
Risk ↓

Hospital A:
Projected shortage ↓

Hospital B:
Remains above simulated threshold
```

---

# 63. HERO STATE — AFTER APPROVAL

The transaction should produce:

```text
Hospital B
Available:
48 → 28

Hospital A
Available:
14 → 34

Transfer:
PENDING → APPROVED → COMPLETED

Risk:
CRITICAL → LOWER

Audit:
NEW EVENTS
```

The actual final inventory calculation should respect reserved and allocated units.

---

# 64. DATA CONSISTENCY RULE

The same fact must never exist as conflicting values in different parts of the application.

For example:

If:

```text
Transfer quantity = 20
```

then:

```text
Hospital B outgoing = 20

Hospital A incoming = 20
```

must agree.

---

# 65. SINGLE SOURCE OF TRUTH

The prototype should maintain one authoritative state representation.

Conceptually:

```text
mockState
│
├── hospitals
├── inventory
├── batches
├── demandProfiles
├── requests
├── transfers
├── scenarios
└── auditEvents
```

Derived values should be calculated from this state.

---

# 66. DERIVED DATA SHOULD NOT BE DUPLICATED

Avoid manually storing:

```text
inventoryStatus
risk
projectedGap
recommendation
```

as independent values when they can be calculated from source state.

Instead:

```text
SOURCE DATA
      ↓
DERIVED SELECTORS
      ↓
UI
```

This reduces inconsistencies.

---

# 67. DATA VALIDATION

The prototype should validate:

```text
Available >= 0

Reserved >= 0

Transfer quantity > 0

Transfer quantity <= potential surplus

Source != destination

Hospital IDs exist

Blood group exists

Component exists

Request quantity > 0
```

---

# 68. TRANSFER VALIDATION

Before approving:

```text
[ ] Source exists
[ ] Destination exists
[ ] Source has sufficient potential surplus
[ ] Component matches
[ ] Blood group matches
[ ] Quantity valid
[ ] Source remains above threshold
```

If validation fails:

```text
TRANSFER CANNOT BE APPROVED
```

The prototype should explain why.

---

# 69. REQUEST VALIDATION

A request must contain:

```text
Hospital
Blood Group
Component
Quantity
Priority
Required By
Status
```

---

# 70. FORECAST VALIDATION

A forecast must contain:

```text
Hospital
Blood Group
Component
Horizon
Projected Demand
Projected Available
Projected Gap
```

---

# 71. RISK VALIDATION

A risk must reference:

```text
Hospital
Blood Group
Component
Risk Type
Severity
Reason
```

---

# 72. RECOMMENDATION VALIDATION

A transfer recommendation must reference:

```text
Source
Destination
Blood Group
Component
Quantity
Reason
Expected Impact
```

---

# 73. DATA FORMAT RECOMMENDATION

For the frontend prototype, JSON/TypeScript objects are recommended.

Example conceptual structure:

```text
mockData/
│
├── hospitals
├── inventory
├── batches
├── demand
├── requests
├── scenarios
└── seed
```

Derived intelligence should remain separate.

---

# 74. RECOMMENDED FRONTEND DATA STRUCTURE

```text
src/
│
├── data/
│   ├── hospitals.ts
│   ├── inventory.ts
│   ├── requests.ts
│   ├── demand.ts
│   ├── scenarios.ts
│   └── seed.ts
│
├── intelligence/
│   ├── inventoryEngine.ts
│   ├── demandEngine.ts
│   ├── forecastEngine.ts
│   ├── riskEngine.ts
│   ├── matchingEngine.ts
│   └── recommendationEngine.ts
│
└── simulation/
    ├── scenarioEngine.ts
    ├── eventEngine.ts
    └── stateManager.ts
```

---

# 75. MOCK DATA LAYER

The mock data layer should provide:

```text
getHospitals()

getInventory()

getRequests()

getDemandProfiles()

getScenarios()
```

The intelligence layer consumes these structures.

---

# 76. DATA ACCESS PRINCIPLE

UI components should not directly manipulate raw mock data.

Preferred:

```text
UI
 ↓
State / Selector
 ↓
Intelligence / Data Layer
 ↓
Mock Dataset
```

Not:

```text
UI
 ↓
Directly edits object
```

---

# 77. SIMULATION DATA ISOLATION

The simulation should maintain a copy or resettable state.

Conceptually:

```text
BASELINE DATA
      ↓
CLONE
      ↓
SIMULATION STATE
```

Reset:

```text
SIMULATION STATE
      ↓
RESET
      ↓
BASELINE DATA
```

---

# 78. DEMO DATA VISIBILITY

The application should clearly communicate that the environment contains synthetic data.

Possible UI indicator:

```text
DEMO ENVIRONMENT
Synthetic Data
```

This should appear consistently but unobtrusively.

---

# 79. PRIVACY REQUIREMENT

The dataset must not contain:

* patient names
* patient IDs
* phone numbers
* addresses of individuals
* medical histories
* real patient records
* personal contact information

The prototype is an institutional operational simulation.

---

# 80. REALISM WITHOUT FABRICATION

The dataset should feel operationally realistic without pretending to represent real hospitals.

Therefore:

```text
Realistic structure
+
Synthetic values
+
Clearly labelled simulation
```

is preferred over fabricated "real-world statistics."

---

# 81. DATA MODEL NORTH STAR

The model should allow the entire story to be represented as:

```text
HOSPITAL A
needs blood
      ↓
DEMAND CHANGES
      ↓
FORECAST CHANGES
      ↓
RISK INCREASES
      ↓
NETWORK SEARCH
      ↓
HOSPITAL B HAS SURPLUS
      ↓
RECOMMENDATION
      ↓
HUMAN APPROVAL
      ↓
TRANSFER
      ↓
INVENTORY CHANGES
      ↓
RISK CHANGES
      ↓
AUDIT RECORD
```

Every step must correspond to actual data relationships.

---

# 82. WHAT THIS DATA MODEL ENABLES

With this model, the prototype can demonstrate:

### Inventory Visibility

"What do we have?"

### Demand Intelligence

"What might we need?"

### Risk Detection

"Where could a shortage occur?"

### Network Intelligence

"Who can potentially help?"

### Recommendation

"What action could reduce the risk?"

### Human Decision

"Should we approve it?"

### Simulation

"What happens if we do?"

### Auditability

"What changed and why?"

---

# 83. FINAL DATA ARCHITECTURE

```text
                         NETWORK
                            │
                ┌───────────┴───────────┐
                │                       │
            HOSPITAL A              HOSPITAL B
                │                       │
        ┌───────┼───────┐       ┌───────┼───────┐
        ↓       ↓       ↓       ↓       ↓       ↓
    INVENTORY DEMAND REQUEST INVENTORY DEMAND REQUEST
        │       │       │       │       │       │
        └───────┴───────┴───────┴───────┴───────┘
                            │
                            ↓
                      INTELLIGENCE
                            │
            ┌───────────────┼───────────────┐
            ↓               ↓               ↓
        FORECAST          RISK           MATCHING
            │               │               │
            └───────────────┼───────────────┘
                            ↓
                     RECOMMENDATION
                            │
                            ↓
                      HUMAN DECISION
                            │
                            ↓
                         TRANSFER
                            │
                            ↓
                       STATE UPDATE
                            │
            ┌───────────────┼───────────────┐
            ↓               ↓               ↓
        INVENTORY          RISK           AUDIT
```

---

# 84. IMPLEMENTATION PRINCIPLE

The prototype does not need a large database.

It needs a **small, carefully engineered dataset whose relationships are convincing**.

The quality of the prototype will come from:

```text
CONNECTED DATA
+
CONSISTENT STATE
+
DETERMINISTIC INTELLIGENCE
+
VISIBLE CONSEQUENCES
```

rather than from the number of records.

---

# 85. FINAL DATA REQUIREMENT

Before implementation begins, the team should be able to answer:

```text
What hospitals exist?
What blood components do they hold?
How much do they have?
What is their demand?
What requests exist?
What is the forecast?
What risks exist?
Who can potentially support whom?
What recommendation is generated?
What happens when it is approved?
What changes afterward?
What is recorded in the audit trail?
```

If all ten questions can be answered directly from the dataset and intelligence layer, the prototype data model is sufficiently complete.

---

# 86. DOCUMENT RELATIONSHIP

This document defines **what data exists, how entities relate, and how the mock state changes during simulation**.

The documentation sequence is now:

```text
PRODUCT BRIEF
      ↓
PROTOTYPE PRD
      ↓
UI / UX DESIGN
      ↓
INFORMATION ARCHITECTURE & USER FLOWS
      ↓
INTELLIGENCE & SIMULATION
      ↓
MOCK DATA & DATA MODEL
      ↓
DEMO SCRIPT
```

The final document should define **exactly how the team presents the prototype, what scenario is demonstrated, what each team member says, what screens are visited, and how the entire 2–5 minute story is executed without getting lost**.
