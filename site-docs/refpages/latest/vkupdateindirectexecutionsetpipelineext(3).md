# vkUpdateIndirectExecutionSetPipelineEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkUpdateIndirectExecutionSetPipelineEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkUpdateIndirectExecutionSetPipelineEXT - Update the contents of an indirect execution set

Pipeline elements in an Indirect Execution Set can be updated by calling:

// Provided by VK_EXT_device_generated_commands
void vkUpdateIndirectExecutionSetPipelineEXT(
    VkDevice                                    device,
    VkIndirectExecutionSetEXT                   indirectExecutionSet,
    uint32_t                                    executionSetWriteCount,
    const VkWriteIndirectExecutionSetPipelineEXT* pExecutionSetWrites);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set being updated.

* 
`executionSetWriteCount` is the number of elements in the
`pExecutionSetWrites` array.

* 
`pExecutionSetWrites` is a pointer to an array of
[VkWriteIndirectExecutionSetPipelineEXT](VkWriteIndirectExecutionSetPipelineEXT.html) structures describing the
elements to update.

Valid Usage

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-11035) VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-11035

`indirectExecutionSet` **must** have been created with type
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT](VkIndirectExecutionSetInfoTypeEXT.html)

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-executionSetWriteCount-11037) VUID-vkUpdateIndirectExecutionSetPipelineEXT-executionSetWriteCount-11037

`executionSetWriteCount` **must** be less than or equal to
`VkIndirectExecutionSetPipelineInfoEXT`::`maxPipelineCount`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-pExecutionSetWrites-11042) VUID-vkUpdateIndirectExecutionSetPipelineEXT-pExecutionSetWrites-11042

Each element in the `pExecutionSetWrites` array must have a unique
`VkWriteIndirectExecutionSetPipelineEXT`::`index`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11038) VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11038

Each member of the Indirect Execution Set referenced by the update
command **must** not be in use by the device

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11324) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11324

If `initialPipeline` was created without
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), each pipeline in
`pExecutionSetWrites` **must** also have been created without
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11325) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11325

If `initialPipeline` was created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), each pipeline in
`pExecutionSetWrites` **must** also have been created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11039) VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11039

If `initialPipeline` was created without
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), the
layout of each pipeline in `pExecutionSetWrites` **must** be
[compatible](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with the `initialPipeline`
used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11040) VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11040

Each pipeline in the Indirect Execution Set **must** have identically
defined static and dynamic state values to the `initialPipeline`
used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11147) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11147

Each pipeline in the Indirect Execution Set **must** have identically
defined [fragment outputs interface](../../../../spec/latest/chapters/interfaces.html#interfaces-fragmentoutput) to the
`initialPipeline` used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11152) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11152

Each pipeline in the Indirect Execution Set **must** match the
`initialPipeline` used to create the Indirect Execution Set in its
included shader stages

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11098) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11098

Each pipeline in the Indirect Execution Set **must** match the
`initialPipeline` used to create the Indirect Execution Set in its
use of `FragDepth`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11086) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11086

Each pipeline in the Indirect Execution Set **must** match the
`initialPipeline` used to create the Indirect Execution Set in its
use of `SampleMask`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11085) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11085

Each pipeline in the Indirect Execution Set **must** match the
`initialPipeline` used to create the Indirect Execution Set in its
use of `StencilExportEXT`

Valid Usage (Implicit)

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-device-parameter) VUID-vkUpdateIndirectExecutionSetPipelineEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-parameter) VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-parameter

 `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html) handle

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-pExecutionSetWrites-parameter) VUID-vkUpdateIndirectExecutionSetPipelineEXT-pExecutionSetWrites-parameter

 `pExecutionSetWrites` **must** be a valid pointer to an array of `executionSetWriteCount` valid [VkWriteIndirectExecutionSetPipelineEXT](VkWriteIndirectExecutionSetPipelineEXT.html) structures

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-executionSetWriteCount-arraylength) VUID-vkUpdateIndirectExecutionSetPipelineEXT-executionSetWriteCount-arraylength

 `executionSetWriteCount` **must** be greater than `0`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-parent) VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-parent

 `indirectExecutionSet` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectExecutionSet` **must** be externally synchronized

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkDevice](VkDevice.html), [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html), [VkWriteIndirectExecutionSetPipelineEXT](VkWriteIndirectExecutionSetPipelineEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkUpdateIndirectExecutionSetPipelineEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
