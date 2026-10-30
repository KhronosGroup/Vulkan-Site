# VK_KHR_uniform_buffer_standard_layout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_uniform_buffer_standard_layout.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_uniform_buffer_standard_layout](#VK_KHR_uniform_buffer_standard_layout)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_uniform_buffer_standard_layout - device extension

**Name String**

`VK_KHR_uniform_buffer_standard_layout`

**Extension Type**

Device extension

**Registered Extension Number**

254

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
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Graeme Leese [gnl21](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_uniform_buffer_standard_layout] @gnl21%0A*Here describe the issue or question you have about the VK_KHR_uniform_buffer_standard_layout extension*)

**Last Modified Date**

2019-01-25

**Contributors**

* 
Graeme Leese, Broadcom

* 
Jeff Bolz, NVIDIA

* 
Tobias Hector, AMD

* 
Faith Ekstrand, Intel

* 
Neil Henning, AMD

This extension enables tighter array and structure packing to be used with
uniform buffers.

It modifies the alignment rules for uniform buffers, allowing for tighter
packing of arrays and structures.
This allows, for example, the std430 layout, as defined in
[GLSL](https://registry.khronos.org/OpenGL/specs/gl/GLSLangSpec.4.60.pdf) to
be supported in uniform buffers.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceUniformBufferStandardLayoutFeaturesKHR](VkPhysicalDeviceUniformBufferStandardLayoutFeatures.html)

* 
`VK_KHR_UNIFORM_BUFFER_STANDARD_LAYOUT_EXTENSION_NAME`

* 
`VK_KHR_UNIFORM_BUFFER_STANDARD_LAYOUT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFORM_BUFFER_STANDARD_LAYOUT_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2019-01-25 (Graeme Leese)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_uniform_buffer_standard_layout).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
