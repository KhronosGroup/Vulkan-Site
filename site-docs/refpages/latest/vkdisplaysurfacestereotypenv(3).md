# VkDisplaySurfaceStereoTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplaySurfaceStereoTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplaySurfaceStereoTypeNV - 3D Stereo type

Possible values of
[VkDisplaySurfaceStereoCreateInfoNV](VkDisplaySurfaceStereoCreateInfoNV.html)::`stereoType`, specifying the
type of 3D stereo presentation the display will be configured for, are:

// Provided by VK_NV_display_stereo
typedef enum VkDisplaySurfaceStereoTypeNV {
    VK_DISPLAY_SURFACE_STEREO_TYPE_NONE_NV = 0,
    VK_DISPLAY_SURFACE_STEREO_TYPE_ONBOARD_DIN_NV = 1,
    VK_DISPLAY_SURFACE_STEREO_TYPE_HDMI_3D_NV = 2,
    VK_DISPLAY_SURFACE_STEREO_TYPE_INBAND_DISPLAYPORT_NV = 3,
} VkDisplaySurfaceStereoTypeNV;

* 
[VK_DISPLAY_SURFACE_STEREO_TYPE_NONE_NV](#) specifies no configuration
for stereo presentation.
This is the default behavior if [VkDisplaySurfaceStereoCreateInfoNV](VkDisplaySurfaceStereoCreateInfoNV.html)
is not provided.

* 
[VK_DISPLAY_SURFACE_STEREO_TYPE_ONBOARD_DIN_NV](#) specifies
configuration for glasses that connect via a DIN connector on the back
of the graphics card.

* 
[VK_DISPLAY_SURFACE_STEREO_TYPE_HDMI_3D_NV](#) specifies configuration
for HDMI 3D compatible display devices with their own stereo emitters.
This is also known as HDMI Frame Packed Stereo, where the left and right
eye images are stacked into a single frame with a doubled pixel clock
and refresh rate.

* 
[VK_DISPLAY_SURFACE_STEREO_TYPE_INBAND_DISPLAYPORT_NV](#) specifies
configuration for DisplayPort display devices with in-band stereo
signaling and emitters.

[VK_NV_display_stereo](VK_NV_display_stereo.html), [VkDisplaySurfaceStereoCreateInfoNV](VkDisplaySurfaceStereoCreateInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplaySurfaceStereoTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
