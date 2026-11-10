# For operators and regulators

This page is for people who run the testbed or who rely on what it produces.

## If you operate the testbed

The operator's role is deliberately narrow. The testbed is designed to run itself, so that people are not needed inside a partner's environment.

<div class="cards">
<div class="card teal">
<h4>What the operator does</h4>
Verifies applicants and issues access keys. Sets usage tiers. Certifies services for the marketplace. Removes a partner for cause. Oversees the attack library together with the security curators. Watches health, capacity and the activity log.
</div>
<div class="card red">
<h4>What the operator cannot do</h4>
Open a session into a running environment. Read or copy a partner's software or logs. Hand-fix a failed deployment. These capabilities do not exist in the design.
</div>
</div>

The only manual steps are partner verification, key issuance and removal for cause. None of them involve a partner's software.

## If you rely on a report

A signed report lets you check, without trusting the partner's word, what was tested.

```mermaid
swimlane-beta TB
  subgraph you [Report consumer]
    recv([Receives a report<br/>from the partner])
    check[Check the signature<br/>against the report]
    valid{Valid?}
    good[Genuine and unaltered:<br/>read what was tested]
    bad[Do not rely on it]
  end
  subgraph tbp [Testbed, published once]
    pub[Public signing<br/>information]
  end
  recv --> check
  pub -->|used to check| check
  check --> valid
  valid -->|yes| good
  valid -->|no| bad

  classDef partnerC fill:#E3F2FD,stroke:#1E88E5,stroke-width:2px,color:#0D253F;
  classDef opC fill:#FFF3E0,stroke:#FB8C00,stroke-width:2px,color:#5A3000;
  classDef testbedC fill:#E0F2F1,stroke:#00897B,stroke-width:2px,color:#00352F;
  classDef secC fill:#FFEBEE,stroke:#E53935,stroke-width:2px,color:#5F1412;
  classDef trustC fill:#F3E5F5,stroke:#8E24AA,stroke-width:2px,color:#38093F;
  class recv,check,valid,good,bad trustC;
  class pub testbedC;
```

A genuine report states:

- which testbed issued it,
- which partner it concerns,
- exactly which version of their software was tested (identified by a fingerprint),
- the combination of protocol versions used,
- which test suite and which version of the attack library were run,
- the date and the outcome of each check.

> **What a report is not.** It is evidence of a test, signed by the testbed. Whether that evidence counts as official certification, and for what, is a decision for governance and the authorities. A report contains no code, no internal data and no raw logs, unless the partner chose to attach them.

Security findings are private to the partner. They appear in a report you are shown only if the partner included them. A report that states the attack-library version tells you exactly what was checked, and by extension what was not.

Next: [Glossary](glossary.md).
