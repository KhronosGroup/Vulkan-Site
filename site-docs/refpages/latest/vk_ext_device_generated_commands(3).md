# VK_EXT_device_generated_commands(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_device_generated_commands.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_device_generated_commands](#VK_EXT_device_generated_commands)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Example Code](#_example_code)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_device_generated_commands - device extension

**Name String**

`VK_EXT_device_generated_commands`

**Extension Type**

Device extension

**Registered Extension Number**

573

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

         or

         [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

     and

     [VK_KHR_maintenance5](VK_KHR_maintenance5.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_EXT_shader_object

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_device_generated_commands] @zmike%0A*Here describe the issue or question you have about the VK_EXT_device_generated_commands extension*)

**Extension Proposal**

[VK_EXT_device_generated_commands](../../../../features/latest/features/proposals/VK_EXT_device_generated_commands.html)

**Last Modified Date**

2024-02-23

**Interactions and External Dependencies**

* 
This extension requires Vulkan 1.1

* 
This extension requires `VK_EXT_buffer_device_address` or
`VK_KHR_buffer_device_address` or Vulkan 1.2 for the ability to bind
vertex and index buffers on the device.

* 
This extension requires `VK_KHR_maintenance5` for the ability to use
VkPipelineCreateFlags2KHR.

* 
This extension interacts with `VK_NV_mesh_shader`.
If the latter extension is not supported, remove the command tokens to
initiate NV mesh tasks drawing in this extension.

* 
This extension interacts with `VK_EXT_mesh_shader`.
If the latter extension is not supported, remove the command tokens to
initiate EXT mesh tasks drawing in this extension.

* 
This extension interacts with `VK_KHR_ray_tracing_pipeline`.
If the latter extension is not supported, remove the command tokens to
initiate ray tracing in this extension.

* 
This extension interacts with `VK_EXT_shader_object`.
If the latter extension is not supported, remove references to shader
objects in this extension.

**Contributors**

* 
Mike Blumenkrantz, VALVE

* 
Hans-Kristian Arntzen, VALVE

* 
Jan-Harald Fredriksen, ARM

* 
Spencer Fricke, LunarG

* 
Ricardo Garcia, Igalia

* 
Tobias Hector, AMD

* 
Baldur Karlsson, VALVE

* 
Christoph Kubisch, NVIDIA

* 
Lionel Landwerlin, INTEL

* 
Jon Leech, Khronos

* 
Ting Wei, ARM

* 
Ken Shanyi Zhang, AMD

* 
Faith Ekstrand, Collabora

* 
Vikram Kushwaha, NVIDIA

* 
Connor Abbott, VALVE

* 
Samuel Pitoiset, VALVE

This extension allows the device to generate a number of commands for
command buffers.
It provides a subset of functionality from both
`VK_NV_device_generated_commands` and
`VK_NV_device_generated_commands_compute` as well as some new features.

When rendering a large number of objects, the device can be leveraged to
implement a number of critical functions, like updating matrices, or
implementing occlusion culling, frustum culling, front to back sorting, etc.
Implementing those on the device does not require any special extension,
since an application is free to define its own data structures, and just
process them using shaders.

To render objects which have been processed on the device, Vulkan has
several ways to perform indirect rendering, from the most basic
`vkCmdDrawIndirect` with one indirect draw to `vkCmdDrawIndirectCount` which
supports multiple indirect draws batched together, with a way to determine
number of draws at device execution time.

However, if rendering state needs to change between the indirect draws, then
unextended Vulkan forces the application to speculatively record a
prohibitive number of redundant indirect commands covering all possible
state combinations -
which could end up processing nothing after culling -
or read back the processed stream and issue graphics command from the host.
For very large scenes, the synchronization overhead and cost to generate the
command buffer can become the bottleneck.
This extension allows an application to generate a device side stream of
state changes and commands, and convert it efficiently into a command buffer
without having to read it back to the host.

