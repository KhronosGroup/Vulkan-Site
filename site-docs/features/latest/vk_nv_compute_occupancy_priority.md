# VK_NV_compute_occupancy_priority

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_NV_compute_occupancy_priority.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Changes](#_api_changes)
- [3.1._API_Changes](#_api_changes)
- [3.1.1. VkComputeOccupancyPriorityParametersNV](#_vkcomputeoccupancypriorityparametersnv)
- [3.1.2. vkCmdSetComputeOccupancyPriorityNV](#_vkcmdsetcomputeoccupancyprioritynv)
- [3.2. Behavior](#_behavior)
- [3.3. State Management](#_state_management)
- [3.3._State_Management](#_state_management)
- [4. Issues](#_issues)
- [4.1. How does this interact with existing queue priorities?](#_how_does_this_interact_with_existing_queue_priorities)
- [4.1._How_does_this_interact_with_existing_queue_priorities?](#_how_does_this_interact_with_existing_queue_priorities)
- [4.2. Does this affect graphics workloads?](#_does_this_affect_graphics_workloads)
- [4.2._Does_this_affect_graphics_workloads?](#_does_this_affect_graphics_workloads)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Changes](#_api_changes)
[3.2. Behavior](#_behavior)
[3.3. State Management](#_state_management)

[4. Issues](#_issues)

[4.1. How does this interact with existing queue priorities?](#_how_does_this_interact_with_existing_queue_priorities)
[4.2. Does this affect graphics workloads?](#_does_this_affect_graphics_workloads)

Vulkan applications executing compute workloads currently have limited control over how their compute invocations utilize GPU compute resources. Application workloads may have different requirements for compute resource utilization based on their specific use cases - some workloads may benefit from aggressive SM occupancy for maximum performance, while others may need to be more conservative to avoid interfering with simultaneously executing workloads or to manage power consumption.

Currently, the driver makes all decisions about SM occupancy based on its internal heuristics, which may not align with application-specific requirements. This can lead to suboptimal performance or resource utilization in scenarios where applications have better knowledge of their workload characteristics and priorities.

The extension provides a mechanism for applications to provide hints to the driver about the priority with which compute workloads should occupy GPU compute resources. This allows applications to:

* 
Control the aggressiveness of compute occupancy for their compute workloads

* 
Balance performance requirements against resource sharing with concurrent workloads

* 
Implement application-specific compute resource management strategies

* 
Optimize for different use cases (e.g. real-time vs. background processing)

One solution considered for this problem was to utilize existing queue priorities that may be specified by an application. This approach was not pursued for a couple different reasons:

* 
Queue priorities are understood to express coarse, queue-level, scheduling priority across the entire GPU, whereas here we are concerned with relative prioritization for simultaneous usage of GPU compute functionality by workloads that have already been scheduled together.

* 
While it is understood that usage of a queue level priority may affect relative prioritization of workloads across queues, it does not allow for more fine-grained specification of priorities for individual workloads, nor does it allow for relative prioritization of workloads executing on the same queue, relegating all workloads on a queue to executing with the same level of occupancy priority.

A new structure is introduced to specify occupancy priority parameters:

typedef struct VkComputeOccupancyPriorityParametersNV {
    VkStructureType                    sType;
    const void*                        pNext;
    float                              occupancyPriority;
    float                              occupancyThrottling;
} VkComputeOccupancyPriorityParametersNV;

A new command is introduced to set the compute occupancy priority for subsequent compute dispatches:

VKAPI_ATTR void VKAPI_CALL vkCmdSetComputeOccupancyPriorityNV(
    VkCommandBuffer                                    commandBuffer,
    const VkComputeOccupancyPriorityParametersNV*      pParameters
);

The occupancy priority affects how compute workloads utilize GPU SM resources. Applications may specify a value between 0.0 and 1.0, where smaller values represent decreased priority relative to larger values.

The occupancy priority is stateful on a command buffer. All commands listed in the Dispatching Commands chapter issued subsequent to a [vkCmdSetComputeOccupancyPriorityNV](#_vkcmdsetcomputeoccupancyprioritynv) call will be executed with the specified priority parameters until another [vkCmdSetComputeOccupancyPriorityNV](#_vkcmdsetcomputeoccupancyprioritynv) call is made.

All command buffers (primary and secondary) start with a priority of 0.5, right in the middle of the valid range. The priority state is not inherited by secondary command buffers - each command buffer maintains its own independent priority state.

This extension operates at finer level and with a more narrow focus than existing queue level prioritization. Queue priorities are a coarse grained control affecting submission scheduling and overall GPU resource utilization, while compute occupancy priority affects how compute workloads utilize compute resources within the GPU relative to other simultaneously executing workloads.

The extension only allows specification of occupancy priority for compute workloads, however, the priorities will also impact the prioritization of compute workloads relative to simultaneously executing graphics workloads. In such a scenario, the graphics workload may be thought of as executing at the default priority level of 0.5, and so a simultaneously executing compute workload with greater occupancy priority specified will preferentially utilize available compute resources.
