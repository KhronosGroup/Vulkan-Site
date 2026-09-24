# VK_INTEL_performance_query(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_INTEL_performance_query.html

## Table of Contents

- [Name](#_name)
- [VK_INTEL_performance_query](#VK_INTEL_performance_query)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Example Code](#_example_code)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_INTEL_performance_query - device extension

**Name String**

`VK_INTEL_performance_query`

**Extension Type**

Device extension

**Registered Extension Number**

211

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Special Use**

* 
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Lionel Landwerlin [llandwerlin](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_INTEL_performance_query] @llandwerlin%0A*Here describe the issue or question you have about the VK_INTEL_performance_query extension*)

**Last Modified Date**

2018-05-16

**IP Status**

No known IP claims.

**Contributors**

* 
Lionel Landwerlin, Intel

* 
Piotr Maciejewski, Intel

This extension allows an application to capture performance data to be
interpreted by an external application or library.

Such a library is available at : [https://github.com/intel/metrics-discovery](https://github.com/intel/metrics-discovery)

Performance analysis tools such as
[Graphics
Performance Analyzers](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) make use of this extension and the metrics-discovery
library to present the data in a human readable way.

* 
[VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html)

* 
[vkAcquirePerformanceConfigurationINTEL](vkAcquirePerformanceConfigurationINTEL.html)

* 
[vkCmdSetPerformanceMarkerINTEL](vkCmdSetPerformanceMarkerINTEL.html)

* 
[vkCmdSetPerformanceOverrideINTEL](vkCmdSetPerformanceOverrideINTEL.html)

* 
[vkCmdSetPerformanceStreamMarkerINTEL](vkCmdSetPerformanceStreamMarkerINTEL.html)

* 
[vkGetPerformanceParameterINTEL](vkGetPerformanceParameterINTEL.html)

* 
[vkInitializePerformanceApiINTEL](vkInitializePerformanceApiINTEL.html)

* 
[vkQueueSetPerformanceConfigurationINTEL](vkQueueSetPerformanceConfigurationINTEL.html)

* 
[vkReleasePerformanceConfigurationINTEL](vkReleasePerformanceConfigurationINTEL.html)

* 
[vkUninitializePerformanceApiINTEL](vkUninitializePerformanceApiINTEL.html)

* 
[VkInitializePerformanceApiInfoINTEL](VkInitializePerformanceApiInfoINTEL.html)

* 
[VkPerformanceConfigurationAcquireInfoINTEL](VkPerformanceConfigurationAcquireInfoINTEL.html)

* 
[VkPerformanceMarkerInfoINTEL](VkPerformanceMarkerInfoINTEL.html)

* 
[VkPerformanceOverrideInfoINTEL](VkPerformanceOverrideInfoINTEL.html)

* 
[VkPerformanceStreamMarkerInfoINTEL](VkPerformanceStreamMarkerInfoINTEL.html)

* 
[VkPerformanceValueINTEL](VkPerformanceValueINTEL.html)

* 
Extending [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

[VkQueryPoolCreateInfoINTEL](VkQueryPoolPerformanceQueryCreateInfoINTEL.html)

* 
[VkQueryPoolPerformanceQueryCreateInfoINTEL](VkQueryPoolPerformanceQueryCreateInfoINTEL.html)

* 
[VkPerformanceValueDataINTEL](VkPerformanceValueDataINTEL.html)

* 
[VkPerformanceConfigurationTypeINTEL](VkPerformanceConfigurationTypeINTEL.html)

* 
[VkPerformanceOverrideTypeINTEL](VkPerformanceOverrideTypeINTEL.html)

* 
[VkPerformanceParameterTypeINTEL](VkPerformanceParameterTypeINTEL.html)

* 
[VkPerformanceValueTypeINTEL](VkPerformanceValueTypeINTEL.html)

* 
[VkQueryPoolSamplingModeINTEL](VkQueryPoolSamplingModeINTEL.html)

* 
`VK_INTEL_PERFORMANCE_QUERY_EXTENSION_NAME`

* 
`VK_INTEL_PERFORMANCE_QUERY_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_PERFORMANCE_CONFIGURATION_INTEL](VkObjectType.html)

Extending [VkQueryType](VkQueryType.html):

* 
[VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL](VkQueryType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_INITIALIZE_PERFORMANCE_API_INFO_INTEL](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PERFORMANCE_CONFIGURATION_ACQUIRE_INFO_INTEL](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PERFORMANCE_MARKER_INFO_INTEL](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PERFORMANCE_OVERRIDE_INFO_INTEL](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PERFORMANCE_STREAM_MARKER_INFO_INTEL](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO_INTEL](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_QUERY_CREATE_INFO_INTEL](VkStructureType.html)

// A previously created device
VkDevice device;

// A queue derived from the device
VkQueue queue;

VkInitializePerformanceApiInfoINTEL performanceApiInfoIntel = {
  VK_STRUCTURE_TYPE_INITIALIZE_PERFORMANCE_API_INFO_INTEL,
  NULL,
  NULL
};

vkInitializePerformanceApiINTEL(
  device,
  &performanceApiInfoIntel);

VkQueryPoolPerformanceQueryCreateInfoINTEL queryPoolIntel = {
  VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO_INTEL,
  NULL,
  VK_QUERY_POOL_SAMPLING_MODE_MANUAL_INTEL,
};

VkQueryPoolCreateInfo queryPoolCreateInfo = {
  VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO,
  &queryPoolIntel,
  0,
  VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL,
  1,
  0
};

VkQueryPool queryPool;

VkResult result = vkCreateQueryPool(
  device,
  &queryPoolCreateInfo,
  NULL,
  &queryPool);

assert(VK_SUCCESS == result);

// A command buffer we want to record counters on
VkCommandBuffer commandBuffer;

VkCommandBufferBeginInfo commandBufferBeginInfo = {
  VK_STRUCTURE_TYPE_COMMAND_BUFFER_BEGIN_INFO,
  NULL,
  VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT,
  NULL
};

result = vkBeginCommandBuffer(commandBuffer, &commandBufferBeginInfo);

assert(VK_SUCCESS == result);

vkCmdResetQueryPool(
  commandBuffer,
  queryPool,
  0,
  1);

vkCmdBeginQuery(
  commandBuffer,
  queryPool,
  0,
  0);

// Perform the commands you want to get performance information on
// ...

// Perform a barrier to ensure all previous commands were complete before
// ending the query
vkCmdPipelineBarrier(commandBuffer,
  VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT,
  VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT,
  0,
  0,
  NULL,
  0,
  NULL,
  0,
  NULL);

vkCmdEndQuery(
  commandBuffer,
  queryPool,
  0);

result = vkEndCommandBuffer(commandBuffer);

assert(VK_SUCCESS == result);

VkPerformanceConfigurationAcquireInfoINTEL performanceConfigurationAcquireInfo = {
  VK_STRUCTURE_TYPE_PERFORMANCE_CONFIGURATION_ACQUIRE_INFO_INTEL,
  NULL,
  VK_PERFORMANCE_CONFIGURATION_TYPE_COMMAND_QUEUE_METRICS_DISCOVERY_ACTIVATED_INTEL
};

VkPerformanceConfigurationINTEL performanceConfigurationIntel;

result = vkAcquirePerformanceConfigurationINTEL(
  device,
  &performanceConfigurationAcquireInfo,
  &performanceConfigurationIntel);

vkQueueSetPerformanceConfigurationINTEL(queue, performanceConfigurationIntel);

assert(VK_SUCCESS == result);

// Submit the command buffer and wait for its completion
// ...

result = vkReleasePerformanceConfigurationINTEL(
  device,
  performanceConfigurationIntel);

assert(VK_SUCCESS == result);

// Get the report size from metrics-discovery's QueryReportSize

result = vkGetQueryPoolResults(
  device,
  queryPool,
  0, 1, QueryReportSize,
  data, QueryReportSize, 0);

assert(VK_SUCCESS == result);

// The data can then be passed back to metrics-discovery from which
// human readable values can be queried.

* 
Revision 2, 2020-03-06 (Lionel Landwerlin)

Rename VkQueryPoolCreateInfoINTEL in
VkQueryPoolPerformanceQueryCreateInfoINTEL

Revision 1, 2018-05-16 (Lionel Landwerlin)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_INTEL_performance_query).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
