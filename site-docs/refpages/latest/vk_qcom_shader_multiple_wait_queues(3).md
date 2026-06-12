# VK_QCOM_shader_multiple_wait_queues(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_shader_multiple_wait_queues.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_shader_multiple_wait_queues](#VK_QCOM_shader_multiple_wait_queues)
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

VK_QCOM_shader_multiple_wait_queues - device extension

**Name String**

`VK_QCOM_shader_multiple_wait_queues`

**Extension Type**

Device extension

**Registered Extension Number**

305

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
[SPV_QCOM_multiple_wait_queues](https://github.khronos.org/SPIRV-Registry/extensions/QCOM/SPV_QCOM_multiple_wait_queues.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_shader_multiple_wait_queues] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_shader_multiple_wait_queues extension*)

**Extension Proposal**

[VK_QCOM_shader_multiple_wait_queues](../../../../features/latest/features/proposals/VK_QCOM_shader_multiple_wait_queues.html)

**Last Modified Date**

2026-05-04

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_QCOM_multiple_wait_queues`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/qcom/GLSL_QCOM_multiple_wait_queues.txt)

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Elina Kamenetskaya, Qualcomm Technologies, Inc.

* 
Wooyoung Kim, Qualcomm Technologies, Inc.

This extension adds a new loop control hint to the SPIR-V execution
environment, instructing the compiler that it should use multiple wait
queues to optimize a loop.

This can improve performance for loops that have high latency instructions
such as for `[VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html)` operations, by allowing the
compiler to issue instructions for future iterations while waiting for the
current iteration to complete.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderMultipleWaitQueuesFeaturesQCOM](VkPhysicalDeviceShaderMultipleWaitQueuesFeaturesQCOM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM](VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM.html)

* 
`VK_QCOM_SHADER_MULTIPLE_WAIT_QUEUES_EXTENSION_NAME`

* 
`VK_QCOM_SHADER_MULTIPLE_WAIT_QUEUES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MULTIPLE_WAIT_QUEUES_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MULTIPLE_WAIT_QUEUES_PROPERTIES_QCOM](VkStructureType.html)

* 
Revision 1, 2026-05-04 (Matthew Netsch)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_shader_multiple_wait_queues).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
