# SMART BLOOD-BANK INVENTORY & DEMAND INTELLIGENCE PLATFORM

## Intelligence & Simulation Specification

**Demo / Internal Codename:** RAKTKOSH
**Official Product Name:** TBD
**Project Context:** Smart India Hackathon 2026
**Document Type:** Intelligence & Simulation Specification
**Version:** 1.0
**Status:** Frontend Prototype Intelligence Definition

---

# 1. DOCUMENT PURPOSE

This document defines the intelligence layer and simulation engine for the prototype.

The prototype will not implement production machine-learning infrastructure.

Instead, it will use a **deterministic, rule-based intelligence layer operating on synthetic data** to simulate the behavior of the proposed future system.

The intelligence layer must produce results that are:

* logically consistent
* explainable
* reproducible
* interactive
* visually demonstrable
* connected to the shared application state

The goal is to simulate the behavior of an intelligent blood-bank coordination system without pretending that the prototype contains a production-grade AI model.

---

# 2. INTELLIGENCE PHILOSOPHY

The prototype should demonstrate:

> **Intelligence through connected reasoning, not random AI outputs.**

The system should be able to observe:

```text
INVENTORY
+
DEMAND
+
REQUESTS
+
FORECAST
+
EXPIRY
+
NETWORK AVAILABILITY
```

and derive:

```text
RISK
+
PRIORITY
+
POTENTIAL MATCH
+
RECOMMENDATION
+
EXPECTED IMPACT
```

---

# 3. INTELLIGENCE PIPELINE

The core intelligence pipeline is:

```text
┌─────────────────────┐
│    MOCK DATA        │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ CURRENT STATE       │
│ ANALYSIS            │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ DEMAND ANALYSIS     │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ FORECAST            │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ RISK ENGINE         │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ NETWORK ANALYSIS    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ RECOMMENDATION      │
│ ENGINE              │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ EXPECTED IMPACT     │
└─────────────────────┘
```

---

# 4. INTELLIGENCE MODULES

The prototype intelligence layer consists of six primary modules:

```text
1. Inventory Engine
2. Demand Engine
3. Forecast Engine
4. Risk Engine
5. Network Matching Engine
6. Recommendation Engine
```

The Simulation Engine orchestrates these modules.

---

# 5. INVENTORY ENGINE

## Purpose

Determine the current operational inventory state of each hospital.

---

## Inputs

```text
Hospital
Blood Group
Component
Available Units
Reserved Units
Expiry Dates
Incoming Units
Outgoing Units
```

---

## Derived Values

### Net Available Inventory

```text
Net Available =
Available Units - Reserved Units
```

---

### Near-Expiry Inventory

Inventory approaching its configured expiry threshold.

Example prototype threshold:

```text
Expiry Window = 48 hours
```

---

### Inventory Coverage

Conceptually:

```text
Inventory Coverage =
Available Inventory / Expected Demand
```

The exact implementation may use the forecast horizon rather than a full-day demand value.

---

# 6. INVENTORY STATE

Each inventory record should have a derived state:

```text
NORMAL
LOW
CRITICAL
EXPIRING
```

Example:

```text
Available:
8

Reserved:
4

Net Available:
4

Expected Demand:
18

State:
CRITICAL
```

---

# 7. INVENTORY THRESHOLDS

The prototype should use configurable thresholds rather than hardcoded visual labels.

Example:

```text
Coverage > 1.50
NORMAL

Coverage 1.00–1.50
LOW

Coverage 0.50–1.00
HIGH RISK

Coverage < 0.50
CRITICAL
```

These values are prototype demonstration thresholds and should not be interpreted as clinical or regulatory thresholds.

---

# 8. DEMAND ENGINE

## Purpose

Represent the current and changing demand environment.

The demand engine uses synthetic historical and scenario data.

---

## Inputs

```text
Historical Demand
Current Requests
Emergency Events
Scenario Modifiers
Hospital
Blood Group
Component
```

---

# 9. DEMAND BASELINE

Each hospital/component combination should have a synthetic baseline demand.

Example:

```text
Hospital A
O− PRBC

Baseline Daily Demand:
12 units
```

Hospital B may have:

```text
Baseline Daily Demand:
8 units
```

These values are demonstration values only.

---

