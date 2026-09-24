# VkDisplayPowerStateEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPowerStateEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPowerStateEXT - Possible power states for a display

Possible values of [VkDisplayPowerInfoEXT](VkDisplayPowerInfoEXT.html)::`powerState`, specifying
the new power state of a display, are:

// Provided by VK_EXT_display_control
typedef enum VkDisplayPowerStateEXT {
    VK_DISPLAY_POWER_STATE_OFF_EXT = 0,
    VK_DISPLAY_POWER_STATE_SUSPEND_EXT = 1,
    VK_DISPLAY_POWER_STATE_ON_EXT = 2,
} VkDisplayPowerStateEXT;

* 
[VK_DISPLAY_POWER_STATE_OFF_EXT](#) specifies that the display is
powered down.

* 
[VK_DISPLAY_POWER_STATE_SUSPEND_EXT](#) specifies that the display is
put into a low power mode, from which it **may** be able to transition back
to [VK_DISPLAY_POWER_STATE_ON_EXT](#) more quickly than if it were in
[VK_DISPLAY_POWER_STATE_OFF_EXT](#).
This state **may** be the same as [VK_DISPLAY_POWER_STATE_OFF_EXT](#).

* 
[VK_DISPLAY_POWER_STATE_ON_EXT](#) specifies that the display is
powered on.

[VK_EXT_display_control](VK_EXT_display_control.html), [VkDisplayPowerInfoEXT](VkDisplayPowerInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPowerStateEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