Furthermore, it allows incremental changes to such command buffers by
manipulating only partial sections of a command stream — for example
pipeline and shader object bindings.
Unextended Vulkan requires re-creation of entire command buffers in such a
scenario, or updates synchronized on the host.

The intended usage for this extension is for the application to:

* 
create `VkBuffer` objects and retrieve physical addresses from them
via [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html)

* 
create a `VkIndirectExecutionSetEXT` for the ability to change
shaders on the device.

* 
create a [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html), which lists the
[VkIndirectCommandsTokenTypeEXT](VkIndirectCommandsTokenTypeEXT.html) it wants to dynamically execute as
an atomic command sequence.
This step likely involves some internal device code compilation, since
the intent is for the GPU to generate the command buffer based on the
layout.

* 
fill the input stream buffers with the data for each of the inputs it
needs.
Each input is an array that will be filled with token-dependent data.

* 
set up a preprocess `VkBuffer` that uses memory according to the
information retrieved via
[vkGetGeneratedCommandsMemoryRequirementsEXT](vkGetGeneratedCommandsMemoryRequirementsEXT.html).

* 
optionally preprocess the generated content using
[vkCmdPreprocessGeneratedCommandsEXT](vkCmdPreprocessGeneratedCommandsEXT.html), for example on an
asynchronous compute queue, or for the purpose of reusing the data in
multiple executions.

* 
call [vkCmdExecuteGeneratedCommandsEXT](vkCmdExecuteGeneratedCommandsEXT.html) to create and execute the
actual device commands for all sequences based on the inputs provided.

For each draw in a sequence, the following can be specified:

* 
a number of vertex buffer bindings

* 
a different index buffer, with an optional dynamic offset and index type

* 
a number of different push constants

* 
updates to bound shader stages

For each dispatch in a sequence, the following can be specified:

* 
a number of different push constants

* 
updates to bound shader stages

For each trace rays in a sequence, the following can be specified:

* 
a number of different push constants

* 
updates to bound shader stages

While the GPU can be faster than a CPU to generate the commands, it will not
happen asynchronously to the device, therefore the primary use case is
generating “less” total work (occlusion culling, classification to use
specialized shaders, etc.).

* 
[VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html)

* 
[VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html)

* 
[vkCmdExecuteGeneratedCommandsEXT](vkCmdExecuteGeneratedCommandsEXT.html)

* 
[vkCmdPreprocessGeneratedCommandsEXT](vkCmdPreprocessGeneratedCommandsEXT.html)

* 
[vkCreateIndirectCommandsLayoutEXT](vkCreateIndirectCommandsLayoutEXT.html)

* 
[vkCreateIndirectExecutionSetEXT](vkCreateIndirectExecutionSetEXT.html)

* 
[vkDestroyIndirectCommandsLayoutEXT](vkDestroyIndirectCommandsLayoutEXT.html)

* 
[vkDestroyIndirectExecutionSetEXT](vkDestroyIndirectExecutionSetEXT.html)

* 
[vkGetGeneratedCommandsMemoryRequirementsEXT](vkGetGeneratedCommandsMemoryRequirementsEXT.html)

* 
[vkUpdateIndirectExecutionSetPipelineEXT](vkUpdateIndirectExecutionSetPipelineEXT.html)

* 
[vkUpdateIndirectExecutionSetShaderEXT](vkUpdateIndirectExecutionSetShaderEXT.html)

* 
[VkBindIndexBufferIndirectCommandEXT](VkBindIndexBufferIndirectCommandEXT.html)

* 
[VkBindVertexBufferIndirectCommandEXT](VkBindVertexBufferIndirectCommandEXT.html)

* 
[VkDrawIndirectCountIndirectCommandEXT](VkDrawIndirectCountIndirectCommandEXT.html)

* 
[VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html)

* 
[VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html)