# 10. DEMAND EVENTS

The simulation engine can modify baseline demand.

Example:

```text
Normal
× 1.00

Moderate Increase
× 1.25

Emergency Spike
× 2.00

Major Emergency
× 3.00
```

The exact multiplier can vary by scenario.

---

# 11. REQUEST IMPACT

Active requests should contribute to near-term demand pressure.

Conceptually:

```text
Effective Demand =
Baseline Demand
+
Active Request Pressure
+
Scenario Demand Modifier
```

This creates a relationship between requests and forecast/risk.

---

# 12. FORECAST ENGINE

## Purpose

Generate projected demand from the simulated demand environment.

The prototype does not require a production forecasting model.

Instead, it uses deterministic forecasting logic.

---

# 13. FORECAST MODEL

A simple prototype model may combine:

```text
Historical Demand
+
Current Demand
+
Active Requests
+
Scenario Modifier
```

A conceptual formulation:

```text
Forecast =
Historical Baseline
× Trend Factor
× Scenario Factor
+
Request Pressure
```

The implementation should remain deterministic.

---

# 14. FORECAST HORIZONS

The prototype should support:

```text
6 hours
12 hours
24 hours
48 hours
72 hours
```

The hero demonstration should primarily use:

**6–24 hour forecasting**

because this creates an understandable operational urgency.

---

# 15. FORECAST OUTPUT

Each forecast should provide:

```text
Hospital
Blood Group
Component
Forecast Horizon
Projected Demand
Trend
Risk Point
Confidence Indicator
Primary Factors
```

---

# 16. FORECAST EXPLANATION

The interface should be able to explain a forecast.

Example:

```text
Projected demand increased because:

• Emergency demand event
• Active requests
• Recent upward demand trend
```

The prototype must not imply that the forecast is based on real-world trained ML if it is not.

---

# 17. FORECAST CONFIDENCE

Confidence should be presented as a **simulation indicator**, not a statistically validated model confidence.

Example:

```text
HIGH
MODERATE
LOW
```

It may be derived from the consistency of the synthetic input data.

---

# 18. RISK ENGINE

## Purpose

Determine whether the current or projected state requires attention.

The risk engine combines:

```text
Inventory
+
Forecast
+
Requests
+
Expiry
+
Scenario State
```

---

# 19. PRIMARY RISK TYPES

The prototype supports:

```text
SHORTAGE
EXPIRY
DEMAND SPIKE
NETWORK IMBALANCE
```

---

# 20. SHORTAGE RISK

A shortage risk exists when projected demand approaches or exceeds usable inventory.

Conceptually:

```text
Projected Available
<
Projected Demand
```

The closer the projected gap becomes, the higher the risk.

---

# 21. SHORTAGE GAP

Define:

```text
Projected Gap =
Projected Demand - Projected Available Inventory
```

If:

```text
Projected Gap <= 0
```

there is no projected shortage.

If:

```text
Projected Gap > 0
```

shortage risk exists.

---

# 22. TIME-TO-SHORTAGE

The prototype should estimate when the projected inventory may fall below the required operational level.

Conceptually:

```text
Time-to-Shortage =
Available Usable Inventory
/
Demand Rate
```

This should be treated as a simulation estimate.

Example:

```text
Available:
6 units

Demand rate:
0.5 units/hour

Estimated time:
12 hours
```

---

# 23. RISK LEVEL CALCULATION

A simplified prototype model:

```text
NORMAL

No projected shortage
+
healthy inventory coverage
+
no major expiry risk
```

```text
LOW

Inventory declining
OR
moderate demand increase
```

```text
MODERATE

Projected pressure
OR
meaningful expiry risk
OR
demand spike
```

```text
HIGH

Projected shortage within forecast horizon
OR
major expiry exposure
```

```text
CRITICAL

Projected shortage is imminent
OR
current usable inventory is insufficient
OR
emergency demand creates immediate pressure
```

---

# 24. RISK PRIORITY

Risk priority should combine:

```text
Severity
+
Time
+
Demand
+
Inventory
+
Network Availability
```

The most urgent risk is therefore not necessarily the largest numerical shortage.

A smaller shortage occurring sooner may receive higher priority.

---

# 25. EXPIRY RISK ENGINE

The system should identify inventory approaching expiry.

