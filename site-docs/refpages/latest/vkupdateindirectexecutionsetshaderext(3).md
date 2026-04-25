# vkUpdateIndirectExecutionSetShaderEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkUpdateIndirectExecutionSetShaderEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkUpdateIndirectExecutionSetShaderEXT - Update the contents of an indirect execution set

Shader object elements in an Indirect Execution Set can be updated by
calling:

// Provided by VK_EXT_device_generated_commands
void vkUpdateIndirectExecutionSetShaderEXT(
    VkDevice                                    device,
    VkIndirectExecutionSetEXT                   indirectExecutionSet,
    uint32_t                                    executionSetWriteCount,
    const VkWriteIndirectExecutionSetShaderEXT* pExecutionSetWrites);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set being updated.

* 
`executionSetWriteCount` is the number of elements in the
`pExecutionSetWrites` array.

* 
`pExecutionSetWrites` is a pointer to an array of
[VkWriteIndirectExecutionSetShaderEXT](VkWriteIndirectExecutionSetShaderEXT.html) structures describing the
elements to update.

Valid Usage

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-11041) VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-11041

`indirectExecutionSet` **must** have been created with type
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](VkIndirectExecutionSetInfoTypeEXT.html)

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-11043) VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-11043

Each element in the `pExecutionSetWrites` array must have a unique
`VkWriteIndirectExecutionSetShaderEXT`::`index`

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-None-11044) VUID-vkUpdateIndirectExecutionSetShaderEXT-None-11044

Each member of the Indirect Execution Set referenced by the update
command **must** not be in use by the device

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pInitialShaders-11326) VUID-vkUpdateIndirectExecutionSetShaderEXT-pInitialShaders-11326

If the shaders in `pInitialShaders` were created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html), each shader in
`pExecutionSetWrites` **must** also have been created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pInitialShaders-11327) VUID-vkUpdateIndirectExecutionSetShaderEXT-pInitialShaders-11327

If the shaders in `pInitialShaders` were created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html), each pipeline in
`pExecutionSetWrites` **must** also have been created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-11140) VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-11140

If the shaders in `pInitialShaders` were created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html), the
descriptor layout of each shader in `pExecutionSetWrites` **must** be
[compatible](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with the initial layout info
used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-None-11148) VUID-vkUpdateIndirectExecutionSetShaderEXT-None-11148

Each fragment shader element in the Indirect Execution Set **must** have
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined)
[fragment outputs interface](../../../../spec/latest/chapters/interfaces.html#interfaces-fragmentoutput) to the initial
shader state used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-FragDepth-11054) VUID-vkUpdateIndirectExecutionSetShaderEXT-FragDepth-11054

Each fragment shader element in the Indirect Execution Set **must** match
the initial shader state used to create the Indirect Execution Set in
its use of `FragDepth`

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-SampleMask-11050) VUID-vkUpdateIndirectExecutionSetShaderEXT-SampleMask-11050

Each fragment shader element in the Indirect Execution Set **must** match
the initial shader state used to create the Indirect Execution Set in
its use of `SampleMask`

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-StencilExportEXT-11003) VUID-vkUpdateIndirectExecutionSetShaderEXT-StencilExportEXT-11003

Each fragment shader element in the Indirect Execution Set **must** match
the initial shader state used to create the Indirect Execution Set in
its use of `StencilExportEXT`

Valid Usage (Implicit)

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-device-parameter) VUID-vkUpdateIndirectExecutionSetShaderEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-parameter) VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-parameter

 `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html) handle

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-parameter) VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-parameter

 `pExecutionSetWrites` **must** be a valid pointer to an array of `executionSetWriteCount` valid [VkWriteIndirectExecutionSetShaderEXT](VkWriteIndirectExecutionSetShaderEXT.html) structures

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-executionSetWriteCount-arraylength) VUID-vkUpdateIndirectExecutionSetShaderEXT-executionSetWriteCount-arraylength

 `executionSetWriteCount` **must** be greater than `0`

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-parent) VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-parent

 `indirectExecutionSet` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectExecutionSet` **must** be externally synchronized

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkDevice](VkDevice.html), [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html), [VkWriteIndirectExecutionSetShaderEXT](VkWriteIndirectExecutionSetShaderEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkUpdateIndirectExecutionSetShaderEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
