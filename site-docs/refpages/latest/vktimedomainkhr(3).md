# VkTimeDomainKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTimeDomainKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTimeDomainKHR - Supported time domains

The set of supported time domains consists of:

// Provided by VK_KHR_calibrated_timestamps
typedef enum VkTimeDomainKHR {
    VK_TIME_DOMAIN_DEVICE_KHR = 0,
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_KHR = 1,
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_KHR = 2,
    VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_KHR = 3,
  // Provided by VK_EXT_present_timing
    VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT = 1000208000,
  // Provided by VK_EXT_present_timing
    VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT = 1000208001,
  // Provided by VK_EXT_calibrated_timestamps
    VK_TIME_DOMAIN_DEVICE_EXT = VK_TIME_DOMAIN_DEVICE_KHR,
  // Provided by VK_EXT_calibrated_timestamps
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_EXT = VK_TIME_DOMAIN_CLOCK_MONOTONIC_KHR,
  // Provided by VK_EXT_calibrated_timestamps
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_EXT = VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_KHR,
  // Provided by VK_EXT_calibrated_timestamps
    VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_EXT = VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_KHR,
} VkTimeDomainKHR;

// Provided by VK_EXT_calibrated_timestamps
// Equivalent to VkTimeDomainKHR
typedef VkTimeDomainKHR VkTimeDomainEXT;

* 
[VK_TIME_DOMAIN_DEVICE_KHR](#) specifies the device time domain.
Timestamp values in this time domain use the same units and are
comparable with device timestamp values captured using
[vkCmdWriteTimestamp](vkCmdWriteTimestamp.html)
or [vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html)
and are defined to be incrementing according to the
[`timestampPeriod`](../../../../spec/latest/chapters/limits.html#limits-timestampPeriod) of the device.

* 
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](#) specifies a time domain
unique to a particular swapchain and a specific present stage.
Timestamp values in this time domain are in units of nanosecond and are
comparable only with other values from the same swapchain and present
stage.

* 
[VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT](#) specifies a time domain unique
to a particular swapchain.
Timestamp values in this time domain are in units of nanosecond and are
comparable only with other values from the same swapchain.

* 
[VK_TIME_DOMAIN_CLOCK_MONOTONIC_KHR](#) specifies the CLOCK_MONOTONIC
time domain available on POSIX platforms.
Timestamp values in this time domain are in units of nanoseconds and are
comparable with platform timestamp values captured using the POSIX
clock_gettime API as computed by this example:

|  | An implementation supporting
| --- | --- |
`[VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html)`
or
`[VK_EXT_calibrated_timestamps](VK_EXT_calibrated_timestamps.html)`
will use the same time domain for all its [VkQueue](VkQueue.html) so that timestamp
values reported for [VK_TIME_DOMAIN_DEVICE_KHR](#) can be matched to any
timestamp captured through [vkCmdWriteTimestamp](vkCmdWriteTimestamp.html)
or [vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html)
. |

struct timespec tv;
clock_gettime(CLOCK_MONOTONIC, &tv);
return tv.tv_nsec + tv.tv_sec*1000000000ull;

* 
[VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_KHR](#) specifies the
CLOCK_MONOTONIC_RAW time domain available on POSIX platforms.
Timestamp values in this time domain are in units of nanoseconds and are
comparable with platform timestamp values captured using the POSIX
clock_gettime API as computed by this example:

struct timespec tv;
clock_gettime(CLOCK_MONOTONIC_RAW, &tv);
return tv.tv_nsec + tv.tv_sec*1000000000ull;

* 
[VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_KHR](#) specifies the
performance counter (QPC) time domain available on Windows.
Timestamp values in this time domain are in the same units as those
provided by the Windows QueryPerformanceCounter API and are comparable
with platform timestamp values captured using that API as computed by
this example:

LARGE_INTEGER counter;
QueryPerformanceCounter(&counter);
return counter.QuadPart;

[VK_EXT_calibrated_timestamps](VK_EXT_calibrated_timestamps.html), [VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html), [VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html), [VkPastPresentationTimingEXT](VkPastPresentationTimingEXT.html), [VkSwapchainTimeDomainPropertiesEXT](VkSwapchainTimeDomainPropertiesEXT.html), [vkGetPhysicalDeviceCalibrateableTimeDomainsKHR](vkGetPhysicalDeviceCalibrateableTimeDomainsKHR.html), [vkGetPhysicalDeviceCalibrateableTimeDomainsKHR](vkGetPhysicalDeviceCalibrateableTimeDomainsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkTimeDomainKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