Example:

```text
Units:
18

Expiry:
14 hours

Demand:
Low
```

The system may classify this as:

```text
EXPIRY RISK
```

---

# 26. EXPIRY OPPORTUNITY

Expiry risk can also become a potential redistribution opportunity.

Example:

```text
Hospital B

18 units approaching expiry

Hospital A

Increasing demand
```

The system can identify:

```text
Potential redistribution opportunity
```

The prototype should demonstrate that risk can sometimes be transformed into an actionable network opportunity.

---

# 27. NETWORK MATCHING ENGINE

## Purpose

Identify whether another facility may have potentially useful inventory.

---

# 28. NETWORK MATCHING INPUTS

For a shortage at Hospital A, inspect Hospital B for:

```text
Blood Group Compatibility
Component Compatibility
Available Quantity
Reserved Quantity
Projected Demand
Expiry
Current Risk
Potential Surplus
```

---

# 29. POTENTIAL SURPLUS

Conceptually:

```text
Potential Surplus =
Available Inventory
-
Reserved Inventory
-
Projected Demand Buffer
```

Only inventory above the simulated safety requirement should be considered potentially redistributable.

---

# 30. MATCHING LOGIC

A potential source facility should satisfy:

```text
1. Correct component
2. Compatible blood group
3. Sufficient available quantity
4. Source facility remains above its own threshold
5. Destination has meaningful need
6. Transfer quantity can reduce destination risk
```

The prototype should keep compatibility rules simplified and clearly documented as demonstration logic.

---

# 31. SOURCE RANKING

If multiple potential source facilities exist in a future expanded simulation, they can be ranked using:

```text
Match Score =
Compatibility
+
Surplus
+
Source Stability
+
Expiry Opportunity
+
Destination Urgency
```

For the two-hospital prototype, ranking is primarily demonstrative.

---

# 32. TRANSFER QUANTITY

The recommendation engine should not simply transfer all available inventory.

Conceptually:

```text
Recommended Transfer =
Minimum(
    Destination Requirement,
    Source Potential Surplus,
    Configured Transfer Limit
)
```

This demonstrates balanced decision-making.

---

# 33. RECOMMENDATION ENGINE

## Purpose

Convert the outputs of the previous engines into a human-readable recommendation.

---

# 34. RECOMMENDATION INPUT

```text
Risk
+
Forecast
+
Inventory
+
Network Match
+
Demand
```

---

# 35. RECOMMENDATION OUTPUT

Each recommendation should contain:

```text
Recommendation ID

Priority

Action

Source

Destination

Blood Group

Component

Quantity

Reason

Supporting Factors

Expected Impact

Confidence

Status
```

---

# 36. RECOMMENDATION TYPES

The prototype may generate:

```text
TRANSFER
MONITOR
PRIORITIZE REQUEST
REDISTRIBUTE EXPIRING STOCK
NO ACTION
```

The hero scenario should focus on:

**TRANSFER**

---

# 37. EXPLAINABILITY ENGINE

Every recommendation must have supporting reasons.

Example:

```text
WHY THIS RECOMMENDATION?

1. Hospital A is projected to
   experience shortage within 18 hours.

2. Hospital B has sufficient
   potential surplus.

3. Hospital B remains above its
   simulated safety threshold
   after the proposed transfer.

4. The transfer reduces the
   projected shortage at Hospital A.
```

---

# 38. EXPECTED IMPACT

The recommendation should calculate a simulated outcome.

Example:

```text
BEFORE

Hospital A:
Projected Gap = 16 units
Risk = CRITICAL


AFTER

Hospital A:
Projected Gap = 0 units
Risk = LOW
```

This makes the recommendation measurable.

---

# 39. RECOMMENDATION CONFIDENCE

Confidence should reflect the quality of the simulated evidence.

Possible factors:

```text
Strong inventory match
+
clear forecast
+
clear shortage
+
stable source facility
=
HIGH
```

Ambiguous conditions may produce:

```text
MODERATE
```

The prototype must not represent this as validated statistical confidence.

---

# 40. HUMAN-IN-THE-LOOP

The recommendation engine produces a suggestion.

It does not execute the action.

The workflow is:

