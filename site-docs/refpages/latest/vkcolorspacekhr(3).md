# VkColorSpaceKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkColorSpaceKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkColorSpaceKHR - Supported color space of the presentation engine

Possible values of [VkSurfaceFormatKHR](VkSurfaceFormatKHR.html)::`colorSpace`, specifying
the color spaces that a presentation engine can accept, are:

// Provided by VK_KHR_surface
typedef enum VkColorSpaceKHR {
    VK_COLOR_SPACE_SRGB_NONLINEAR_KHR = 0,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_DISPLAY_P3_NONLINEAR_EXT = 1000104001,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_EXTENDED_SRGB_LINEAR_EXT = 1000104002,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT = 1000104003,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_DCI_P3_NONLINEAR_EXT = 1000104004,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_BT709_LINEAR_EXT = 1000104005,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_BT709_NONLINEAR_EXT = 1000104006,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_BT2020_LINEAR_EXT = 1000104007,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_HDR10_ST2084_EXT = 1000104008,
  // Provided by VK_EXT_swapchain_colorspace
  // VK_COLOR_SPACE_DOLBYVISION_EXT is legacy, but no reason was given in the API XML
    VK_COLOR_SPACE_DOLBYVISION_EXT = 1000104009,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_HDR10_HLG_EXT = 1000104010,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_ADOBERGB_LINEAR_EXT = 1000104011,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_ADOBERGB_NONLINEAR_EXT = 1000104012,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_PASS_THROUGH_EXT = 1000104013,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_EXTENDED_SRGB_NONLINEAR_EXT = 1000104014,
  // Provided by VK_AMD_display_native_hdr
    VK_COLOR_SPACE_DISPLAY_NATIVE_AMD = 1000213000,
  // VK_COLORSPACE_SRGB_NONLINEAR_KHR is a legacy alias
    VK_COLORSPACE_SRGB_NONLINEAR_KHR = VK_COLOR_SPACE_SRGB_NONLINEAR_KHR,
  // Provided by VK_EXT_swapchain_colorspace
  // VK_COLOR_SPACE_DCI_P3_LINEAR_EXT is a legacy alias
    VK_COLOR_SPACE_DCI_P3_LINEAR_EXT = VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT,
} VkColorSpaceKHR;

