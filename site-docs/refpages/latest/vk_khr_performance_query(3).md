# VK_KHR_performance_query(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_performance_query.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_performance_query](#VK_KHR_performance_query)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_performance_query - device extension

**Name String**

`VK_KHR_performance_query`

**Extension Type**

Device extension

**Registered Extension Number**

117

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Alon Or-bach [alonorbach](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_performance_query] @alonorbach%0A*Here describe the issue or question you have about the VK_KHR_performance_query extension*)

**Last Modified Date**

2019-10-08

**IP Status**

No known IP claims.

**Contributors**

* 
Jesse Barker, Unity Technologies

* 
Kenneth Benzie, Codeplay

* 
Jan-Harald Fredriksen, ARM

* 
Jeff Leger, Qualcomm

* 
Jesse Hall, Google

* 
Tobias Hector, AMD

* 
Neil Henning, Codeplay

* 
Baldur Karlsson

* 
Lionel Landwerlin, Intel

* 
Peter Lohrmann, AMD

* 
Alon Or-bach, Samsung

* 
Daniel Rakos, AMD

* 
Niklas Smedberg, Unity Technologies

* 
Igor Ostrowski, Intel

The `VK_KHR_performance_query` extension adds a mechanism to allow querying
of performance counters for use in applications and by profiling tools.

Each queue family **may** expose counters that **can** be enabled on a queue of
that family.
We extend [VkQueryType](VkQueryType.html) to add a new query type for performance queries,
and chain a structure on [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html) to specify the
performance queries to enable.

* 
[vkAcquireProfilingLockKHR](vkAcquireProfilingLockKHR.html)

* 
[vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR](vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR.html)

* 
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html)

* 
[vkReleaseProfilingLockKHR](vkReleaseProfilingLockKHR.html)

* 
[VkAcquireProfilingLockInfoKHR](VkAcquireProfilingLockInfoKHR.html)

* 
[VkPerformanceCounterDescriptionKHR](VkPerformanceCounterDescriptionKHR.html)

* 
[VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePerformanceQueryFeaturesKHR](VkPhysicalDevicePerformanceQueryFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDevicePerformanceQueryPropertiesKHR](VkPhysicalDevicePerformanceQueryPropertiesKHR.html)

Extending [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkQueryPoolPerformanceCreateInfoKHR](VkQueryPoolPerformanceCreateInfoKHR.html)

Extending [VkSubmitInfo](VkSubmitInfo.html), [VkSubmitInfo2](VkSubmitInfo2.html):

* 
[VkPerformanceQuerySubmitInfoKHR](VkPerformanceQuerySubmitInfoKHR.html)

* 
[VkPerformanceCounterResultKHR](VkPerformanceCounterResultKHR.html)

* 
[VkAcquireProfilingLockFlagBitsKHR](VkAcquireProfilingLockFlagBitsKHR.html)

* 
[VkPerformanceCounterDescriptionFlagBitsKHR](VkPerformanceCounterDescriptionFlagBitsKHR.html)

* 
[VkPerformanceCounterScopeKHR](VkPerformanceCounterScopeKHR.html)

* 
[VkPerformanceCounterStorageKHR](VkPerformanceCounterStorageKHR.html)

* 
[VkPerformanceCounterUnitKHR](VkPerformanceCounterUnitKHR.html)

* 
[VkAcquireProfilingLockFlagsKHR](VkAcquireProfilingLockFlagsKHR.html)

* 
[VkPerformanceCounterDescriptionFlagsKHR](VkPerformanceCounterDescriptionFlagsKHR.html)

* 
`VK_KHR_PERFORMANCE_QUERY_EXTENSION_NAME`

* 
`VK_KHR_PERFORMANCE_QUERY_SPEC_VERSION`

* 
Extending [VkQueryType](VkQueryType.html):

[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACQUIRE_PROFILING_LOCK_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_DESCRIPTION_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PERFORMANCE_QUERY_SUBMIT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_QUERY_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_QUERY_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_CREATE_INFO_KHR](VkStructureType.html)

1) Should this extension include a mechanism to begin a query in command
buffer *A* and end the query in command buffer *B*?

**RESOLVED** No - queries are tied to command buffer creation and thus have to
be encapsulated within a single command buffer.

2) Should this extension include a mechanism to begin and end queries
globally on the queue, not using the existing command buffer commands?

**RESOLVED** No - for the same reasoning as the resolution of 1).

3) Should this extension expose counters that require multiple passes?

**RESOLVED** Yes - users should re-submit a command buffer with the same
commands in it multiple times, specifying the pass to count as the query
parameter in VkPerformanceQuerySubmitInfoKHR.

4) How to handle counters across parallel workloads?

**RESOLVED** In the spirit of Vulkan, a counter description flag
[VK_PERFORMANCE_COUNTER_DESCRIPTION_CONCURRENTLY_IMPACTED_BIT_KHR](VkPerformanceCounterDescriptionFlagBitsKHR.html)
denotes that the accuracy of a counter result is affected by parallel
workloads.

5) How to handle secondary command buffers?

**RESOLVED** Secondary command buffers inherit any counter pass index
specified in the parent primary command buffer.
Note: this is no longer an issue after change from issue 10 resolution

6) What commands does the profiling lock have to be held for?

**RESOLVED** For any command buffer that is being queried with a performance
query pool, the profiling lock **must** be held while that command buffer is in
the *recording*, *executable*, or *pending state*.

7) Should we support [vkCmdCopyQueryPoolResults](vkCmdCopyQueryPoolResults.html)?

**RESOLVED** Yes.

8) Should we allow performance queries to interact with multiview?

**RESOLVED** Yes, but the performance queries must be performed once for each
pass per view.

9) Should a `queryCount > 1` be usable for performance queries?

**RESOLVED** Yes.
Some vendors will have costly performance counter query pool creation, and
would rather if a certain set of counters were to be used multiple times
that a `queryCount > 1` can be used to amortize the instantiation cost.

10) Should we introduce an indirect mechanism to set the counter pass index?

**RESOLVED** Specify the counter pass index at submit time instead, to avoid
requiring re-recording of command buffers when multiple counter passes are
needed.

The following example shows how to find what performance counters a queue
family supports, setup a query pool to record these performance counters,
how to add the query pool to the command buffer to record information, and
how to get the results from the query pool.

// A previously created physical device
VkPhysicalDevice physicalDevice;

// One of the queue families our device supports
uint32_t queueFamilyIndex;

uint32_t counterCount;

// Get the count of counters supported
vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR(
  physicalDevice,
  queueFamilyIndex,
  &counterCount,
  NULL,
  NULL);

VkPerformanceCounterKHR* counters =
  malloc(sizeof(VkPerformanceCounterKHR) * counterCount);
VkPerformanceCounterDescriptionKHR* counterDescriptions =
  malloc(sizeof(VkPerformanceCounterDescriptionKHR) * counterCount);

// Get the counters supported
vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR(
  physicalDevice,
  queueFamilyIndex,
  &counterCount,
  counters,
  counterDescriptions);

// Try to enable the first 8 counters
uint32_t enabledCounters[8];

const uint32_t enabledCounterCount = min(counterCount, 8));

for (uint32_t i = 0; i 

* 
Revision 1, 2019-10-08

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_performance_query).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