```text
SYSTEM
   ↓
RECOMMENDATION
   ↓
HUMAN REVIEW
   ↓
APPROVE
MODIFY
REJECT
```

---

# 41. APPROVAL ENGINE

When the operator selects **APPROVE**:

```text
Recommendation
      ↓
Transfer Created
      ↓
Transfer Approved
      ↓
Inventory Updated
      ↓
Risk Recalculated
      ↓
Dashboard Updated
      ↓
Audit Event Created
```

---

# 42. MODIFY FLOW

If the operator selects **MODIFY**:

```text
RECOMMENDATION
      ↓
EDIT QUANTITY / PARAMETERS
      ↓
RECALCULATE EXPECTED IMPACT
      ↓
REVIEW
      ↓
APPROVE
```

The modified quantity must be reflected in the simulated state.

---

# 43. REJECT FLOW

If the operator rejects:

```text
RECOMMENDATION
      ↓
REJECT
      ↓
STATUS = REJECTED
      ↓
AUDIT EVENT
      ↓
RISK REMAINS
```

The system should not pretend the operational risk disappeared.

---

# 44. SIMULATION ENGINE

The Simulation Engine controls scenario execution.

It manages:

```text
Scenario
+
Initial State
+
Event
+
State Mutation
+
Intelligence Recalculation
+
Outcome
+
Reset
```

---

# 45. SIMULATION STATE MACHINE

Conceptually:

```text
BASELINE
   ↓
SCENARIO SELECTED
   ↓
SCENARIO ACTIVE
   ↓
EVENT TRIGGERED
   ↓
STATE CHANGED
   ↓
INTELLIGENCE RUN
   ↓
RECOMMENDATION GENERATED
   ↓
AWAITING HUMAN ACTION
   ↓
ACTION
   ↓
OUTCOME
   ↓
SCENARIO COMPLETE
```

---

# 46. SCENARIO 01 — NORMAL OPERATIONS

## Initial Condition

Both hospitals have stable inventory and predictable demand.

```text
Hospital A
Risk: NORMAL

Hospital B
Risk: NORMAL
```

---

## Expected Intelligence

```text
No critical risks
No urgent recommendations
Stable forecast
```

---

## Purpose

Establishes the baseline state.

---

# 47. SCENARIO 02 — EMERGENCY DEMAND SPIKE

This is the **primary hero scenario**.

---

## Initial State

### Hospital A

```text
O− PRBC

Available:
14

Reserved:
4

Baseline demand:
12/day

Risk:
MODERATE
```

### Hospital B

```text
O− PRBC

Available:
48

Reserved:
8

Baseline demand:
8/day

Risk:
NORMAL
```

These are synthetic demonstration values.

---

# 48. EVENT

Trigger:

```text
EMERGENCY DEMAND SPIKE
```

Hospital A demand increases.

Example modifier:

```text
× 2.0
```

---

# 49. EVENT CONSEQUENCE

```text
Demand ↑
      ↓
Forecast ↑
      ↓
Projected Inventory ↓
      ↓
Shortage Gap ↑
      ↓
Risk ↑
```

Expected result:

```text
Hospital A
MODERATE → CRITICAL
```

---

# 50. NETWORK ANALYSIS

The system evaluates Hospital B.

```text
Hospital B

Available:
48

Reserved:
8

Potential surplus:
Sufficient
```

Hospital B remains above its simulated safety threshold after a proposed transfer.

---

# 51. RECOMMENDATION

Example:

```text
TRANSFER

20 × O− PRBC

FROM
Hospital B

TO
Hospital A
```

Reason:

```text
Hospital A is projected to
experience a critical shortage
within the forecast horizon.
```

---

# 52. APPROVAL

Operator selects:

**APPROVE TRANSFER**

---

# 53. SIMULATED OUTCOME

```text
Hospital B
48 → 28 available

Hospital A
14 → 34 available
```

Reserved quantities and other relevant state variables must be recalculated appropriately.

---

# 54. RISK OUTCOME

Before:

```text
Hospital A
CRITICAL
```

After:

```text
Hospital A
LOW / MODERATE
```

The exact resulting state should depend on the configured simulation formulas.

---

# 55. SCENARIO 03 — SUPPLY DISRUPTION

## Purpose

Demonstrate that risk can originate from the supply side.

---

## Event

