# VK_EXT_shader_split_barrier(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_split_barrier.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_split_barrier](#VK_EXT_shader_split_barrier)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_split_barrier - device extension

**Name String**

`VK_EXT_shader_split_barrier`

**Extension Type**

Device extension

**Registered Extension Number**

306

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_EXT_split_barrier](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_split_barrier.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_split_barrier] @mnetsch%0A*Here describe the issue or question you have about the VK_EXT_shader_split_barrier extension*)

**Extension Proposal**

[VK_EXT_shader_split_barrier](../../../../features/latest/features/proposals/VK_EXT_shader_split_barrier.html)

**Last Modified Date**

2026-05-08

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_split_barrier`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_split_barrier.txt)

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Elina Kamenetskaya, Qualcomm Technologies, Inc.

* 
Wooyoung Kim, Qualcomm Technologies, Inc.

* 
John Li, Qualcomm Technologies, Inc.

* 
Jeff Bolz, Nvidia

* 
Ben Ashbaugh, Intel

This extension splits `OpControlBarrier` by exposing two new barrier
operations with
[`SPV_EXT_split_barrier`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_split_barrier.html):

* 
`OpControlBarrierArriveEXT` - notifies that invocation has arrived
here

* 
`OpControlBarrierWaitEXT` - waits on all invocations before
proceeding execution

In the Vulkan context, this allows apps to synchronize Subgroup execution
flow within a Workgroup without requiring all Subgroups to wait at the
arrival condition before proceeding to execute independent work.
It also permits synchronizing memory access like other control barriers.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderSplitBarrierFeaturesEXT](VkPhysicalDeviceShaderSplitBarrierFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderSplitBarrierPropertiesEXT](VkPhysicalDeviceShaderSplitBarrierPropertiesEXT.html)

* 
`VK_EXT_SHADER_SPLIT_BARRIER_EXTENSION_NAME`

* 
`VK_EXT_SHADER_SPLIT_BARRIER_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SPLIT_BARRIER_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SPLIT_BARRIER_PROPERTIES_EXT](VkStructureType.html)

* 
Revision 1, 2026-05-08 (Matthew Netsch)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_split_barrier).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
