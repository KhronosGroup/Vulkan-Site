# VK_KHR_present_wait2

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_present_wait2.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

This document details the proposed design for a replacement for the
VK_KHR_present_wait extension providing the same functionality, but being
queryable per surface instead of per device.

Vulkan WSI needs a way to wait until after a specified image has been
presented to allow applications to control latency and pace frames.

The VK_KHR_present_wait extension already exists to solve this problem,
however it is exposed via device capability. This leads to problems on
some platforms where feature presence is not known at the device level.

Without knowing if a device can support the extension or not, the
extension must be universally disabled, limiting its usability.

This proposal aims to fix this shortcoming in VK_KHR_present_wait.

Deprecate the existing VK_KHR_present_wait extension and replace it with
an almost identical extension, except this time make it queryable per surface
instead of per device.

At the same time, reconsider some of the VK_KHR_present_wait language
regarding when the wait finishes, allowing it to be implementation-dependent,
instead of using terms like "time to light" and "first pixel", which would
incidentally specify API behavior that is difficult to implement and less
useful for dominant use cases.

API related to "time to light" and "first pixel" is deferred to a future
extension.
