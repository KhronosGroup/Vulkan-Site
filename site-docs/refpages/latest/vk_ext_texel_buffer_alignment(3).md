# VK_EXT_texel_buffer_alignment(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_texel_buffer_alignment.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_texel_buffer_alignment](#VK_EXT_texel_buffer_alignment)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_texel_buffer_alignment - device extension

**Name String**

`VK_EXT_texel_buffer_alignment`

**Extension Type**

Device extension

**Registered Extension Number**

282

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_texel_buffer_alignment] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_texel_buffer_alignment extension*)

**Last Modified Date**

2019-06-06

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension adds more expressive alignment requirements for uniform and
storage texel buffers.
Some implementations have single texel alignment requirements that cannot be
expressed via
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`minTexelBufferOffsetAlignment`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT](VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceTexelBufferAlignmentPropertiesEXT](VkPhysicalDeviceTexelBufferAlignmentProperties.html)

* 
`VK_EXT_TEXEL_BUFFER_ALIGNMENT_EXTENSION_NAME`

* 
`VK_EXT_TEXEL_BUFFER_ALIGNMENT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_PROPERTIES_EXT](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
However, only the properties structure is promoted.
The feature structure is not promoted and `texelBufferAlignment` is
enabled if using a Vulkan 1.3 instance.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API name is still available as an alias of the core
functionality.

* 
Revision 1, 2019-06-06 (Jeff Bolz)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_texel_buffer_alignment).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
