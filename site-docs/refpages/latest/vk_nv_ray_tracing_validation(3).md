# VK_NV_ray_tracing_validation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_ray_tracing_validation.html

## Table of Contents

- [Name](#_name)
- [VK_NV_ray_tracing_validation](#VK_NV_ray_tracing_validation)
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

VK_NV_ray_tracing_validation - device extension

**Name String**

`VK_NV_ray_tracing_validation`

**Extension Type**

Device extension

**Registered Extension Number**

569

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Vikram Kushwaha [vkushwaha-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_ray_tracing_validation] @vkushwaha-nv%0A*Here describe the issue or question you have about the VK_NV_ray_tracing_validation extension*)

**Extension Proposal**

[VK_NV_ray_tracing_validation](../../../../features/latest/features/proposals/VK_NV_ray_tracing_validation.html)

**Last Modified Date**

2024-03-04

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Eric Werness, NVIDIA

* 
Piers Daniell, NVIDIA

This extension adds support for performing ray tracing validation at an
implementation level.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRayTracingValidationFeaturesNV](VkPhysicalDeviceRayTracingValidationFeaturesNV.html)

* 
`VK_NV_RAY_TRACING_VALIDATION_EXTENSION_NAME`

* 
`VK_NV_RAY_TRACING_VALIDATION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_VALIDATION_FEATURES_NV](VkStructureType.html)

* 
Revision 1, 2024-03-04 (Vikram Kushwaha)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_ray_tracing_validation).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
