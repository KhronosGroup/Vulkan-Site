# VK_EXT_custom_border_color(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_custom_border_color.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_custom_border_color](#VK_EXT_custom_border_color)
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

VK_EXT_custom_border_color - device extension

**Name String**

`VK_EXT_custom_border_color`

**Extension Type**

Device extension

**Registered Extension Number**

288

**Revision**

12

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Uses**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Liam Middlebrook [liam-middlebrook](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_custom_border_color] @liam-middlebrook%0A*Here describe the issue or question you have about the VK_EXT_custom_border_color extension*)

**Last Modified Date**

2020-04-16

**IP Status**

No known IP claims.

**Contributors**

* 
Joshua Ashton, Valve

* 
Hans-Kristian Arntzen, Valve

* 
Philip Rebohle, Valve

* 
Liam Middlebrook, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Tobias Hector, AMD

* 
Faith Ekstrand, Intel

* 
Spencer Fricke, Samsung Electronics

* 
Graeme Leese, Broadcom

* 
Jesse Hall, Google

* 
Jan-Harald Fredriksen, ARM

* 
Tom Olson, ARM

* 
Stuart Smith, Imagination Technologies

* 
Donald Scorgie, Imagination Technologies

* 
Alex Walters, Imagination Technologies

* 
Peter Quayle, Imagination Technologies

This extension provides cross-vendor functionality to specify a custom
border color for use when the sampler address mode
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](VkSamplerAddressMode.html) is used.

To create a sampler which uses a custom border color set
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`borderColor` to one of:

* 
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html)

* 
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)

When [VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html) is used, applications must provide a
[VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html) in the `pNext` chain for
[VkSamplerCreateInfo](VkSamplerCreateInfo.html).

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCustomBorderColorFeaturesEXT](VkPhysicalDeviceCustomBorderColorFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceCustomBorderColorPropertiesEXT](VkPhysicalDeviceCustomBorderColorPropertiesEXT.html)

Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html):

* 
[VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html)

* 
`VK_EXT_CUSTOM_BORDER_COLOR_EXTENSION_NAME`

* 
`VK_EXT_CUSTOM_BORDER_COLOR_SPEC_VERSION`

* 
Extending [VkBorderColor](VkBorderColor.html):

[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html)

* 
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_BORDER_COLOR_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_BORDER_COLOR_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_CUSTOM_BORDER_COLOR_CREATE_INFO_EXT](VkStructureType.html)

1) Should VkClearColorValue be used for the border color value, or should we
have our own struct/union? Do we need to specify the type of the input
values for the components? This is more of a concern if VkClearColorValue is
used here because it provides a union of float,int,uint types.

**RESOLVED**: Will reuse existing VkClearColorValue structure in order to
easily take advantage of float,int,uint borderColor types.

2) For hardware which supports a limited number of border colors what
happens if that number is exceeded? Should this be handled by the driver
unbeknownst to the application? In Revision 1 we had solved this issue using
a new Object type, however that may have lead to additional system resource
consumption which would otherwise not be required.

**RESOLVED**: Added
`VkPhysicalDeviceCustomBorderColorPropertiesEXT`::`maxCustomBorderColorSamplers`
for tracking implementation-specific limit, and Valid Usage statement
handling overflow.

3) Should this be supported for immutable samplers at all, or by a feature
bit? Some implementations may not be able to support custom border colors on
immutable samplers — is it worthwhile enabling this to work on them for
implementations that can support it, or forbidding it entirely.

**RESOLVED**: Samplers created with a custom border color are forbidden from
being immutable.
This resolves concerns for implementations where the custom border color is
an index to a LUT instead of being directly embedded into sampler state.

4) Should UINT and SINT (unsigned integer and signed integer) border color
types be separated or should they be combined into one generic INT (integer)
type?

**RESOLVED**: Separating these does not make much sense as the existing fixed
border color types do not have this distinction, and there is no reason in
hardware to do so.
This separation would also create unnecessary work and considerations for
the application.

* 
Revision 1, 2019-10-10 (Joshua Ashton)

Internal revisions.

Revision 2, 2019-10-11 (Liam Middlebrook)

* 
Remove VkCustomBorderColor object and associated functions

* 
Add issues concerning HW limitations for custom border color count

Revision 3, 2019-10-12 (Joshua Ashton)

* 
Re-expose the limits for the maximum number of unique border colors

* 
Add extra details about border color tracking

* 
Fix typos

Revision 4, 2019-10-12 (Joshua Ashton)

* 
Changed maxUniqueCustomBorderColors to a uint32_t from a VkDeviceSize

Revision 5, 2019-10-14 (Liam Middlebrook)

* 
Added features bit

Revision 6, 2019-10-15 (Joshua Ashton)

* 
Type-ize VK_BORDER_COLOR_CUSTOM

* 
Fix const-ness on `pNext` of
VkSamplerCustomBorderColorCreateInfoEXT

Revision 7, 2019-11-26 (Liam Middlebrook)

* 
Renamed maxUniqueCustomBorderColors to maxCustomBorderColors

Revision 8, 2019-11-29 (Joshua Ashton)

* 
Renamed borderColor member of VkSamplerCustomBorderColorCreateInfoEXT
to customBorderColor

Revision 9, 2020-02-19 (Joshua Ashton)

* 
Renamed maxCustomBorderColors to maxCustomBorderColorSamplers

Revision 10, 2020-02-21 (Joshua Ashton)

* 
Added format to VkSamplerCustomBorderColorCreateInfoEXT and feature bit

Revision 11, 2020-04-07 (Joshua Ashton)

* 
Dropped UINT/SINT border color differences, consolidated types

Revision 12, 2020-04-16 (Joshua Ashton)

* 
Renamed VK_BORDER_COLOR_CUSTOM_FLOAT_EXT to
VK_BORDER_COLOR_FLOAT_CUSTOM_EXT for consistency

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_custom_border_color).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