* 
[VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](#) specifies support for the images
in sRGB color space, encoded according to the sRGB specification.

* 
[VK_COLOR_SPACE_DISPLAY_P3_NONLINEAR_EXT](#) specifies support for the
images in Display-P3 color space, encoded using a Display-P3 transfer
function.

* 
[VK_COLOR_SPACE_EXTENDED_SRGB_LINEAR_EXT](#) specifies support for the
images in extended sRGB color space, encoded using a linear transfer
function.

* 
[VK_COLOR_SPACE_EXTENDED_SRGB_NONLINEAR_EXT](#) specifies support for
the images in extended sRGB color space, encoded according to the scRGB
specification.

* 
[VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT](#) specifies support for the
images in Display-P3 color space, encoded using a linear transfer
function.

* 
[VK_COLOR_SPACE_DCI_P3_NONLINEAR_EXT](#) specifies support for the
images in DCI-P3 color space, encoded according to the DCI-P3
specification.
Note that values in such an image are interpreted as XYZ encoded color
data by the presentation engine.

* 
[VK_COLOR_SPACE_BT709_LINEAR_EXT](#) specifies support for the images
in BT709 color space, encoded using a linear transfer function.

* 
[VK_COLOR_SPACE_BT709_NONLINEAR_EXT](#) specifies support for the
images in BT709 color space, encoded according to the BT709
specification.

* 
[VK_COLOR_SPACE_BT2020_LINEAR_EXT](#) specifies support for the images
in BT2020 color space, encoded using a linear transfer function.

* 
[VK_COLOR_SPACE_HDR10_ST2084_EXT](#) specifies support for the images
in HDR10 (BT2020) color space, encoded according to SMPTE ST2084
Perceptual Quantizer (PQ) specification.

* 
[VK_COLOR_SPACE_HDR10_HLG_EXT](#) specifies support for the images in
HDR10 (BT2020) color space, encoded according to the Hybrid Log Gamma
(HLG) specification.

* 
[VK_COLOR_SPACE_ADOBERGB_LINEAR_EXT](#) specifies support for images in
Adobe RGB color space, encoded using a linear transfer function.

* 
[VK_COLOR_SPACE_ADOBERGB_NONLINEAR_EXT](#) specifies support for the
images in Adobe RGB color space, encoded according to the Adobe RGB
specification (approximately Gamma 2.2).

* 
[VK_COLOR_SPACE_PASS_THROUGH_EXT](#) specifies that color components
are used “as is”.
This is intended to allow applications to supply data for color spaces
not described here.

* 
[VK_COLOR_SPACE_DISPLAY_NATIVE_AMD](#) specifies support for the
display’s native color space.
This matches the color space expectations of AMD’s FreeSync2 standard,
for displays supporting it.

|  | In the initial release of the `[VK_KHR_surface](VK_KHR_surface.html)` and
| --- | --- |
`[VK_KHR_swapchain](VK_KHR_swapchain.html)` extensions, the token
`VK_COLORSPACE_SRGB_NONLINEAR_KHR` was used.
Starting in the 2016-05-13 updates to the extension branches, matching
release 1.0.13 of the core API specification,
[VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](#) is used instead for consistency with
Vulkan naming rules.
The older enum is still available for backwards compatibility. |

|  | In older versions of this extension
| --- | --- |
[VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT](#) was misnamed
`VK_COLOR_SPACE_DCI_P3_LINEAR_EXT`.
This has been updated to indicate that it uses RGB color encoding, not XYZ.
The old name is legacy but is maintained for backwards compatibility. |

|  | In older versions of the `[VK_EXT_swapchain_colorspace](VK_EXT_swapchain_colorspace.html)` extension,
| --- | --- |
[VK_COLOR_SPACE_DOLBYVISION_EXT](#) was exposed.
The intent was to indicate the presentation engine shall decode an image
using the SMPTE ST 2084 Perceptual Quantizer (PQ) EOTF, and then apply a
proprietary OOTF to process the image.
However, Dolby Vision profile 8.4 describes an encoding using the Hybrid Log
Gamma (HLG) OETF, and there is no swapchain extension for signaling Dolby
Vision metadata to be used by a proprietary OOTF.
This enum is legacy but is maintained for backwards compatibility. |

|  | For a traditional “Linear” or non-gamma transfer function color space use
| --- | --- |
[VK_COLOR_SPACE_PASS_THROUGH_EXT](#). |

|  | On Wayland, [VK_COLOR_SPACE_PASS_THROUGH_EXT](#) can be used to disable
| --- | --- |
color management by the WSI on a surface, which makes it possible for the
application to create a `wp_color_management_surface_v1` object without
triggering a `surface_exists` protocol error.

See [vkCreateWaylandSurfaceKHR](vkCreateWaylandSurfaceKHR.html) |

The presentation engine interprets the pixel values of the R, G, and B
components as having been encoded using an appropriate transfer function.
Applications **should** ensure that the appropriate transfer function has been
applied.
[Texel encode](../../../../spec/latest/chapters/images.html#images-texel-encode) requires that all implementations
implicitly apply the sRGB EOTF-1 on R, G, and B components when shaders
write to an sRGB pixel format image, which is useful for sRGB color spaces.
For sRGB color spaces with other pixel formats, or other non-linear color
spaces, applications **can** apply the transfer function explicitly in a
shader.
The A channel is always interpreted as linearly encoded.

This extension defines enums for [VkColorSpaceKHR](#) that correspond to
the following color spaces:

| Name | Red Primary | Green Primary | Blue Primary | White-point | Transfer function |
| --- | --- | --- | --- | --- | --- |
| DCI-P3 | 1.000, 0.000 | 0.000, 1.000 | 0.000, 0.000 | 0.3333, 0.3333 | DCI P3 |
| Display-P3 | 0.680, 0.320 | 0.265, 0.690 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | Display-P3 |
| BT709 | 0.640, 0.330 | 0.300, 0.600 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | BT709 |
| sRGB | 0.640, 0.330 | 0.300, 0.600 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | sRGB |
| extended sRGB | 0.640, 0.330 | 0.300, 0.600 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | scRGB |
| HDR10_ST2084 | 0.708, 0.292 | 0.170, 0.797 | 0.131, 0.046 | 0.3127, 0.3290 (D65) | ST2084 PQ |
| HDR10_HLG | 0.708, 0.292 | 0.170, 0.797 | 0.131, 0.046 | 0.3127, 0.3290 (D65) | HLG |
| Adobe RGB | 0.640, 0.330 | 0.210, 0.710 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | Adobe RGB |

The transfer functions are described in the “Transfer Functions” chapter
of the [Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format).

Except Display-P3 OETF, which is:

  

  

where L is the linear value of a color component and E is the
encoded value (as stored in the image in memory).

|  | For most uses, the sRGB OETF is equivalent. |
| --- | --- |

[VK_KHR_surface](VK_KHR_surface.html), [VkSurfaceFormatKHR](VkSurfaceFormatKHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkColorSpaceKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
