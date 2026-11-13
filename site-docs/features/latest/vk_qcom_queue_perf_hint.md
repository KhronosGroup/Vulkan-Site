# VK_QCOM_queue_perf_hint

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_QCOM_queue_perf_hint.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Feature structures](#_feature_structures)
- [3.1._Feature_structures](#_feature_structures)
- [3.1.1. Property structures](#_property_structures)
- [3.1.1._Property_structures](#_property_structures)
- [4. Example](#_example)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Feature structures](#_feature_structures)

[4. Example](#_example)

This document proposes a new extension that adds performance hints to `VkQueue` objects.

The Vulkan API currently provides no mechanism for explicitly influencing device clock frequency.
On power-sensitive devices, clock management requires a careful balance between performance and battery life.

Today, this is managed by platform-level algorithms that decide when to increase or decrease clock speeds.
While these algorithms attempt to infer usage patterns, they may not always predict application needs
accurately, leading to suboptimal clock frequency decisions.

In particular, compute workloads often benefit from high clock rates, but unlike graphics
workloads, which have clear performance indicators such as frame rate, there is no universal metric for
compute performance that platform algorithms can rely on.

This creates a need for content-aware power constraints that can inform clock frequency decisions,
enabling better alignment between application requirements and device power management.

Devices typically operate at a single clock frequency, so exposing direct frequency control to applications
would introduce significant challenges. Such an approach could lead to thrashing, degrade performance for
performance-sensitive workloads, or unnecessarily increase power consumption for power-sensitive scenarios.

Instead, the API should expose hints that platform algorithms can use to determine the final frequency,
taking into account the active content requirements across all processes.

These hints should come from a normalized range of values, rather than specifying absolute frequencies.
This ensures interoperability across different devices and reduces complexity for application developers.

Finally, these hints should integrate seamlessly with existing platform algorithms. To achieve this,
hint values should be applied as constraints on the minimum and maximum frequency that the platform algorithm
is allowed to select, rather than overriding its decisions entirely.

By default, queues are created without a performance hint applied, meaning they will normally
factor into the platform algorithms.

The following function can be called to set a performance hint on the queue:

VkResult vkQueueSetPerfHintQCOM(
    VkQueue                   queue,
    const VkPerfHintInfoQCOM* pPerfHintInfo);

This command sets a performance hint on the queue, which persists for the lifetime
of the queue. Performance hints are automatically removed when the queue is destroyed.

Implementations may ignore performance hints for inactive queues, which
they determine in an implementation-dependent manner.

typedef struct VkPerfHintInfoQCOM {
    VkStructureType          sType;
    const void*              pNext;
    VkPerfHintTypeQCOM       type;
    uint32_t                 scale;
} VkPerfHintInfoQCOM;

* 
`type` is the type of performance hint being applied

* 
`scale` is a normalized fixed-point scale factor, only valid for
`VK_PERF_HINT_TYPE_SCALED_QCOM` type

typedef enum VkPerfHintTypeQCOM {
    VK_PERF_HINT_TYPE_DEFAULT_QCOM           = 0,
    VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM     = 1,
    VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM     = 2,
    VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM  = 3,
} VkPerfHintTypeQCOM;

* 
`VK_PERF_HINT_TYPE_DEFAULT_QCOM` resets the performance hint on the queue back to
the default state

* 
`VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM` specifies constraints on the minimum and maximum frequency the
platform algorithm should use to the minimum frequency the device supports, `devicefmin`

* 
`VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM` specifies constraints on the minimum and maximum frequency the
platform algorithm should use to the maximum frequency the device supports, `devicefmax`

* 
`VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM` specifies constraints on the minimum frequency the platform
algorithm should use as a scaled percentage of `devicefmax` and does not specify a constraint on the
maximum frequency the platform algorithm should use

The minimum frequency constraint applied by `VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM` can be determined by
the following calculation:

constraintfmin = floor((scale / 100) * devicefmax)

where `floor` selects next available lower frequency available on device, clamped to `devicefmin`.

Frequency constraints are applied with this ranking across the active queues to determine the final
frequency constraints for the platform algorithms in order of highest ranking to lowest:

* 
`VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM`

* 
`VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM` and `scale` equal to `100`

* 
`VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM` and `scale` equal to `99`

* 
`VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM` and `scale` equal to `98`

* 
…​

* 
`VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM` and `scale` equal to `0`

* 
`VK_PERF_HINT_TYPE_DEFAULT_QCOM`

* 
`VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM`

In other words, any active queue that does not specify a frequency constraint,
`VK_PERF_HINT_TYPE_DEFAULT_QCOM`, will override queues that specify
a frequency constraint of `VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM`.

A new feature is exposed with this extension:

typedef struct VkPhysicalDeviceQueuePerfHintFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           queuePerfHint;
} VkPhysicalDeviceQueuePerfHintFeaturesQCOM;

* 
`queuePerfHint` specifies that implementations support
the functionality of this extension

The following property is exposed by this extension:

typedef struct VkPhysicalDeviceQueuePerfHintPropertiesQCOM {
    VkStructureType                       sType;
    void*                                 pNext;
    VkQueueFlags                          supportedQueues;
} VkPhysicalDeviceQueuePerfHintPropertiesQCOM;

* 
`supportedQueues` is a bitmask of `VkQueueFlagBits` indicating the family of queues
on which setting perf hints are supported

`VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM` overrides all:

queueA = VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM;
queueB = VK_PERF_HINT_TYPE_DEFAULT_QCOM;
queueC = VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM; // scale = 50
queueD = VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM;

// Results in
global_constraint_fmin = device_fmax;
global_constraint_fmax = device_fmax;

`VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM` overrides none:

queueA = VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM;
queueB = VK_PERF_HINT_TYPE_DEFAULT_QCOM;

// Results in
global_constraint_fmin = device_fmin;
global_constraint_fmax = device_fmax;

Complex example:

queueA = VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM;
queueB = VK_PERF_HINT_TYPE_DEFAULT_QCOM;
queueC = VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM; // scale == 25
queueD = VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM; // scale == 60

// Results in
global_constraint_fmin = floor(0.6 * device_fmax);
global_constraint_fmax = device_fmax;

Clock down when only low power usages are active:

queueA = VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM;
queueB = VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM;

// Results in
global_constraint_fmin = device_fmin;
global_constraint_fmax = device_fmin;
