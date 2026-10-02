# Calibrated Timestamps

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/calibrated_timestamps/README.html

## Table of Contents

- [Overview](#_overview)
- [Introduction](#_introduction)
- [* Time domain, timestamp, timestamp period, and max deviation](#_time_domain_timestamp_timestamp_period_and_max_deviation)
- [*_Time_domain,_timestamp,_timestamp_period,_and_max_deviation](#_time_domain_timestamp_timestamp_period_and_max_deviation)
- [Get time domain and timestamps](#_get_time_domain_and_timestamps)
- [Get_time_domain_and_timestamps](#_get_time_domain_and_timestamps)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/calibrated_timestamps). |
| --- | --- |

This sample demonstrates the extension `VK_EXT_calibrated_timestamps`.
The calibrated timestamps profiles any given portion of code, unlike timestamp queries, which only profiles an entire graphic queue.

To enable the `VK_EXT_calibrated_timestamps` extension, `VK_KHR_get_physical_device_properties2` must be enabled.

This sample is built upon the framework of the Vulkan Sample `HDR`.
We demonstrate using calibrated timestamps  over the build_command_buffers function.

A timestamp is being sampled via the calibrated timestamp extension.
In general, one must take two timestamps in order to measure the time elapsed within a block of code.

Each time domain is different, and the measurement of their associated timestamp periods may vary.
The precision of timestamps is calibrated by max deviations.

A list of time domains can be extracted by using `vkGetPhysicalDeviceCalibrateableTimeDomainsEXT`.
And the Vulkan time domain is defined by the enum `VkTimeDomainEXT`
