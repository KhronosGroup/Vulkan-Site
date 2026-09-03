# VkGpaDeviceClockModeAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaDeviceClockModeAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaDeviceClockModeAMD - Enum providing the clock mode or query

Values which **can** be set in [VkGpaDeviceClockModeAMD](#) are:

// Provided by VK_AMD_gpa_interface
typedef enum VkGpaDeviceClockModeAMD {
    VK_GPA_DEVICE_CLOCK_MODE_DEFAULT_AMD = 0,
    VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD = 1,
    VK_GPA_DEVICE_CLOCK_MODE_PROFILING_AMD = 2,
    VK_GPA_DEVICE_CLOCK_MODE_MIN_MEMORY_AMD = 3,
    VK_GPA_DEVICE_CLOCK_MODE_MIN_ENGINE_AMD = 4,
    VK_GPA_DEVICE_CLOCK_MODE_PEAK_AMD = 5,
} VkGpaDeviceClockModeAMD;

* 
[VK_GPA_DEVICE_CLOCK_MODE_DEFAULT_AMD](#) specifies that device clocks
and other power settings are restored to their default values.

* 
[VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD](#) specifies that the current
clock values should be queried, with no new values set.

* 
[VK_GPA_DEVICE_CLOCK_MODE_PROFILING_AMD](#) specifies that clocks are
set to a constant amount which is known to be power and thermal
sustainable.
The engine/memory clock ratio will be kept the same as much as possible.

* 
[VK_GPA_DEVICE_CLOCK_MODE_MIN_MEMORY_AMD](#) specifies that the memory
clock is set to the lowest available level and the engine clock is set
to a thermal and power sustainable level.

* 
[VK_GPA_DEVICE_CLOCK_MODE_MIN_ENGINE_AMD](#) specifies that the engine
clock is set to the lowest available level and the memory clock is set
to a thermal and power sustainable level.

* 
[VK_GPA_DEVICE_CLOCK_MODE_PEAK_AMD](#) specifies that the clocks set to
maximum when possible and fans set to maximum.
Under power and thermal constraints device will clock down.

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkGpaDeviceClockModeInfoAMD](VkGpaDeviceClockModeInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaDeviceClockModeAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