* 
[VkIndirectCommandsExecutionSetTokenEXT](VkIndirectCommandsExecutionSetTokenEXT.html)

* 
[VkIndirectCommandsIndexBufferTokenEXT](VkIndirectCommandsIndexBufferTokenEXT.html)

* 
[VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html)

* 
[VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html)

* 
[VkIndirectCommandsPushConstantTokenEXT](VkIndirectCommandsPushConstantTokenEXT.html)

* 
[VkIndirectCommandsVertexBufferTokenEXT](VkIndirectCommandsVertexBufferTokenEXT.html)

* 
[VkIndirectExecutionSetCreateInfoEXT](VkIndirectExecutionSetCreateInfoEXT.html)

* 
[VkIndirectExecutionSetPipelineInfoEXT](VkIndirectExecutionSetPipelineInfoEXT.html)

* 
[VkIndirectExecutionSetShaderInfoEXT](VkIndirectExecutionSetShaderInfoEXT.html)

* 
[VkIndirectExecutionSetShaderLayoutInfoEXT](VkIndirectExecutionSetShaderLayoutInfoEXT.html)

* 
[VkWriteIndirectExecutionSetPipelineEXT](VkWriteIndirectExecutionSetPipelineEXT.html)

* 
Extending [VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html), [VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html):

[VkGeneratedCommandsPipelineInfoEXT](VkGeneratedCommandsPipelineInfoEXT.html)

* 
[VkGeneratedCommandsShaderInfoEXT](VkGeneratedCommandsShaderInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT](VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)

If [VK_EXT_shader_object](VK_EXT_shader_object.html) is supported:

* 
[VkWriteIndirectExecutionSetShaderEXT](VkWriteIndirectExecutionSetShaderEXT.html)

* 
[VkIndirectCommandsTokenDataEXT](VkIndirectCommandsTokenDataEXT.html)

* 
[VkIndirectExecutionSetInfoEXT](VkIndirectExecutionSetInfoEXT.html)

* 
[VkIndirectCommandsInputModeFlagBitsEXT](VkIndirectCommandsInputModeFlagBitsEXT.html)

* 
[VkIndirectCommandsLayoutUsageFlagBitsEXT](VkIndirectCommandsLayoutUsageFlagBitsEXT.html)

* 
[VkIndirectCommandsTokenTypeEXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[VkIndirectExecutionSetInfoTypeEXT](VkIndirectExecutionSetInfoTypeEXT.html)

* 
[VkIndirectCommandsInputModeFlagsEXT](VkIndirectCommandsInputModeFlagsEXT.html)

* 
[VkIndirectCommandsLayoutUsageFlagsEXT](VkIndirectCommandsLayoutUsageFlagsEXT.html)

* 
`VK_EXT_DEVICE_GENERATED_COMMANDS_EXTENSION_NAME`

* 
`VK_EXT_DEVICE_GENERATED_COMMANDS_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_EXT](VkAccessFlagBits.html)

* 
[VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_EXT](VkAccessFlagBits.html)

Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

* 
[VK_BUFFER_USAGE_2_PREPROCESS_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_INDIRECT_COMMANDS_LAYOUT_EXT](VkObjectType.html)

* 
[VK_OBJECT_TYPE_INDIRECT_EXECUTION_SET_EXT](VkObjectType.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

* 
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_GENERATED_COMMANDS_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GENERATED_COMMANDS_MEMORY_REQUIREMENTS_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GENERATED_COMMANDS_PIPELINE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GENERATED_COMMANDS_SHADER_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_TOKEN_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_PIPELINE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_SHADER_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_SHADER_LAYOUT_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_WRITE_INDIRECT_EXECUTION_SET_PIPELINE_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_WRITE_INDIRECT_EXECUTION_SET_SHADER_EXT](VkStructureType.html)

TODO

* 
Revision 1, 2024-02-23 (Mike Blumenkrantz)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_device_generated_commands).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
