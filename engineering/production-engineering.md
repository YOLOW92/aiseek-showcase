# 05 / Treat release failure as a normal case

[Portfolio](../README.md) · [English](production-engineering.md) · [简体中文](production-engineering.zh-CN.md) · [日本語](production-engineering.ja.md)

**Access control · CI/CD · Recovery · Production debugging**

![05 / Treat release failure as a normal case](../assets/diagrams/release.jpg)

## Problem

Passing a build does not mean a candidate can safely take traffic. Recovery can fail too: a missing image tag once made the previous document-worker image unavailable to the rollback path.

## My judgment

I required validation before activation, checks around the switch and preservation of the previous release. Access and publication boundaries are part of delivery, not checks left to the frontend.

## Implementation

The release path validates, builds, checks a candidate over HTTP, switches services and checks the public result. Failure before the switch keeps the current release; failure after it invokes recovery. Tests also reject malformed release commands before production is touched.

## Results and evidence

The selected command test exercises rejected inputs. The source regression suite simulates candidate failure, post-switch failure and restoration of the previous revision, including preservation of running image references.

[release-command.test.sh](../proof/code-excerpts/release-command.test.sh) · [changelog](https://aiseek.dev/en/changelog)

## Next step

Browser error collection is delivered. The current release route uses HTTP checks; browser-based release smoke tests were removed. Database fixes use forward-only migrations.

[All engineering cases](README.md)