Hospital B receives a simulated supply disruption.

Example:

```text
Incoming supply
= 0
```

for the scenario period.

---

## Expected Response

```text
Supply ↓
   ↓
Projected inventory ↓
   ↓
Coverage ↓
   ↓
Risk ↑
```

The system should reassess whether Hospital B can still act as a source.

---

# 56. SCENARIO 04 — EXPIRY CLUSTER

## Purpose

Demonstrate proactive inventory management.

---

## Event

A significant quantity of a component approaches expiry.

Example:

```text
18 units
Expiry within 24 hours
```

---

## Expected Response

```text
Expiry risk detected
        ↓
Demand evaluated
        ↓
Network demand evaluated
        ↓
Potential redistribution identified
```

This scenario demonstrates that the system can respond to **waste risk**, not only shortage risk.

---

# 57. SCENARIO 05 — MULTI-HOSPITAL SHORTAGE

Although the initial prototype contains two hospitals, this scenario represents a future network concept.

For the current prototype, the scenario may simulate multiple competing requests within the two facilities.

Example:

```text
Hospital A
Critical request

Hospital B
Moderate request
```

The system should prioritize based on:

```text
Urgency
+
Time
+
Severity
+
Availability
```

This demonstrates the prioritization concept without requiring additional hospitals.

---

# 58. SCENARIO RESET

Every scenario must be reversible.

```text
ACTIVE SCENARIO
      ↓
RESET
      ↓
CONFIRM
      ↓
BASELINE STATE RESTORED
```

The reset must restore:

* inventory
* requests
* transfers
* forecasts
* risks
* recommendations
* audit state where appropriate

---

# 59. SIMULATION TIMELINE

A scenario may expose a timeline such as:

```text
00:00
Baseline

00:02
Emergency event

00:04
Demand updated

00:05
Forecast recalculated

00:06
Risk detected

00:07
Network analyzed

00:08
Recommendation generated

00:10
Human approval

00:12
Transfer simulated

00:13
Outcome calculated
```

The actual interface may execute these transitions faster for demonstration purposes.

---

# 60. REAL-TIME FEEL WITHOUT REAL-TIME INFRASTRUCTURE

The prototype should create the perception of a live operational system without requiring real-time backend infrastructure.

This can be achieved through:

```text
State transitions
+
controlled delays
+
loading states
+
incremental updates
+
timestamp changes
```

The underlying data remains local/mock.

---

# 61. INTELLIGENCE EXECUTION MODES

The prototype may support:

### Automatic

Intelligence recalculates automatically after simulation events.

### Manual

The user can explicitly run an analysis.

### Action-triggered

Approval or modification triggers recalculation.

---

# 62. SIMULATION EVENT MODEL

Each event should conceptually contain:

```text
Event ID

Scenario ID

Timestamp

Target Hospital

Blood Group

Component

Event Type

Magnitude

Duration

Description
```

Example:

```text
Event:
Emergency Demand Spike

Target:
Hospital A

Component:
O− PRBC

Magnitude:
2×

Duration:
6 hours
```

---

# 63. STATE MUTATION MODEL

Simulation events modify state rather than replacing the entire dataset.

Example:

```text
BASELINE INVENTORY
       +
DEMAND EVENT
       ↓
NEW DEMAND STATE
       ↓
RECALCULATION
```

This preserves relationships across the application.

---

# 64. REACTIVE DATA FLOW

The preferred prototype architecture is:

```text
USER ACTION
     ↓
STATE UPDATE
     ↓
DERIVED DATA
     ↓
INTELLIGENCE ENGINE
     ↓
UI UPDATE
```

For example:

```text
Emergency Spike
     ↓
Demand State Changes
     ↓
Forecast Recalculated
     ↓
Risk Recalculated
     ↓
Recommendation Generated
     ↓
Dashboard Updates
```

---

# 65. DETERMINISM

Given the same:

```text
Initial State
+
Scenario
+
Action
```

the prototype should produce the same result.

This is important for:

* debugging
* judging
* demonstrations
* reproducibility
* confidence

Randomized recommendations should NOT be used.

---

# 66. EXPLAINABILITY REQUIREMENT

The intelligence layer should expose not only the output but also the reasons behind the output.

Conceptually:

```text
OUTPUT
+
REASONS
+
SUPPORTING VALUES
+
EXPECTED IMPACT
```

Example:

```text
Risk = CRITICAL

Reasons:

Inventory coverage = 0.31×
Projected demand = 28 units
Available usable inventory = 9 units
Time-to-shortage = 7 hours
Network surplus = 32 units
```

This makes the system auditable.

---

# 67. INTELLIGENCE TRANSPARENCY

The prototype should never falsely claim:

```text
"AI predicts..."
```

if the prototype is actually using deterministic simulation logic.

Preferred language:

```text
Simulated forecast

Simulated risk assessment

System recommendation

Prototype intelligence

Synthetic scenario
```

The future production architecture can later replace these modules with actual ML models.

---

# 68. FUTURE ML REPLACEMENT POINT

The prototype architecture should isolate intelligence logic behind clear interfaces.

Conceptually:

```text
CURRENT

Frontend
   ↓
Simulation Intelligence

FUTURE

Frontend
   ↓
API
   ↓
Forecast Service
Risk Service
Recommendation Service
```

The frontend should not need to be fundamentally redesigned when actual intelligence services are introduced.

---

# 69. PROTOTYPE VS PRODUCTION

| Capability       | Prototype                | Future Production       |
| ---------------- | ------------------------ | ----------------------- |
| Inventory        | Mock                     | Real integration        |
| Demand           | Synthetic                | Real historical data    |
| Forecast         | Deterministic simulation | ML forecasting          |
| Risk             | Rule-based               | Advanced risk model     |
| Network Matching | Rule-based               | Optimization engine     |
| Recommendation   | Deterministic            | AI/optimization         |
| Database         | Mock/local               | Production database     |
| Authentication   | Simplified               | Role-based              |
| Data Source      | Synthetic                | Hospital systems        |
| Transfer         | Simulated                | Operational workflow    |
| Audit            | Mock                     | Persistent audit system |

---

# 70. PROTOTYPE INTELLIGENCE BOUNDARIES

The prototype must NOT:

* claim medical accuracy
* claim validated forecasting accuracy
* claim regulatory compliance
* claim real-world blood compatibility authority
* claim autonomous decision-making
* represent simulated data as actual hospital data

The prototype is a demonstration of a **product concept and workflow**.

---

# 71. CORE INTELLIGENCE FORMULA

At a conceptual level:

```text
CURRENT STATE
       +
FUTURE STATE
       +
NETWORK STATE
       ↓
RISK
       ↓
ACTIONABLE OPTION
```

This is the central intelligence proposition.

---

# 72. RECOMMENDATION QUALITY CHECK

Before presenting a recommendation, the system should verify:

```text
[ ] Destination has genuine need
[ ] Destination risk is meaningful
[ ] Source has potential surplus
[ ] Source remains safe after transfer
[ ] Component matches
[ ] Quantity is reasonable
[ ] Transfer improves destination state
[ ] Recommendation has explainable reasons
```

If these conditions are not satisfied:

```text
NO TRANSFER RECOMMENDATION
```

may be the correct output.

---

# 73. NO-ACTION INTELLIGENCE

A mature prototype should demonstrate that intelligence does not always mean recommending an action.

Example:

```text
NETWORK STATUS

No transfer recommended.

Reason:

Current inventory is sufficient
to cover projected demand.
```

This increases credibility.

---

# 74. CONFLICTING DEMAND

If two requests compete for the same limited inventory, the prototype should prioritize using:

```text
Urgency
+
Time-to-need
+
Risk
+
Available Alternatives
```

Example:

```text
Request A
Critical
Required in 3 hours

Request B
Moderate
Required in 18 hours
```

Request A receives higher simulated priority.

---

# 75. NETWORK SAFETY PRINCIPLE

The system should not solve one hospital's shortage by creating another hospital's shortage.

Therefore:

```text
DESTINATION BENEFIT
```

must be evaluated against:

```text
SOURCE RISK
```

A recommendation should be rejected if the source facility becomes critically exposed.

---

# 76. EXPECTED IMPACT MODEL

Each proposed action should calculate:

```text
Destination Risk Before
Destination Risk After

Projected Gap Before
Projected Gap After

Source Risk Before
Source Risk After
```

This makes the recommendation measurable.

---

