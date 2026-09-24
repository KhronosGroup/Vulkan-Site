# VkAntiLagModeAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAntiLagModeAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAntiLagModeAMD - Set the status of the anti-lag feature

Possible values of [VkAntiLagDataAMD](VkAntiLagDataAMD.html)::`mode`, specifying the
anti-lag status, are:

// Provided by VK_AMD_anti_lag
typedef enum VkAntiLagModeAMD {
    VK_ANTI_LAG_MODE_DRIVER_CONTROL_AMD = 0,
    VK_ANTI_LAG_MODE_ON_AMD = 1,
    VK_ANTI_LAG_MODE_OFF_AMD = 2,
} VkAntiLagModeAMD;

* 
[VK_ANTI_LAG_MODE_DRIVER_CONTROL_AMD](#) specifies that anti-lag will
be enabled or disabled depending on driver settings.

* 
[VK_ANTI_LAG_MODE_ON_AMD](#) specifies that anti-lag will be enabled.

* 
[VK_ANTI_LAG_MODE_OFF_AMD](#) specifies that anti-lag will be disabled.

[VK_AMD_anti_lag](VK_AMD_anti_lag.html), [VkAntiLagDataAMD](VkAntiLagDataAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkAntiLagModeAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
