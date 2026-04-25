# VkPerformanceCounterUnitKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceCounterUnitKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceCounterUnitKHR - Supported counter unit types

Performance counters have an associated unit.
This unit describes how to interpret the performance counter result.

The performance counter unit types which **may** be returned in
[VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)::`unit` are:

// Provided by VK_KHR_performance_query
typedef enum VkPerformanceCounterUnitKHR {
    VK_PERFORMANCE_COUNTER_UNIT_GENERIC_KHR = 0,
    VK_PERFORMANCE_COUNTER_UNIT_PERCENTAGE_KHR = 1,
    VK_PERFORMANCE_COUNTER_UNIT_NANOSECONDS_KHR = 2,
    VK_PERFORMANCE_COUNTER_UNIT_BYTES_KHR = 3,
    VK_PERFORMANCE_COUNTER_UNIT_BYTES_PER_SECOND_KHR = 4,
    VK_PERFORMANCE_COUNTER_UNIT_KELVIN_KHR = 5,
    VK_PERFORMANCE_COUNTER_UNIT_WATTS_KHR = 6,
    VK_PERFORMANCE_COUNTER_UNIT_VOLTS_KHR = 7,
    VK_PERFORMANCE_COUNTER_UNIT_AMPS_KHR = 8,
    VK_PERFORMANCE_COUNTER_UNIT_HERTZ_KHR = 9,
    VK_PERFORMANCE_COUNTER_UNIT_CYCLES_KHR = 10,
} VkPerformanceCounterUnitKHR;

* 
[VK_PERFORMANCE_COUNTER_UNIT_GENERIC_KHR](#) - the performance counter
unit is a generic data point.

* 
[VK_PERFORMANCE_COUNTER_UNIT_PERCENTAGE_KHR](#) - the performance
counter unit is a percentage (%).

* 
[VK_PERFORMANCE_COUNTER_UNIT_NANOSECONDS_KHR](#) - the performance
counter unit is a value of nanoseconds (ns).

* 
[VK_PERFORMANCE_COUNTER_UNIT_BYTES_KHR](#) - the performance counter
unit is a value of bytes.

* 
[VK_PERFORMANCE_COUNTER_UNIT_BYTES_PER_SECOND_KHR](#) - the performance
counter unit is a value of bytes/s.

* 
[VK_PERFORMANCE_COUNTER_UNIT_KELVIN_KHR](#) - the performance counter
unit is a temperature reported in Kelvin.

* 
[VK_PERFORMANCE_COUNTER_UNIT_WATTS_KHR](#) - the performance counter
unit is a value of watts (W).

* 
[VK_PERFORMANCE_COUNTER_UNIT_VOLTS_KHR](#) - the performance counter
unit is a value of volts (V).

* 
[VK_PERFORMANCE_COUNTER_UNIT_AMPS_KHR](#) - the performance counter
unit is a value of amps (A).

* 
[VK_PERFORMANCE_COUNTER_UNIT_HERTZ_KHR](#) - the performance counter
unit is a value of hertz (Hz).

* 
[VK_PERFORMANCE_COUNTER_UNIT_CYCLES_KHR](#) - the performance counter
unit is a value of cycles.

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerformanceCounterUnitKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
