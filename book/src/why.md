# Why the testbed exists

## The short story

Freight companies, software vendors and authorities across Europe are moving to **eFTI** (electronic Freight Transport Information): transport documents that are exchanged digitally instead of on paper. For that to work, every participant's software must talk correctly to everyone else's, and must be safe to connect to.

Today there is nowhere realistic to check either. The testbed is the proposed answer.

## The problem

```mermaid
flowchart TB
    L["Your software<br/>on your own machine"]:::partner
    L -.-x P1["No other Gates<br/>to talk to"]:::gap
    L -.-x P2["No realistic<br/>message paths"]:::gap
    L -.-x P3["No shared way<br/>to prove it works"]:::gap
    L -.-x P4["No shared knowledge<br/>of new attacks"]:::gap

    classDef partner fill:#E3F2FD,stroke:#1E88E5,stroke-width:2px,color:#0D253F
    classDef gap fill:#FFEBEE,stroke:#E53935,stroke-width:2px,stroke-dasharray:5 3,color:#5F1412
```

- The EU **Reference Implementation** is a code reference, not a running platform you can test against.
- A local setup has **no peer Gates** to exchange data with.
- A local setup has **no production-shaped message paths**, so problems only show up late and at higher cost.
- When one participant discovers a weakness, **others have no common way to learn of it** and check themselves.
- There is **no common, trusted way to show a partner or an authority** that your software was tested.

## The goal

Give every verified participant a **shared, safe place to test**, so that problems are found early, between friendly parties, and the result can be shown to others. And do it in a way that **participants can trust with their most valuable asset: their code**.

```mermaid
flowchart LR
    subgraph before["Without the testbed"]
        direction TB
        b1["Test alone"]:::gap --> b2["Find problems late"]:::gap --> b3["Hard to prove readiness"]:::gap
    end
    subgraph after["With the testbed"]
        direction TB
        a1["Test against realistic<br/>counterparties"]:::testbed --> a2["Find problems early,<br/>incl. known attacks"]:::testbed --> a3["Hand over a signed report"]:::trust
    end
    before ==> after

    classDef gap fill:#FFEBEE,stroke:#E53935,stroke-width:2px,color:#5F1412
    classDef testbed fill:#E0F2F1,stroke:#00897B,stroke-width:2px,color:#00352F
    classDef trust fill:#F3E5F5,stroke:#8E24AA,stroke-width:2px,color:#38093F
    style before fill:#F5F7F8,stroke:#B0BEC5
    style after fill:#F5F7F8,stroke:#B0BEC5
```

## What the business gets

<div class="cards">
<div class="card">
<h4>Lower risk</h4>
Problems, including security weaknesses, are found in a safe environment, not in live operation.
</div>
<div class="card teal">
<h4>Less effort</h4>
No need to build and maintain your own test counterparties or your own list of attacks to check.
</div>
<div class="card purple">
<h4>Credibility</h4>
A signed report shows customers and authorities what was tested, when, and with what result.
</div>
<div class="card red">
<h4>Shared protection</h4>
When one participant finds a new attack, everyone else can check against it and fix it.
</div>
<div class="card orange">
<h4>A healthier ecosystem</h4>
Participants that pass can offer their services as counterparties for others to test against.
</div>
</div>

## Why it must be trustworthy with your code

A testbed is only useful if participants are willing to put their real software into it. That software is often the company's core intellectual property. If participants cannot be confident that nobody can read it, they will not use the testbed, and it fails at its purpose.

So confidentiality is not an add-on. The design removes the ways to get at a participant's code, including for the people who run the testbed, and everything from deployment onwards is automatic, so no person needs to be involved. [Trust and safety](trust-and-safety.md) explains how, and is honest about the limits.

## What the testbed is not

> **Scope note.** Whether a testbed report counts as an official certification is a decision for governance and the authorities. It is not decided by the technical design. The testbed makes the evidence trustworthy and verifiable. Others decide what it is worth.
>
> Likewise, a clean security result means "checked against the attack library, version X". It does not mean "secure against everything".
