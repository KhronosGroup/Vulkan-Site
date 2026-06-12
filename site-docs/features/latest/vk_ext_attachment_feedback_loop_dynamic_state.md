# VK_EXT_attachment_feedback_loop_dynamic_state

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_attachment_feedback_loop_dynamic_state.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [4. Examples](#_examples)
- [5. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)

[4. Examples](#_examples)
[5. Issues](#_issues)

This document proposes adding support for setting attachment feedback loops dynamically.

VK_EXT_attachment_feedback_loop_layout added functionality for handling feedback loops as a static pipeline state. Recent advances
in the Vulkan API have moved towards having dynamic states for every corresponding static pipeline state, but there is still no dynamic
state for attachment feedback loops.

This proposal aims to provide this functionality.

This functionality cannot be provided in any other way.

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           attachmentFeedbackLoopDynamicState;
} VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT;

`attachmentFeedbackLoopDynamicState` is the core feature enabling this extension’s functionality.

As an example, if an application creates a graphics pipeline using `VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT`,
`vkCmdSetAttachmentFeedbackLoopEnableEXT` can then be used to dynamically enable feedback loops on a per-aspect basis.

No known issues.
