# vkGetDataGraphPipelineSessionMemoryRequirementsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDataGraphPipelineSessionMemoryRequirementsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDataGraphPipelineSessionMemoryRequirementsARM - Get the memory requirements of a data graph pipeline session

To determine the memory requirements for a data graph pipeline session,
call:

// Provided by VK_ARM_data_graph
void vkGetDataGraphPipelineSessionMemoryRequirementsARM(
    VkDevice                                    device,
    const VkDataGraphPipelineSessionMemoryRequirementsInfoARM* pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the data graph pipeline
session.

* 
`pInfo` is a pointer to a
[VkDataGraphPipelineSessionMemoryRequirementsInfoARM](VkDataGraphPipelineSessionMemoryRequirementsInfoARM.html) structure
containing parameters for the memory requirements query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the data graph pipeline
session object are returned.

Valid Usage

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-session-09950) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-session-09950

The `session` member of `pInfo` **must** have been created with
`device`

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-bindPoint-09784) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-bindPoint-09784

The `bindPoint` member of `pInfo` **must** have been returned as
part of a [VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html) whose
`bindPointType` member is
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TYPE_MEMORY_ARM](VkDataGraphPipelineSessionBindPointTypeARM.html) by a
prior call to
[vkGetDataGraphPipelineSessionBindPointRequirementsARM](vkGetDataGraphPipelineSessionBindPointRequirementsARM.html) for the
`session` member of `pInfo`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-device-parameter) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-pInfo-parameter) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineSessionMemoryRequirementsInfoARM](VkDataGraphPipelineSessionMemoryRequirementsInfoARM.html) structure

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-pMemoryRequirements-parameter) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionMemoryRequirementsInfoARM](VkDataGraphPipelineSessionMemoryRequirementsInfoARM.html), [VkDevice](VkDevice.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkGetDataGraphPipelineSessionMemoryRequirementsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
