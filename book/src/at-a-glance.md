# The testbed at a glance

A verified participant submits their software as a **Docker image**, or a **reference to one**. The testbed runs it in a **private, isolated environment**, surrounds it with **the other roles it needs to talk to**, checks that it **works** and that it is **protected**, and produces a **signed report**. **No person at the testbed is involved at any point between submission and report**, and **nobody can read the participant's code**.

## The big picture

```mermaid
flowchart LR
    You["<b>Your Docker image</b><br/>(or a reference to it)<br/>Gate, Platform or AAP"]:::partner
    Others["<b>Counterparties</b><br/>the other roles your<br/>software talks to"]:::cp
    Tests["<b>Functional tests</b><br/>ready-made suites or<br/>your own scenarios"]:::testbed
    Attacks["<b>Security checks</b><br/>known attacks from a<br/>shared library"]:::sec
    Env["<b>Private environment</b><br/>your software runs here,<br/>sealed off from everyone else"]:::testbed
    Report["<b>Signed report</b><br/>delivered to you,<br/>verifiable by anyone"]:::trust

    You -->|"you submit"| Env
    Others <-->|"realistic exchange"| Env
    Tests -->|"drive"| Env
    Attacks -->|"probe from outside"| Env
    Env ==>|"evidence"| Report

    classDef partner fill:#E3F2FD,stroke:#1E88E5,stroke-width:2px,color:#0D253F
    classDef testbed fill:#E0F2F1,stroke:#00897B,stroke-width:2px,color:#00352F
    classDef cp fill:#FFF3E0,stroke:#FB8C00,stroke-width:2px,color:#5A3000
    classDef sec fill:#FFEBEE,stroke:#E53935,stroke-width:2px,color:#5F1412
    classDef trust fill:#F3E5F5,stroke:#8E24AA,stroke-width:2px,color:#38093F
```

## In four steps

```mermaid
flowchart LR
    s1["<b>1. Join</b><br/>get verified"]:::partner
    s2["<b>2. Set up</b><br/>choose your role"]:::testbed
    s3["<b>3. Test</b><br/>works and protected"]:::testbed
    s4["<b>4. Prove</b><br/>get a signed report"]:::trust
    s1 --> s2 --> s3 --> s4

    classDef partner fill:#E3F2FD,stroke:#1E88E5,stroke-width:2px,color:#0D253F
    classDef testbed fill:#E0F2F1,stroke:#00897B,stroke-width:2px,color:#00352F
    classDef trust fill:#F3E5F5,stroke:#8E24AA,stroke-width:2px,color:#38093F
```

## How your software gets in

> **Docker images only, and fully automatic.** Every participant provides their software in the same way: as a **Docker image**, a standard package that contains everything the software needs to run. You either **upload the image** to the testbed or **give the testbed a reference** to it in your own private store. From that moment, validation, setup, testing and reporting happen **without any human interaction on the testbed's side**. The only person-to-person step is the one-time check at joining.

## Six ideas to remember

<div class="cards">
<div class="card">
<h4>You submit a Docker image</h4>
Either the image itself or a reference to it in your own private store. Nothing has to be installed on your side. The testbed runs it for you.
</div>
<div class="card purple">
<h4>Your code stays yours</h4>
Nobody can read it, including the operator. Everything after joining is automatic, so no person at the testbed ever touches your deployment.
</div>
<div class="card teal">
<h4>Everything is separate</h4>
Each test environment is sealed off from all others, so partners never see or affect each other.
</div>
<div class="card orange">
<h4>Realistic counterparties</h4>
Certified services from other partners where available, built-in stand-ins otherwise.
</div>
<div class="card red">
<h4>Works and is protected</h4>
Functional tests plus checks against a shared library of known attacks that grows when anyone finds a new one.
</div>
<div class="card purple">
<h4>Honest, signed reports</h4>
A report says what was tested, when, and with which result, and anyone can check it.
</div>
</div>

## The three roles

The testbed handles three kinds of eFTI software. A partner tests one of them and the testbed provides the rest.

| If you bring a… | The testbed provides… |
|---|---|
| **Gate** | A Platform, an AAP, and other Gates to exchange data with |
| **Platform** | A Gate and an AAP |
| **AAP** (Authority Access Point) | A Gate and a Platform |

Next: [Who is who](who-is-who.md) explains the people and roles around the testbed.
