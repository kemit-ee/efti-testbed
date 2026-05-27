# Theme 6 — Operations & Reliability

## Changes

- _Initial state._

> Architecture: v0.2 §3.

<!-- issue-body:begin -->


**Q:** How is the testbed run reliably and data kept safe?

Three operational substrates other themes lean on but none own: reliability (SLOs + edge resilience as one stakeholder question), notifications (one channel-abstraction for all event types), and durability (central state outlives envs and needs DR).

## Theme done when

- [ ] [E25 — Service-Level Reliability](service_level_reliability.md): consistent health / capacity / SLO metrics; documented alert thresholds; TLS-correct, rate-limited, DDoS-protected, session-hardened public surface; gated operator paths.
- [ ] [E26 — Notification Substrate](notification_substrate.md): one substrate for partner-facing and operator-facing notifications; every "is notified" / "are alerted" reference across other epics resolves here.
- [ ] [E27 — Backup, Restore & Disaster Recovery](backup_restore_dr.md): documented RPO/RTO; automated backups; regularly exercised restores.

<!-- issue-body:end -->