# 77. BEFORE / AFTER INTELLIGENCE

The prototype should visualize:

```text
BEFORE
Critical shortage
        ↓
ACTION
Transfer
        ↓
AFTER
Reduced risk
```

This is the most important proof of value in the demo.

---

# 78. AUDIT INTEGRATION

Every major intelligence event should produce an audit record.

Examples:

```text
Forecast Updated

Risk Generated

Recommendation Created

Recommendation Approved

Transfer Created

Inventory Updated

Risk Recalculated
```

This makes the intelligence process traceable.

---

# 79. SIMULATION EVENT LOG

During simulation, the interface may show:

```text
14:02:01
Emergency event triggered

14:02:02
Demand updated

14:02:03
Forecast recalculated

14:02:04
Critical risk detected

14:02:05
Network inventory evaluated

14:02:06
Recommendation generated
```

This reinforces the sense of a connected operational system.

---

# 80. DEMO CONTROL

The simulation interface should provide:

```text
SELECT SCENARIO

START

PAUSE

RESET
```

The user should always understand the current simulation state.

---

# 81. DEMONSTRATION SPEED

For live judging, the simulation should prioritize clarity over realism of elapsed time.

A process that would conceptually happen over hours can be simulated within seconds.

Example:

```text
Real-world concept:
Hours

Prototype:
5–15 seconds
```

The interface can still display simulated timestamps.

---

# 82. HERO DEMO TIMELINE

The ideal live demonstration:

```text
00:00
Dashboard baseline

00:15
Trigger emergency scenario

00:25
Risk escalates

00:35
Open risk

00:50
Show forecast

01:05
Show network surplus

01:20
Open recommendation

01:40
Explain reasoning

02:00
Approve transfer

02:15
Show state update

02:30
Show reduced risk

02:45
Show audit trail
```

The entire core story should comfortably fit within approximately three minutes.

---

# 83. SIMULATION SUCCESS CRITERIA

The simulation system is successful when:

```text
[ ] Scenario starts from known state
[ ] Event changes state
[ ] Demand changes logically
[ ] Forecast responds
[ ] Risk responds
[ ] Network analysis responds
[ ] Recommendation responds
[ ] Human action changes state
[ ] Outcome is visible
[ ] Audit event is created
[ ] Reset restores baseline
```

---

# 84. INTELLIGENCE SUCCESS CRITERIA

The intelligence layer is successful when:

```text
[ ] Outputs are deterministic
[ ] Outputs are explainable
[ ] Inputs are traceable
[ ] Recommendations are actionable
[ ] Recommendations do not create obvious contradictions
[ ] Source and destination risks are both considered
[ ] No-action states are supported
[ ] UI reflects the same intelligence state
```

---

# 85. ARCHITECTURAL NORTH STAR

The intelligence system should feel like:

```text
OBSERVE
   ↓
UNDERSTAND
   ↓
PREDICT
   ↓
DETECT
   ↓
COMPARE
   ↓
RECOMMEND
   ↓
HUMAN DECIDES
   ↓
SIMULATE ACTION
   ↓
MEASURE RESULT
```

Not:

```text
CLICK BUTTON
   ↓
RANDOM AI RESPONSE
```

---

# 86. FINAL INTELLIGENCE DEFINITION

For this prototype, "AI" is represented through a deterministic intelligence layer that connects synthetic inventory, demand, forecasting, risk, and network information into explainable recommendations.

The prototype's intelligence should therefore be judged by:

**coherence + explainability + interaction + outcome**

rather than by claims of production model accuracy.

---

# 87. DOCUMENT RELATIONSHIP

This document defines **how the simulated intelligence behaves and how the prototype responds to changing conditions**.

The complete documentation architecture is:

```text
PRODUCT BRIEF
      ↓
PROTOTYPE PRD
      ↓
UX / UI DESIGN SYSTEM
      ↓
INFORMATION ARCHITECTURE & USER FLOWS
      ↓
INTELLIGENCE & SIMULATION
      ↓
MOCK DATA & DATA MODEL
      ↓
DEMO SCRIPT
```

The next document should define the exact **mock hospitals, inventory records, blood groups, requests, transfers, forecasts, risks, recommendations, scenarios, and relationships** required to make this intelligence layer work consistently.
