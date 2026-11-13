# VK_KHR_vertex_attribute_divisor(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_vertex_attribute_divisor.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_vertex_attribute_divisor](#VK_KHR_vertex_attribute_divisor)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_vertex_attribute_divisor - device extension

**Name String**

`VK_KHR_vertex_attribute_divisor`

**Extension Type**

Device extension

**Registered Extension Number**

526

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_vertex_attribute_divisor] @syoussefi%0A*Here describe the issue or question you have about the VK_KHR_vertex_attribute_divisor extension*)

**Extension Proposal**

[VK_KHR_vertex_attribute_divisor](../../../../features/latest/features/proposals/VK_KHR_vertex_attribute_divisor.html)

**Last Modified Date**

2023-09-20

**IP Status**

No known IP claims.

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Contributors to `[VK_EXT_vertex_attribute_divisor](VK_EXT_vertex_attribute_divisor.html)`

This extension is based on the `[VK_EXT_vertex_attribute_divisor](VK_EXT_vertex_attribute_divisor.html)`
extension.
The only difference is the new property `supportsNonZeroFirstInstance`,
which indicates support for non-zero values in `firstInstance`.
This allows the extension to be supported on implementations that have
traditionally only supported OpenGL ES.

* 
[VkVertexInputBindingDivisorDescriptionKHR](VkVertexInputBindingDivisorDescription.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVertexAttributeDivisorFeaturesKHR](VkPhysicalDeviceVertexAttributeDivisorFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceVertexAttributeDivisorPropertiesKHR](VkPhysicalDeviceVertexAttributeDivisorProperties.html)

Extending [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html):

* 
[VkPipelineVertexInputDivisorStateCreateInfoKHR](VkPipelineVertexInputDivisorStateCreateInfo.html)

* 
`VK_KHR_VERTEX_ATTRIBUTE_DIVISOR_EXTENSION_NAME`

* 
`VK_KHR_VERTEX_ATTRIBUTE_DIVISOR_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO_KHR](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2023-09-20 (Shahbaz Youssefi)

First Version, based on `[VK_EXT_vertex_attribute_divisor](VK_EXT_vertex_attribute_divisor.html)`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_vertex_attribute_divisor).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
