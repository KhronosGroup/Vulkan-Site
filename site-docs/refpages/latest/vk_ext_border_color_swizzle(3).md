# VK_EXT_border_color_swizzle(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_border_color_swizzle.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_border_color_swizzle](#VK_EXT_border_color_swizzle)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_border_color_swizzle - device extension

**Name String**

`VK_EXT_border_color_swizzle`

**Extension Type**

Device extension

**Registered Extension Number**

412

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_custom_border_color](VK_EXT_custom_border_color.html)

**Special Uses**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_border_color_swizzle] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_border_color_swizzle extension*)

**Last Modified Date**

2021-10-12

**IP Status**

No known IP claims.

**Contributors**

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, Arm

* 
Ricardo Garcia, Igalia

* 
Shahbaz Youssefi, Google

* 
Stu Smith, AMD

After the publication of VK_EXT_custom_border_color, it was discovered that
some implementations had undefined behavior when combining a sampler that
uses a custom border color with image views whose component mapping is not
the identity mapping.

Since VK_EXT_custom_border_color has already shipped, this new extension
VK_EXT_border_color_swizzle was created to define the interaction between
custom border colors and non-identity image view swizzles, and provide a
work-around for implementations that must pre-swizzle the sampler border
color to match the image view component mapping it is combined with.

This extension also defines the behavior between samplers with an opaque
black border color and image views with a non-identity component swizzle,
which was previously left undefined.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceBorderColorSwizzleFeaturesEXT](VkPhysicalDeviceBorderColorSwizzleFeaturesEXT.html)

Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html):

* 
[VkSamplerBorderColorComponentMappingCreateInfoEXT](VkSamplerBorderColorComponentMappingCreateInfoEXT.html)

* 
`VK_EXT_BORDER_COLOR_SWIZZLE_EXTENSION_NAME`

* 
`VK_EXT_BORDER_COLOR_SWIZZLE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BORDER_COLOR_SWIZZLE_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_BORDER_COLOR_COMPONENT_MAPPING_CREATE_INFO_EXT](VkStructureType.html)

None.

* 
Revision 1, 2021-10-12 (Piers Daniell)

Internal revisions.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_border_color_swizzle).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
