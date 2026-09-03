# VkPhysicalDeviceSchedulingControlsFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSchedulingControlsFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSchedulingControlsFlagBitsARM - Bitmask specifying scheduling controls supported by a physical device

Bits which **can** be set in
[VkPhysicalDeviceSchedulingControlsPropertiesARM](VkPhysicalDeviceSchedulingControlsPropertiesARM.html)::`schedulingControlsFlags`,
specifying supported scheduling controls, are:

// Provided by VK_ARM_scheduling_controls
// Flag bits for VkPhysicalDeviceSchedulingControlsFlagBitsARM
typedef VkFlags64 VkPhysicalDeviceSchedulingControlsFlagBitsARM;
static const VkPhysicalDeviceSchedulingControlsFlagBitsARM VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_SHADER_CORE_COUNT_ARM = 0x00000001ULL;
static const VkPhysicalDeviceSchedulingControlsFlagBitsARM VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_DISPATCH_PARAMETERS_ARM = 0x00000002ULL;

* 
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_SHADER_CORE_COUNT_ARM](#)
specifies that a [VkDeviceQueueShaderCoreControlCreateInfoARM](VkDeviceQueueShaderCoreControlCreateInfoARM.html)
structure **may** be included in the `pNext` chain of a
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html) or [VkDeviceCreateInfo](VkDeviceCreateInfo.html) structure.

* 
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_DISPATCH_PARAMETERS_ARM](#)
specifies that a [vkCmdSetDispatchParametersARM](vkCmdSetDispatchParametersARM.html) command **may** be
recorded in a command buffer and that properties returned in
[VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM](VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM.html)
are valid.

[VK_ARM_scheduling_controls](VK_ARM_scheduling_controls.html), [VkPhysicalDeviceSchedulingControlsFlagsARM](VkPhysicalDeviceSchedulingControlsFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceSchedulingControlsFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
