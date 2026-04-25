# VK_EXT_calibrated_timestamps

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_calibrated_timestamps.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Monotonicity Guarantees](#_monotonicity_guarantees)
- [3.1._Monotonicity_Guarantees](#_monotonicity_guarantees)
- [3.2. Timestamp Domains](#_timestamp_domains)
- [3.2._Timestamp_Domains](#_timestamp_domains)
- [3.3. Timestamp Calibration](#_timestamp_calibration)
- [3.3._Timestamp_Calibration](#_timestamp_calibration)
- [4. Issues](#_issues)
- [4.1. Should other time domain combinations be supported?](#_should_other_time_domain_combinations_be_supported)
- [4.1._Should_other_time_domain_combinations_be_supported?](#_should_other_time_domain_combinations_be_supported)
- [4.2. How can an application extrapolate future device timestamp values from the calibrated timestamp value?](#_how_can_an_application_extrapolate_future_device_timestamp_values_from_the_calibrated_timestamp_value)
- [4.2._How_can_an_application_extrapolate_future_device_timestamp_values_from_the_calibrated_timestamp_value?](#_how_can_an_application_extrapolate_future_device_timestamp_values_from_the_calibrated_timestamp_value)
- [4.3. Can the host and device timestamp values drift apart over longer periods of time?](#_can_the_host_and_device_timestamp_values_drift_apart_over_longer_periods_of_time)
- [4.3._Can_the_host_and_device_timestamp_values_drift_apart_over_longer_periods_of_time?](#_can_the_host_and_device_timestamp_values_drift_apart_over_longer_periods_of_time)
- [4.4. Should there be a query for reporting the maximum deviation of the timestamp values returned by calibrated timestamp queries?](#_should_there_be_a_query_for_reporting_the_maximum_deviation_of_the_timestamp_values_returned_by_calibrated_timestamp_queries)
- [4.4._Should_there_be_a_query_for_reporting_the_maximum_deviation_of_the_timestamp_values_returned_by_calibrated_timestamp_queries?](#_should_there_be_a_query_for_reporting_the_maximum_deviation_of_the_timestamp_values_returned_by_calibrated_timestamp_queries)
- [4.5. Can the maximum deviation reported ever be zero?](#_can_the_maximum_deviation_reported_ever_be_zero)
- [4.5._Can_the_maximum_deviation_reported_ever_be_zero?](#_can_the_maximum_deviation_reported_ever_be_zero)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Monotonicity Guarantees](#_monotonicity_guarantees)
[3.2. Timestamp Domains](#_timestamp_domains)
[3.3. Timestamp Calibration](#_timestamp_calibration)

[4. Issues](#_issues)

[4.1. Should other time domain combinations be supported?](#_should_other_time_domain_combinations_be_supported)
[4.2. How can an application extrapolate future device timestamp values from the calibrated timestamp value?](#_how_can_an_application_extrapolate_future_device_timestamp_values_from_the_calibrated_timestamp_value)
[4.3. Can the host and device timestamp values drift apart over longer periods of time?](#_can_the_host_and_device_timestamp_values_drift_apart_over_longer_periods_of_time)
[4.4. Should there be a query for reporting the maximum deviation of the timestamp values returned by calibrated timestamp queries?](#_should_there_be_a_query_for_reporting_the_maximum_deviation_of_the_timestamp_values_returned_by_calibrated_timestamp_queries)
[4.5. Can the maximum deviation reported ever be zero?](#_can_the_maximum_deviation_reported_ever_be_zero)

This extension provides a way to calibrate timestamps captured from different devices in the same system and guarantees monotonicity of captured timestamps.

Vulkan has exposed timestamps since version 1.0, but does not provide a way to interpret these against wall clock time or other components in the system.
For performance tuning and certain time-sensitive applications, getting an accurate picture of how long an operation takes and being able to calibrate these measurements against other timers is crucial.
Two main limitations prevent this kind of measurement; lack of monotonicity, and no method of comparison.

Core Vulkan 1.0 timestamps cannot be compared even across separate submits within the same run of an application, as power management events can reset the timer on many implementations.
Comparisons within a submission are the only thing that can be relied on, and these can only really be used as a measure of relative performance compared to other workloads on the same system.
Any solution to this problem needs to be able to guarantee a monotonic timer that only resets in the extreme circumstance that the value of the timer exceeds the size of the value that can be returned, which with 64-bit queries is, for most purposes equivalent to never happening.

Once monotonicity is guaranteed, there needs to be a way to equate device timestamps to other meaningful timing systems; preferably the system timer in the host environment.
Modern operating systems provide several ways to compare system timers to other timing systems, as well as timers at varying levels of precision.

For the monotonicity guarantee, there are only really two options: either provide a monotonic clock that is undisturbed by power management events or log all power management events to the user with timestamp values stored before being reset.
While an extension to log power management events affecting timers [does exist in OpenGL ES](https://registry.khronos.org/OpenGL/extensions/EXT/EXT_disjoint_timer_query.txt), it only exposes whether one happened or not; to be able to generate a truly monotonic value would require more information than this.
Additionally, a logging system would be difficult to use with timestamps consumed on the GPU; if a power management event occurs, entire frames would need to be discarded.
To avoid this extra complication, this extension requires that timer queries are monotonic; a future extension could introduce power management event logging.

As for comparing device timestamps to system time, the following options were considered:

* 
Add a new query type allowing the timestamp to be returned in a different domain (e.g. the host)

* 
Provide queries describing how to convert between different timer values

* 
Provide a method to capture simultaneous timestamps across different domains so they can be calibrated

Returning a timestamp in a different domain via query operations is difficult as this would involve having the implementation convert the timestamps at the point they are written or copied out; which requires getting access to calibration information on the device when using vkCmdCopyQueryPoolResults, for instance.
Queries to provide conversion information could potentially work, assuming all timers increase linearly, by providing a multiplier and offset to convert between them; however some clocks may be adjusted or otherwise drift over time, requiring implementations to update these now non-static values.
Capturing simultaneous (or nearly simultaneous) timestamps between at least a stable host clock and the device will allow applications to calibrate timestamps at any point, which also handles adjustments or drift between clocks over time.

This extension exposes a way to capture roughly simultaneous timestamps from multiple domains at once to allow them to be compared.

When this extension is enabled on a device, the device timestamps returned by vkCmdWriteTimestamp must be monotonic; for any two timestamps where one happens after the other according to Vulkan synchronization guarantees, the timestamp that happens after must not return a lower timestamp value.
The only exception to this is if the system has been running for a long enough time that the timestamp value overflows its storage, at which point it must wrap back to zero.
For 64-bit timestamps this is practically never going to happen, but it could be observable if a 32-bit timestamp query is used.

This extension provides four domains to the application; while the device domain is always available, the availability of other domains will depend on the system and the implementation, so can be queried:

VkResult vkGetPhysicalDeviceCalibrateableTimeDomainsEXT(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pTimeDomainCount,
    VkTimeDomainEXT*                            pTimeDomains);

typedef enum VkTimeDomainEXT {
    VK_TIME_DOMAIN_DEVICE_EXT = 0,
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_EXT = 1,
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_EXT = 2,
    VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_EXT = 3,
} VkTimeDomainEXT;

On Posix-compatible systems, `VK_TIME_DOMAIN_CLOCK_MONOTONIC_EXT` corresponds to [`CLOCK_MONOTONIC`](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/time.h.html).
Similarly, on Linux and Linux-derived systems that support it, `VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_EXT` corresponds to [`CLOCK_MONOTONIC_RAW`](https://www.man7.org/linux/man-pages/man3/clock_gettime.3.html).

For Windows systems, `VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_EXT` corresponds to the time domain used by [QueryPerformanceCounter](https://learn.microsoft.com/en-us/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter).

Finally, the `VK_TIME_DOMAIN_DEVICE_EXT` is the time domain used by the device for all [vkCmdWriteTimestamp](https://docs.vulkan.org/spec/latest/chapters/queries.html#vkCmdWriteTimestamp) commands on any queue that supports timestamps.

Implementations must always expose the device domain and at least one other domain when this extension is supported.

The following command allows applications to retrieve comparable timestamps across different domains:

VkResult vkGetCalibratedTimestampsEXT(
    VkDevice                                    device,
    uint32_t                                    timestampCount,
    const VkCalibratedTimestampInfoEXT*         pTimestampInfos,
    uint64_t*                                   pTimestamps,
    uint64_t*                                   pMaxDeviation);

typedef struct VkCalibratedTimestampInfoEXT {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkTimeDomainEXT                             timeDomain;
} VkCalibratedTimestampInfoEXT;

The value returned in each element of `pTimestamps` will be a raw timestamp value in the time domain specified by the corresponding element of `pTimestampInfos`.
The returned values will be queried in their time domains as closely as possible in time, with the maximum positive deviation between the timestamps returned as a single value in `pMaxDeviation`.

As the supported set of timestamp domains is queryable, additional domains can be added over time if needed.

`VkPhysicalDeviceLimits::timestampPeriod` makes it possible to calculate future device timestamps as follows:

futureTimestamp = calibratedTimestamp + deltaNanoseconds / timestampPeriod

Yes, especially as some time domains by definition allow for that to happen (e.g. CLOCK_MONOTONIC is subject to NTP adjustments).
Thus it is recommended that applications re-calibrate from time to time.

A global query seems inappropriate and difficult to enforce.
However, it is possible to return the maximum deviation any single calibrated timestamp query can have by sampling one of the time domains twice as follows:

timestampX = timestampX_before = SampleTimeDomain(X)
for each time domain Y != X
    timestampY = SampleTimeDomain(Y)
timestampX_after = SampleTimeDomain(X)
maxDeviation = timestampX_after - timestampX_before

Unless the tick of each clock corresponding to the set of time domains coincides and all clocks can literally be sampled simultaneously, there is not really a possibility for the maximum deviation to be zero, so by convention the maximum deviation is always at least the maximum of the length of the ticks of the set of time domains calibrated and thus can never be zero.
