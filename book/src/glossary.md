# Glossary

Simplified definitions for orientation. They are not legal definitions.

| Term | Meaning |
|---|---|
| **eFTI** | Electronic Freight Transport Information: transport documents exchanged digitally rather than on paper. |
| **Gate** | An eFTI role: a national component, on the authority side, that lets authorities retrieve transport data from platforms and exchanges requests with other countries' Gates. |
| **Platform** | An eFTI role: the certified system, used by businesses, where transport data is created, held and managed. |
| **AAP** | Authority Access Point: the entry point that an authority's own applications use to reach the eFTI system. |
| **Testbed** | The shared service described in this book. |
| **Operator** | The organisation that runs the testbed. |
| **Partner / participant** | A verified organisation that tests its software in the testbed. |
| **Environment** | A sealed, private space holding one partner's software and its counterparties. |
| **Counterparty** | Software playing a role that the partner is not supplying. |
| **Stand-in (mock)** | A testbed-made counterparty: always available and predictable. |
| **Marketplace** | The catalogue of certified services from other partners, available as counterparties. |
| **Certified** | A service that has passed the official test suite for its role and version. |
| **Test suite** | A ready-made set of checks with a pass/fail result per check. |
| **Playground** | Partner-written test scenarios, including load tests within the partner's tier. |
| **Version combination** | The specific versions of message format, delivery profile and interface that an environment uses. |
| **Docker image** | A standard package containing a piece of software and everything it needs to run. Every participant submits their software this way, either as the image itself or as a reference to it. |
| **Deployment description (manifest)** | A short description of how a partner's software starts and what it needs, supplied with the Docker image or its reference. |
| **Zero-touch deployment** | Setup and running that are fully automatic: no person at the testbed is involved between submitting the image and receiving the report. |
| **Tier** | A partner's usage allowance (environments, downloads, load). |
| **Signed report** | The testbed's record of a test run, signed so that anyone can check it is genuine. |
| **Attack vector** | A specific way of attacking a system. |
| **Attack library** | The shared, curated and versioned collection of attack vectors the testbed can check for. |
| **CVE** | A public identifier for a known vulnerability in specific software. |
| **CWE** | A public category of software weakness. |
| **Curator** | A person who reviews a newly submitted attack before it enters the library. |
| **Hold-back (embargo)** | A period during which a verified new attack is not yet published, giving affected parties time to fix. |
| **Black-box check** | A check that tests a system from the outside only, as an attacker would, without looking inside. |
| **Confidential computing** | Special hardware that keeps software encrypted while it runs and proves it is genuine, so that even the machine's owner cannot read it. |
| **Audit log** | A tamper-evident record of important events. |
