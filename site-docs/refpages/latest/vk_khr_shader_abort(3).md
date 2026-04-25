# VK_KHR_shader_abort(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_abort.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_abort](#VK_KHR_shader_abort)
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

VK_KHR_shader_abort - device extension

**Name String**

`VK_KHR_shader_abort`

**Extension Type**

Device extension

**Registered Extension Number**

234

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

and

[VK_KHR_device_fault](VK_KHR_device_fault.html)

and

[VK_KHR_shader_constant_data](VK_KHR_shader_constant_data.html)

**SPIR-V Dependencies**

* 
[SPV_KHR_abort](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_abort.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_abort] @tobski%0A*Here describe the issue or question you have about the VK_KHR_shader_abort extension*)

**Extension Proposal**

[VK_KHR_shader_abort](../../../../features/latest/features/proposals/VK_KHR_shader_abort.html)

**Last Modified Date**

2026-03-18

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Piers Daniell, Nvidia

* 
Craig Graham, Samsung

* 
Erik Hogeman, ARM

* 
Ralph Potter, Samsung

* 
Vikram Tarikere, IMG

This extension enables the use of the `OpAbortKHR` instruction in
shaders.

* 
Extending [VkDeviceFaultDebugInfoKHR](VkDeviceFaultDebugInfoKHR.html):

[VkDeviceFaultShaderAbortMessageInfoKHR](VkDeviceFaultShaderAbortMessageInfoKHR.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceShaderAbortFeaturesKHR](VkPhysicalDeviceShaderAbortFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderAbortPropertiesKHR](VkPhysicalDeviceShaderAbortPropertiesKHR.html)

* 
`VK_KHR_SHADER_ABORT_EXTENSION_NAME`

* 
`VK_KHR_SHADER_ABORT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEVICE_FAULT_SHADER_ABORT_MESSAGE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ABORT_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ABORT_PROPERTIES_KHR](VkStructureType.html)

* 
Revision 1, 2024-08-22 (Tobias Hector)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_abort).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
