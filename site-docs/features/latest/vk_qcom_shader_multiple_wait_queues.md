# VK_QCOM_shader_multiple_wait_queues

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_QCOM_shader_multiple_wait_queues.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. SPIR-V](#_spir_v)
- [3.2. High Level Language Exposure](#_high_level_language_exposure)
- [3.2._High_Level_Language_Exposure](#_high_level_language_exposure)
- [3.3. Features and Properties](#_features_and_properties)
- [3.3._Features_and_Properties](#_features_and_properties)
- [4. Examples](#_examples)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. SPIR-V](#_spir_v)
[3.2. High Level Language Exposure](#_high_level_language_exposure)
[3.3. Features and Properties](#_features_and_properties)

[4. Examples](#_examples)

This document proposes a new extension that exposes deep asynchronous
data load queues in shaders.

High-performance compute and graphics shaders are frequently bound by memory latency.

Traditional compiler optimizations, such as instruction scheduling and loop unrolling,
are the standard methods for hiding memory latency by overlapping the gaps with
arithmetic instructions. By unrolling a loop, a compiler can issue memory loads for future iterations
`(N+1, N+2)` while the ALUs process the current iteration `(N)`.

However, these techniques may not be sufficient to fully hide the latency
for all workloads. Taking one example, [Cooperative Matrix](../../../../refpages/latest/refpages/source/VK_KHR_cooperative_matrix.html):

* 
**Register Pressure**

Cooperative matrix operations may consume significant register resources. Unrolling loops
to a depth sufficient to hide load latency can drastically increase the live register count, which
can lead to reduced performance if the register pressure becomes too great.

* 
**Monolithic Instructions**

Cooperative matrix operations are coarse-grained, monolithic arithmetic instructions
that may utilize dedicated hardware to process. Fine-grain instruction scheduling may not be possible for the
implementation.

A new mechanism is needed to deepen the data fetch pipeline for such workloads.

Two primary approaches were considered:

**Implicit Compiler Optimization**

Ideally, the compiler would detect the loop structure and automatically deepen the data fetch pipeline. However, this may not always result in optimal performance for all possible loop structures.

**Explicit Loop Control**

By explicitly tagging a loop with a hint, the application can fine tune the performance by influencing the compiler’s decisions.

The latter solution is a more robust solution for more use cases. Application developers should
sweep the loop control hint to determine the optimal value for the device, especially when using
cooperative matrix operations.

The extension exposes support a new loop control hint with
[SPV_QCOM_multiple_wait_queues](https://github.com/KhronosGroup/SPIRV-Registry/tree/main/extensionsQCOM/SPV_QCOM_multiple_wait_queues.html).

| **Loop Control** | **Enabling Capabilities** |
| --- | --- |
| 0x4000000 | **MultipleWaitQueuesQCOM**

A hint that the compiler may take advantage of multiple wait queues to optimize a loop
if a target supports them. Up to how many wait queues the compiler may use
is specified in a subsequent unsigned 32-bit integer literal operand.
The max queue count of 0 means the compiler may use all of the available wait queues. | **MultipleWaitQueuesQCOM** |

This functionality is gated behind a new SPIR-V capability:

| Capability | Implicitly declares |
| --- | --- |
| 4539 | **MultipleWaitQueuesQCOM**

To provide a compiler hint that the compiler may take advantage of multiple wait queues
to optimize a loop if a target supports them. |  |

The following summarizes how the loop control hint is exposed in GLSL (requires
[GL_EXT_control_flow_attributes](https://github.com/KhronosGroup/GLSL/tree/main/extensionsEXT/GL_EXT_control_flow_attributes.txt)):

       Attribute                     | Relevant on | Intent
      -------------------------------+-------------+------------------------------------
       *multiple_wait_queuesQCOM*    | Loop        | compiler may optimize the loop using multiple wait queues
       *multiple_wait_queuesQCOM(N)* | Loop        | compiler may optimize the loop using at most *N* multiple wait queues

A new feature is added with this extension:

typedef struct VkPhysicalDeviceShaderMultipleWaitQueuesFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderMultipleWaitQueues;
} VkPhysicalDeviceShaderMultipleWaitQueuesFeaturesQCOM;

* 
`shaderMultipleWaitQueues` indicates that the implementation supports SPIR-V modules
declaring the `MultipleWaitQueuesQCOM` capability.

A new limit is exposed with this extension:

typedef struct VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxShaderWaitQueues;
} VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM;

* 
`maxShaderWaitQueues` is the maximum number of wait queues that can be
set for a `MultipleWaitQueuesQCOM` loop control hint.

GLSL:

    [[multiple_wait_queuesQCOM(2)]]
    for (step = 0; step 

SPIR-V:

         %76 = OpLabel
               OpLoopMerge %78 %79 MultipleWaitQueuesQCOM 2
               OpBranch %80
         %80 = OpLabel
         %81 = OpLoad %uint %step
