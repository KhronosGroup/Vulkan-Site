# VK_EXT_swapchain_colorspace(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_swapchain_colorspace.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_swapchain_colorspace](#VK_EXT_swapchain_colorspace)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_swapchain_colorspace - instance extension

**Name String**

`VK_EXT_swapchain_colorspace`

**Extension Type**

Instance extension

**Registered Extension Number**

105

**Revision**

5

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Courtney Goeltzenleuchter [courtney-g](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_swapchain_colorspace] @courtney-g%0A*Here describe the issue or question you have about the VK_EXT_swapchain_colorspace extension*)

**Last Modified Date**

2019-04-26

**IP Status**

No known IP claims.

**Contributors**

* 
Courtney Goeltzenleuchter, Google

This extension expands [VkColorSpaceKHR](VkColorSpaceKHR.html) to add support for most
standard color spaces beyond [VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](VkColorSpaceKHR.html).
This extension also adds support for [VK_COLOR_SPACE_PASS_THROUGH_EXT](VkColorSpaceKHR.html)
which allows applications to use color spaces not explicitly enumerated in
[VkColorSpaceKHR](VkColorSpaceKHR.html).

* 
`VK_EXT_SWAPCHAIN_COLOR_SPACE_EXTENSION_NAME`

* 
`VK_EXT_SWAPCHAIN_COLOR_SPACE_SPEC_VERSION`

* 
Extending [VkColorSpaceKHR](VkColorSpaceKHR.html):

[VK_COLOR_SPACE_ADOBERGB_LINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_ADOBERGB_NONLINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_BT2020_LINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_BT709_LINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_BT709_NONLINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_DCI_P3_LINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_DCI_P3_NONLINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_DISPLAY_P3_NONLINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_DOLBYVISION_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_EXTENDED_SRGB_LINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_EXTENDED_SRGB_NONLINEAR_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_HDR10_HLG_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_HDR10_ST2084_EXT](VkColorSpaceKHR.html)

* 
[VK_COLOR_SPACE_PASS_THROUGH_EXT](VkColorSpaceKHR.html)

1) Does the spec need to specify which kinds of image formats support the
color spaces?

**RESOLVED**: Pixel format is independent of color space (though some color
spaces really want / need floating-point color components to be useful).
Therefore, do not plan on documenting what formats support which color
spaces.
An application **can** call [vkGetPhysicalDeviceSurfaceFormatsKHR](vkGetPhysicalDeviceSurfaceFormatsKHR.html) to query
what a particular implementation supports.

2) How does application determine if HW supports appropriate transfer
function for a color space?

**RESOLVED**: Extension indicates that implementation **must** not do the OETF
encoding if it is not sRGB.
That responsibility falls to the application shaders.
Any other native OETF / EOTF functions supported by an implementation can be
described by separate extension.

* 
Revision 1, 2016-12-27 (Courtney Goeltzenleuchter)

Initial version

Revision 2, 2017-01-19 (Courtney Goeltzenleuchter)

* 
Add pass through and multiple options for BT2020.

* 
Clean up some issues with equations not displaying properly.

Revision 3, 2017-06-23 (Courtney Goeltzenleuchter)

* 
Add extended sRGB non-linear enum.

Revision 4, 2019-04-26 (Graeme Leese)

* 
Clarify color space transfer function usage.

* 
Refer to normative definitions in the Data Format Specification.

* 
Clarify DCI-P3 and Display P3 usage.

Revision 5, 2024-03-16 (Zehui Lin)

* 
Fix interchanged concepts of EOTF and OETF.

* 
Clarify that the presentation engine can accept the color spaces.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_swapchain_colorspace).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
